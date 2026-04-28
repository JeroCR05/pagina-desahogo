from PIL import Image, ImageDraw
img = Image.open('d:\\pagina desahogo\\diablito_comiendo.png').convert('RGBA')
img_rgb = img.convert('RGB')
ImageDraw.floodfill(img_rgb, (0, 0), (255, 0, 255), thresh=40)
ImageDraw.floodfill(img_rgb, (img_rgb.width-1, 0), (255, 0, 255), thresh=40)
ImageDraw.floodfill(img_rgb, (0, img_rgb.height-1), (255, 0, 255), thresh=40)
ImageDraw.floodfill(img_rgb, (img_rgb.width-1, img_rgb.height-1), (255, 0, 255), thresh=40)

datas = img_rgb.getdata()
orig_datas = img.getdata()
new_data = []
for i, item in enumerate(datas):
    if item == (255, 0, 255):
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(orig_datas[i])

img.putdata(new_data)
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)
img.save('d:\\pagina desahogo\\diablito_comiendo2.png', 'PNG')
print('Done, bbox:', bbox)
