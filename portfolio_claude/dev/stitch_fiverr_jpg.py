#!/usr/bin/env python3
# Remonta fiverr_jpg/<case>/00_pagina-inteira.jpg empilhando as imagens de seção
# (o fullPage do Chrome repete o topo e deixa áreas em branco em páginas longas).
import glob, os
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'fiverr_jpg')
for d in sorted(glob.glob(os.path.join(OUT, '*/'))):
    parts = sorted(f for f in glob.glob(d + '*.jpg') if not os.path.basename(f).startswith('00_'))
    ims = [Image.open(f) for f in parts]
    w = ims[0].width
    sheet = Image.new('RGB', (w, sum(i.height for i in ims)), 'white')
    y = 0
    for i in ims:
        sheet.paste(i, (0, y)); y += i.height
    sheet.save(d + '00_pagina-inteira.jpg', quality=88, optimize=True)
    print('✓', os.path.basename(d.rstrip('/')), sheet.size)
