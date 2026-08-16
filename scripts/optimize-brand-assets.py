from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]/'public'
for source, target, quality in [
    (root/'logo-euvouserdoutor.png', root/'logo-euvouserdoutor.webp', 86),
    (root/'jeff-queiroz-perfil.jpg', root/'jeff-queiroz-perfil.webp', 84),
]:
    image=Image.open(source)
    image.save(target, 'WEBP', quality=quality, method=6)
    print(f'{source.name} -> {target.name}: {source.stat().st_size} -> {target.stat().st_size} bytes')
