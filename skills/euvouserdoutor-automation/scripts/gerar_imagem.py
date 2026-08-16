#!/usr/bin/env python3
"""Gera a arte editorial 4:5 do @euvouserdoutor."""

import os
import sys
from io import BytesIO

import requests
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1080, 1350
TEXT_X = 65
TEXT_Y = 980
MAX_TEXT_WIDTH = 950
SAFE_BOTTOM = 1140
LINE_SPACING = 1.2
DEFAULT_FONT_SIZE = 52
MIN_FONT_SIZE = 18
SKILL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BASE_PATH = os.path.join(SKILL_DIR, "templates", "base1.png")
FONT_PATH = os.path.join(SKILL_DIR, "templates", "fonts", "OpenSauceSans-Bold.ttf")


def _load_image(source: str) -> Image.Image:
    if source.startswith(("http://", "https://")):
        response = requests.get(source, timeout=20)
        response.raise_for_status()
        return Image.open(BytesIO(response.content)).convert("RGBA")
    return Image.open(source).convert("RGBA")


def _fit_crop(image: Image.Image) -> Image.Image:
    ratio = image.width / image.height
    target_ratio = WIDTH / HEIGHT
    if ratio > target_ratio:
        new_width = round(HEIGHT * ratio)
        image = image.resize((new_width, HEIGHT), Image.Resampling.LANCZOS)
        left = (new_width - WIDTH) // 2
        return image.crop((left, 0, left + WIDTH, HEIGHT))
    new_height = round(WIDTH / ratio)
    image = image.resize((WIDTH, new_height), Image.Resampling.LANCZOS)
    top = max(0, (new_height - HEIGHT) // 2)
    return image.crop((0, top, WIDTH, top + HEIGHT))


def _wrap_title(draw: ImageDraw.ImageDraw, title: str, font: ImageFont.FreeTypeFont):
    """Quebra por palavras; palavras muito grandes são divididas sem perder caracteres."""
    words = title.split()
    lines = []
    current = ""
    for word in words:
        pieces = [word]
        while pieces:
            piece = pieces.pop(0)
            candidate = piece if not current else f"{current} {piece}"
            if draw.textbbox((0, 0), candidate, font=font)[2] <= MAX_TEXT_WIDTH:
                current = candidate
                continue
            if current:
                lines.append(current)
                current = ""
            if draw.textbbox((0, 0), piece, font=font)[2] <= MAX_TEXT_WIDTH:
                current = piece
                continue
            # Fallback para uma palavra individual maior que a área segura.
            chunk = ""
            for char in piece:
                candidate_chunk = chunk + char
                if draw.textbbox((0, 0), candidate_chunk, font=font)[2] <= MAX_TEXT_WIDTH:
                    chunk = candidate_chunk
                else:
                    if chunk:
                        lines.append(chunk)
                    chunk = char
            current = chunk
    if current:
        lines.append(current)
    return lines


def _measure_block(draw, lines, font):
    heights = [draw.textbbox((0, 0), line, font=font)[3] - draw.textbbox((0, 0), line, font=font)[1] for line in lines]
    return sum(heights) * LINE_SPACING


def _validate_real_content(image_url: str, title: str) -> None:
    """Bloqueia artefatos de teste que não representam uma matéria real."""
    normalized_title = title.casefold()
    blocked_markers = ("título de teste", "titulo de teste", "imagem de teste", "caminho/para", "exemplo de teste")
    if any(marker in normalized_title for marker in blocked_markers):
        raise ValueError("Geração bloqueada: use somente o título real de uma reportagem selecionada.")
    if image_url.casefold().endswith(("base1.png", "base2.png")):
        raise ValueError("Geração bloqueada: base1.png/base2.png são templates, não imagens de reportagem.")
    if "imagem-de-teste" in image_url.casefold() or "imagem_de_teste" in image_url.casefold():
        raise ValueError("Geração bloqueada: a imagem indicada é um placeholder de teste.")


def generate_editorial_image(image_url: str, title: str, output_path: str) -> bool:
    if not title or not title.strip():
        raise ValueError("O título não pode ficar vazio.")
    _validate_real_content(image_url, title)
    if not os.path.exists(BASE_PATH):
        raise FileNotFoundError(f"Template não encontrado: {BASE_PATH}")
    if not os.path.exists(FONT_PATH):
        raise FileNotFoundError(f"Fonte não encontrada: {FONT_PATH}")

    main_img = _fit_crop(_load_image(image_url))
    overlay = Image.open(BASE_PATH).convert("RGBA").resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    main_img.alpha_composite(overlay)
    draw = ImageDraw.Draw(main_img)

    chosen_font = None
    lines = []
    total_height = 0
    for font_size in range(DEFAULT_FONT_SIZE, MIN_FONT_SIZE - 1, -2):
        font = ImageFont.truetype(FONT_PATH, font_size)
        candidate_lines = _wrap_title(draw, title.strip(), font)
        candidate_height = _measure_block(draw, candidate_lines, font)
        if TEXT_Y + candidate_height <= SAFE_BOTTOM:
            chosen_font, lines, total_height = font, candidate_lines, candidate_height
            break
    if chosen_font is None:
        chosen_font = ImageFont.truetype(FONT_PATH, MIN_FONT_SIZE)
        lines = _wrap_title(draw, title.strip(), chosen_font)
        total_height = _measure_block(draw, lines, chosen_font)

    # Mantém o início em Y=980 sempre que possível; só sobe em caso extremo.
    current_y = TEXT_Y if TEXT_Y + total_height <= SAFE_BOTTOM else max(20, SAFE_BOTTOM - total_height)
    for line in lines:
        draw.text((TEXT_X, current_y), line, font=chosen_font, fill=(255, 255, 255, 255))
        bbox = draw.textbbox((0, 0), line, font=chosen_font)
        current_y += (bbox[3] - bbox[1]) * LINE_SPACING

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    main_img.convert("RGB").save(output_path, "JPEG", quality=95, optimize=True)
    print(f"Imagem gerada com sucesso (fonte: {chosen_font.size}px): {output_path}")
    return True


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Uso: python3 gerar_imagem.py 'URL_OU_ARQUIVO' 'TITULO' 'SAIDA.jpg'")
        sys.exit(2)
    try:
        generate_editorial_image(sys.argv[1], sys.argv[2], sys.argv[3])
    except Exception as exc:
        print(f"Erro ao gerar imagem: {exc}", file=sys.stderr)
        sys.exit(1)
