#!/usr/bin/env python3
"""Gera legendas curtas no padrão oficial do @euvouserdoutor."""

import re
import sys

BLOCK_GAP = "\n\n\n"


def _clean(value: str) -> str:
    """Remove Markdown, hashtags e quebras excessivas sem alterar o fato informado."""
    value = (value or "").replace("**", "").replace("#", "")
    return re.sub(r"\s+", " ", value).strip()


def _headline(title: str) -> str:
    # O padrão oficial usa uma manchete visualmente forte e imediatamente compreensível.
    return f"🚨 {title.upper()}"


def _closing(title: str, summary: str, key_finding: str) -> str:
    context = f"{title} {summary} {key_finding}".casefold()
    # Priorizar o domínio específico; universidade, por si só, não torna a pauta educacional.
    if any(word in context for word in ("curativo", "tilápia", "medicina", "paciente", "queimadura", "ferida", "sangue", "agulha", "coleta", "tasso", "hospital", "anvisa")):
        return "É a inovação mostrando novos caminhos para o futuro da medicina! ✨"
    if any(word in context for word in ("inteligência artificial", "robô", "chip", "digital", "tecnologia")):
        return "É a tecnologia ajudando a construir novas possibilidades para o futuro! ✨"
    if any(word in context for word in ("pesquisa", "cientista", "descoberta", "estudo", "ciência")):
        return "É a ciência transformando o impossível em novas possibilidades! ✨"
    if any(word in context for word in ("educação", "estudante", "escola", "ensino")):
        return "É a educação revelando até onde uma grande ideia pode chegar! ✨"
    return "É a ciência, a tecnologia e a inovação abrindo caminhos para o futuro! ✨"


def _impact(title: str, summary: str, key_finding: str) -> str:
    context = f"{title} {summary} {key_finding}".casefold()
    if any(word in context for word in ("curativo", "tilápia", "queimadura", "ferida")):
        return ("O IMPACTO: A iniciativa transforma uma matéria-prima que seria descartada "
                "em tecnologia médica e pode ampliar a produção de curativos biológicos, "
                "com potencial de reduzir custos e levar a inovação brasileira a mais pessoas.")
    if any(word in context for word in ("sangue", "agulha", "coleta", "tasso", "hospital", "anvisa")):
        return ("O IMPACTO: A tecnologia pode tornar a coleta mais confortável e facilitar o acesso "
                "a alguns exames, mas a própria reportagem ressalta que ela ainda não substitui "
                "a punção venosa em todos os casos.")
    return ("O IMPACTO: Este avanço amplia as possibilidades de aplicação da ciência, "
            "da tecnologia ou da educação e mostra como uma descoberta concreta pode "
            "produzir mudanças relevantes.")


def generate_caption(title: str, summary: str, key_finding: str) -> str:
    """Produz: SURPRESA → ENTENDIMENTO → RELEVÂNCIA → EMOÇÃO."""
    title = _clean(title)
    summary = _clean(summary)
    key_finding = _clean(key_finding)
    if not title or not summary or not key_finding:
        raise ValueError("Título, resumo e achado central são obrigatórios.")

    # O resumo deve trazer o que aconteceu, quem fez, como funciona e o resultado.
    discovery = summary
    explanation = f"{key_finding}."
    impact = _impact(title, summary, key_finding)
    closing = _closing(title, summary, key_finding)
    return BLOCK_GAP.join((_headline(title), discovery, explanation, impact, closing))


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python3 gerar_legenda.py 'Título' 'Resumo' 'Achado Central'")
        sys.exit(2)
    try:
        caption = generate_caption(sys.argv[1], sys.argv[2], sys.argv[3])
        output_file = "legenda_final.txt"
        with open(output_file, "w", encoding="utf-8") as stream:
            stream.write(caption + "\n")
        print(f"Legenda gerada com sucesso em {output_file}")
        print(caption)
    except Exception as exc:
        print(f"Erro ao gerar legenda: {exc}", file=sys.stderr)
        sys.exit(1)
