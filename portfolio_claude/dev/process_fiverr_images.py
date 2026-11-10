#!/usr/bin/env python3
import os
import glob
from PIL import Image

# Aumenta o limite de pixels para aceitar full-page screenshots gigantes sem erro
Image.MAX_IMAGE_PIXELS = None

ROOT = '/Users/erikplacido/Documents/Projetos/portfolio/portfolio_claude'
BASE_DIR = os.path.join(ROOT, 'fiverr_exports')
PNG_DIR = os.path.join(BASE_DIR, '01_fullpage_retina_png')
JPG_DIR = os.path.join(BASE_DIR, '02_fullpage_web_jpg')
SLIDES_DIR = os.path.join(BASE_DIR, '04_gig_gallery_slides')

os.makedirs(JPG_DIR, exist_ok=True)
os.makedirs(SLIDES_DIR, exist_ok=True)

png_files = sorted(glob.glob(os.path.join(PNG_DIR, '*.png')))
print(f"[PROCESS] Processando {len(png_files)} imagens PNG para gerar JPGs otimizados e Slides 16:9...")

for idx, png_path in enumerate(png_files, 1):
    base_name = os.path.splitext(os.path.basename(png_path))[0]
    jpg_path = os.path.join(JPG_DIR, f"{base_name}.jpg")
    case_slides_dir = os.path.join(SLIDES_DIR, base_name)
    os.makedirs(case_slides_dir, exist_ok=True)

    print(f"\n[{idx}/{len(png_files)}] Processando: {base_name}...")
    try:
        with Image.open(png_path) as img:
            # Converte RGBA para RGB com fundo branco caso haja transparência
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            else:
                rgb_img = img.convert('RGB')

            width, height = rgb_img.size

            # 1. Salvar versão JPG Fullpage otimizada (qualidade 88, subsampling 4:2:0)
            rgb_img.save(jpg_path, 'JPEG', quality=88, optimize=True)
            jpg_size_mb = os.path.getsize(jpg_path) / (1024 * 1024)
            print(f"  ✓ JPG Fullpage salvo: {os.path.basename(jpg_path)} ({jpg_size_mb:.2f} MB)")

            # 2. Gerar Fatias Sequenciais 16:9 para a Galeria do Fiverr
            # Proporção 16:9 na largura original (width):
            slice_height = int(width * 9 / 16)
            total_slides = (height + slice_height - 1) // slice_height

            # Limita a no máximo 12 slides por case para não sobrecarregar
            max_slices = min(total_slides, 10)
            
            for s_idx in range(max_slices):
                top = s_idx * slice_height
                bottom = min(top + slice_height, height)
                
                # Se for a última fatia e for menor que a altura 16:9, preenche com a cor de fundo do rodapé
                slice_crop = rgb_img.crop((0, top, width, bottom))
                if slice_crop.size[1] < slice_height:
                    bg_color = slice_crop.getpixel((width // 2, slice_crop.size[1] - 1))
                    padded_slide = Image.new('RGB', (width, slice_height), bg_color)
                    padded_slide.paste(slice_crop, (0, 0))
                    slice_crop = padded_slide

                # Redimensiona para resolução ideal do Fiverr: 1920x1080
                fiverr_slide = slice_crop.resize((1920, 1080), Image.Resampling.LANCZOS)
                slide_filename = os.path.join(case_slides_dir, f"slide_{s_idx + 1:02d}.jpg")
                fiverr_slide.save(slide_filename, 'JPEG', quality=90, optimize=True)

            print(f"  ✓ {max_slices} slides 16:9 gerados em: {os.path.relpath(case_slides_dir, ROOT)}")

    except Exception as e:
        print(f"  ✗ Erro ao processar {base_name}: {e}")

print("\n[PROCESS] Todos os tratamentos de imagem concluídos com sucesso!")
