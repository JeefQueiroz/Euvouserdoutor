from PIL import Image
from pathlib import Path
root=Path(__file__).resolve().parents[1]
src=root/'public/favicon.png'
out=root/'public/favicon-optimized.png'
img=Image.open(src).convert('RGBA')
img.thumbnail((96,96), Image.Resampling.LANCZOS)
canvas=Image.new('RGBA',(96,96),(0,0,0,0))
left=(96-img.width)//2
top=(96-img.height)//2
canvas.alpha_composite(img,(left,top))
canvas.save(out,optimize=True)
print(out, out.stat().st_size)
