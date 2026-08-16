from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public"

jobs = {
    "retina_chip_tech.jpg": (1600, 900, 82),
    "tbx5_dna_heart_2026.jpg": (1440, 810, 82),
    "plcg2_sinapses_alzheimer_2026.jpg": (1440, 810, 82),
    "jeff-queiroz-eu-vou-ser-doutor.png": (900, 1125, 82),
}

for source_name, (max_width, max_height, quality) in jobs.items():
    source = ROOT / source_name
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=quality, method=6)
        print(f"{source_name} -> {target.name}: {image.width}x{image.height}")
