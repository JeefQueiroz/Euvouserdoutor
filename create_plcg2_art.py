from PIL import Image, ImageDraw, ImageFilter
import math, random

W, H = 1600, 900
random.seed(20260814)
img = Image.new('RGB', (W, H), '#07152d')
d = ImageDraw.Draw(img)
# layered radial glows
for cx, cy, color, radius in [(450,430,(13,76,139),420),(1080,430,(16,46,112),430),(760,620,(105,55,21),260)]:
    glow = Image.new('RGBA', (W,H), (0,0,0,0))
    gd = ImageDraw.Draw(glow)
    for r in range(radius, 0, -8):
        a = int(70 * (1-r/radius)**1.7)
        gd.ellipse((cx-r,cy-r,cx+r,cy+r), fill=(*color,a))
    img = Image.alpha_composite(img.convert('RGBA'), glow)
    d = ImageDraw.Draw(img)
# subtle molecular particles
for _ in range(170):
    x=random.randint(40,W-40); y=random.randint(50,H-50); r=random.choice([1,1,2,2,3])
    col=random.choice([(56,171,255,100),(255,183,80,90),(115,231,255,80)])
    d.ellipse((x-r,y-r,x+r,y+r), fill=col)
# neuron drawing on transparent layer
layer=Image.new('RGBA',(W,H),(0,0,0,0)); ld=ImageDraw.Draw(layer)
# central soma
soma=(610,470)
# dendritic recursive branches
def branch(x,y,angle,length,width,depth,accent=False):
    if depth <= 0 or length < 18: return
    x2=x+math.cos(angle)*length; y2=y+math.sin(angle)*length
    col=(84,202,255,230) if not accent else (255,179,77,235)
    ld.line((x,y,x2,y2), fill=col, width=max(2,int(width)), joint='curve')
    if depth==1:
        ld.ellipse((x2-4,y2-4,x2+4,y2+4), fill=col)
        return
    spread=0.34 + random.random()*0.25
    branch(x2,y2,angle-spread,length*0.68,width*0.76,depth-1,accent)
    branch(x2,y2,angle+spread,length*0.62,width*0.72,depth-1,accent)
    if depth>3 and random.random()>0.35:
        branch(x2,y2,angle+random.uniform(-.15,.15),length*.52,width*.6,depth-2,accent)
for a in [-2.7,-2.25,-1.85,-1.35,-0.92,-0.55,0.15,0.55,1.0,1.7,2.2,2.75,3.25]:
    branch(soma[0],soma[1],a,155,11,5,accent=(a in [-1.35,0.55,2.2]))
# axon towards right
ld.line((660,480,850,500,1040,590,1260,650), fill=(255,188,79,235), width=12, joint='curve')
for x,y in [(850,500),(1040,590),(1260,650)]:
    ld.ellipse((x-8,y-8,x+8,y+8), fill=(255,217,133,240))
# soma and nucleus
ld.ellipse((535,395,690,545), fill=(255,174,77,235), outline=(255,231,160,255), width=5)
ld.ellipse((570,425,650,505), fill=(12,51,98,255), outline=(105,225,255,220), width=4)
# synapse clusters on right, abstract
for i in range(11):
    x=1010+i*38; y=250+int(180*math.sin(i*.65))+random.randint(-20,20)
    ld.ellipse((x-12,y-12,x+12,y+12), fill=(57,199,255,190), outline=(164,245,255,230), width=3)
    ld.line((x,y+13,x+random.randint(-20,20),y+55), fill=(255,185,83,170), width=3)
# molecule-like PLCG2 nodes
for x,y in [(1150,220),(1320,330),(1200,770),(980,730)]:
    for ang in range(0,360,60):
        xx=x+math.cos(math.radians(ang))*34; yy=y+math.sin(math.radians(ang))*34
        ld.line((x,y,xx,yy), fill=(131,232,255,180), width=3)
        ld.ellipse((xx-7,yy-7,xx+7,yy+7), fill=(83,204,255,220))
    ld.ellipse((x-10,y-10,x+10,y+10), fill=(255,190,87,230))
img=Image.alpha_composite(img, layer)
# soft glow from neuron layer
blur=layer.filter(ImageFilter.GaussianBlur(18)); img=Image.alpha_composite(img, blur)
img=Image.alpha_composite(img, layer)
# no text: editorial image can be used with external caption
img.convert('RGB').save('/home/ubuntu/Euvouserdoutor/public/plcg2_sinapses_alzheimer_2026.jpg', quality=94, subsampling=0)
print('saved')
