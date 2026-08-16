#!/usr/bin/env python3
"""Curadoria, produção e preparação de uma publicação do @euvouserdoutor.

O script não publica diretamente: mantém o contrato anterior de imprimir o comando
MCP para execução autorizada e registra a pauta preparada para impedir duplicações.
"""

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import unicodedata
from datetime import datetime, timezone
from difflib import SequenceMatcher
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

SKILL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
IMAGE_SCRIPT = os.path.join(SKILL_DIR, "scripts", "gerar_imagem.py")
CAPTION_SCRIPT = os.path.join(SKILL_DIR, "scripts", "gerar_legenda.py")
HISTORY_PATH = os.environ.get("EUVOUSERDOUTOR_HISTORY", "/home/ubuntu/.euvouserdoutor/history.json")
SOURCES = [
    ("Só Notícia Boa — Educação", "https://www.sonoticiaboa.com.br/educacao"),
    ("Só Notícia Boa — Saúde", "https://www.sonoticiaboa.com.br/saude"),
    ("CNN Brasil — Saúde", "https://www.cnnbrasil.com.br/saude/"),
]
CONCEPTUAL_IMAGE_MARKERS = ("render", "renderizacao", "renderização", "concept", "conceito", "mockup", "maquete", "illustration", "ilustracao", "ilustração", "infographic", "infografico", "infográfico", "simulation", "simulacao", "simulação", "artist", "projeto-futuro")

PILLARS = {
    "ciência curiosa": ["curiosa", "curiosidade", "cientista", "ciência"],
    "tecnologia / IA": ["tecnologia", "inteligência artificial", " ia ", "robô", "digital"],
    "educação": ["educação", "escola", "professor", "estudante", "aluno", "universidade"],
    "formação médica": ["formação médica", "medicina", "neurocirurg", "residência"],
    "história humana extraordinária": ["superou", "inspiradora", "sonho", "conquista"],
    "descoberta científica": ["descoberta", "pesquisa", "estudo", "experimento"],
    "inovação em saúde": ["inovação", "tecnologia médica", "hospital", "diagnóstico"],
    "conquista acadêmica": ["prêmio", "olimpíada", "medalha", "diploma", "acadêmica"],
    "curiosidade / fato raro": ["raro", "incomum", "inacreditável", "recorde", "primeira vez"],
}
FORBIDDEN = [
    "doença", "doenças", "sintoma", "diagnóstico", "tratamento", "prognóstico",
    "câncer", "cancro", "diabetes", "vírus", "bactéria", "surto", "epidemia",
    "complicação", "morreu", "morte por", "internado", "remédio", "medicamento",
]
POSITIVE = [
    "surpreendente", "inédito", "descoberta", "cientista", "tecnologia", "inovação",
    "universidade", "estudante", "inteligência artificial", "recorde", "primeiro",
    "raro", "curioso", "pesquisa", "robô", "prêmio", "conquista",
]


def normalize(text: str) -> str:
    text = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9 ]+", " ", text).strip()


def tokens(text: str):
    return {word for word in normalize(text).split() if len(word) > 2}


def load_history(path=HISTORY_PATH):
    try:
        with open(path, encoding="utf-8") as stream:
            data = json.load(stream)
        return data if isinstance(data, dict) else {"posts": []}
    except (FileNotFoundError, json.JSONDecodeError):
        return {"posts": [], "performance": {}}


def save_history(history, path=HISTORY_PATH):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    temporary = f"{path}.tmp"
    with open(temporary, "w", encoding="utf-8") as stream:
        json.dump(history, stream, ensure_ascii=False, indent=2)
    os.replace(temporary, path)


def get_articles(source_name, url):
    try:
        response = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
    except requests.RequestException as exc:
        print(f"Aviso: não foi possível acessar {url}: {exc}")
        return []

    articles, seen = [], set()
    for link in soup.select("a[href]"):
        href = urljoin(url, link.get("href", ""))
        title = link.get_text(" ", strip=True)
        image = link.find("img")
        image_url = urljoin(url, image.get("src") or image.get("data-src")) if image else None
        if len(title) < 25 or len(title) > 240 or not href.startswith("http") or href in seen:
            continue
        if href.rstrip("/") == url.rstrip("/"):
            continue
        seen.add(href)
        articles.append({"source": source_name, "title": title, "link": href, "img_url": image_url})
    return articles[:80]


def get_article_details(url):
    try:
        response = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = [p.get_text(" ", strip=True) for p in soup.select("article p, main p, p")]
        paragraphs = [p for p in paragraphs if len(p) >= 45]
        summary = paragraphs[0] if paragraphs else ""
        finding = next((p for p in paragraphs[1:] if len(p) >= 60), summary)
        image = soup.select_one("meta[property='og:image']")
        return summary, finding, image.get("content") if image else None
    except requests.RequestException as exc:
        print(f"Aviso: não foi possível ler a matéria {url}: {exc}")
        return "", "", None


def pillar_for(article):
    text = f" {normalize(article.get('title', ''))} "
    for pillar, words in PILLARS.items():
        if any(normalize(word) in text for word in words):
            return pillar
    return "educação"


def exact_or_semantic_duplicate(article, history):
    article_text = f"{article.get('title', '')} {article.get('link', '')} {article.get('summary', '')}"
    current_tokens = tokens(article_text)
    for post in history.get("posts", []):
        if article.get("link") and article.get("link") == post.get("url"):
            return "duplicidade exata"
        old_text = " ".join(str(post.get(key, "")) for key in ("title", "character", "subject", "semantic_summary", "hook"))
        old_tokens = tokens(old_text)
        similarity = len(current_tokens & old_tokens) / max(1, len(current_tokens | old_tokens))
        sequence = SequenceMatcher(None, normalize(article.get("title", "")), normalize(post.get("title", ""))).ratio()
        if sequence >= 0.82 or similarity >= 0.62:
            return "duplicidade semântica"
    recent = history.get("posts", [])[-8:]
    same_pillar = sum(post.get("pillar") == article.get("pillar") for post in recent)
    if same_pillar >= 3:
        return "saturação editorial"
    return ""


def historical_fit(article, history):
    performance = history.get("performance", {})
    pillar = article.get("pillar", "")
    samples = performance.get(pillar, {})
    if not samples:
        return 5.0
    # O peso segue o briefing: compartilhamento, alcance, seguidores e salvamentos.
    values = [samples.get("shares", 0), samples.get("reach", 0), samples.get("followers", 0), samples.get("saves", 0)]
    return min(10.0, 5.0 + sum(min(1.0, float(value) / max(1.0, samples.get("benchmark", 1))) for value in values) * 1.25)


def score_article(article, history):
    title = normalize(article.get("title", ""))
    if any(normalize(word) in title for word in FORBIDDEN):
        return None
    article["pillar"] = pillar_for(article)
    duplicate = exact_or_semantic_duplicate(article, history)
    if duplicate:
        return None
    curiosity = min(10, sum(1 for word in POSITIVE if normalize(word) in title) + 3)
    surprise = min(10, 3 + int(any(word in title for word in ("primeiro", "raro", "inédito", "recorde", "descoberta"))))
    headline = min(10, 4 + min(5, len(article.get("title", "").split()) / 8))
    clarity = 8 if 7 <= len(article.get("title", "").split()) <= 22 else 5
    historical = historical_fit(article, history)
    novelty = 8
    score = (curiosity * 0.12 + surprise * 0.12 + headline * 0.12 + clarity * 0.10 +
             7 * 0.10 + 7 * 0.12 + 6 * 0.08 + 7 * 0.06 + historical * 0.15 + novelty * 0.07)
    article["score"] = round(score, 2)
    article["historical_fit"] = round(historical, 2)
    article["score_breakdown"] = {"curiosidade": curiosity, "surpresa": surprise, "manchete": round(headline, 1), "clareza": clarity, "historical_fit": round(historical, 1)}
    return article


def is_conceptual_image(image_url: str) -> bool:
    """Sinaliza URLs que representam renderizações, ilustrações ou conceitos."""
    normalized = normalize(image_url)
    return any(marker in normalized for marker in CONCEPTUAL_IMAGE_MARKERS)


def build_payload(caption, cdn_url, title):
    return {"type": "post", "caption": caption, "media": [{"type": "image", "media_url": cdn_url, "alt_text": title}]}


def prepare_post(article, history):
    summary, finding, og_image = get_article_details(article["link"])
    article["summary"] = summary or "A reportagem apresenta um fato relevante de educação, ciência ou inovação."
    article["central_finding"] = finding or "o acontecimento foi confirmado na reportagem original"
    # A imagem og:image da matéria tem prioridade sobre a miniatura do card.
    article["img_url"] = og_image or article.get("img_url")
    if not article["img_url"]:
        raise RuntimeError("A matéria não forneceu imagem original utilizável.")
    if is_conceptual_image(article["img_url"]):
        raise RuntimeError("A imagem selecionada parece renderização, ilustração ou conceito; procure uma fotografia real da mesma pauta.")

    title = article["title"]  # Mantém a manchete original salvo ganho editorial evidente externo.
    image_path = "/home/ubuntu/post_imagem_auto.jpg"
    subprocess.run([sys.executable, IMAGE_SCRIPT, article["img_url"], title, image_path], check=True)
    subprocess.run([sys.executable, CAPTION_SCRIPT, title, article["summary"], article["central_finding"]], check=True)
    caption_path = os.path.join(os.getcwd(), "legenda_final.txt")
    with open(caption_path, encoding="utf-8") as stream:
        caption = stream.read()

    upload = subprocess.run(["manus-upload-file", image_path], capture_output=True, text=True, check=True)
    match = re.search(r"https://files\.manuscdn\.com/[^\s]+", upload.stdout)
    if not match:
        raise RuntimeError("URL CDN não encontrada na saída do upload.")
    payload = build_payload(caption, match.group(0), title)
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    print("\n--- COMANDO PARA PUBLICAR NO INSTAGRAM ---")
    print("manus-mcp-cli tool call create_instagram --server instagram --input " + json.dumps(payload, ensure_ascii=False))
    print("------------------------------------------")

    now = datetime.now(timezone.utc).isoformat()
    record = {"id": hashlib.sha256(f"{article['link']}|{title}".encode()).hexdigest()[:16], "status": "prepared", "url": article["link"], "source": article["source"], "title_original": title, "title_used": title, "date": now, "pillar": article["pillar"], "subject": title, "semantic_summary": article["summary"], "hook": title, "score": article["score"], "historical_fit": article["historical_fit"], "image_path": image_path}
    history.setdefault("posts", []).append(record)
    save_history(history)
    print(f"Registro persistente atualizado: {HISTORY_PATH}")


def main():
    parser = argparse.ArgumentParser(description="Seleciona e prepara uma pauta editorial.")
    parser.add_argument("--dry-run", action="store_true", help="coleta e pontua, sem gerar/upload/publicar")
    args = parser.parse_args()
    history = load_history()
    candidates = []
    for source, url in SOURCES:
        candidates.extend(get_articles(source, url))
    unique = {article["link"]: article for article in candidates}
    scored = [item for article in unique.values() if (item := score_article(article, history))]
    scored.sort(key=lambda item: item["score"], reverse=True)
    if not scored:
        print("Nenhuma candidata elegível após filtros e antirrepetição.")
        return 0
    print(f"Candidatas elegíveis: {len(scored)}")
    for item in scored[:5]:
        print(f"{item['score']:.2f} | histórico {item['historical_fit']:.2f} | {item['pillar']} | {item['title']}")
    if args.dry_run:
        return 0
    prepare_post(scored[0], history)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Erro no fluxo editorial: {exc}", file=sys.stderr)
        raise SystemExit(1)
