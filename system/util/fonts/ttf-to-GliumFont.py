import os
import argparse
from PIL import Image, ImageFont, ImageDraw
from tqdm import tqdm

def create_font_images(font_path, output_dir, ascii_start, ascii_end, image_size):
    if not os.path.exists(font_path):
        print(f"Font file '{font_path}' not found.")
        return

    try:
        font = ImageFont.truetype(font_path, image_size)
    except IOError:
        print(f"Failed to load font '{font_path}'. It may be corrupted or not a valid .ttf file.")
        return

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for i in tqdm(range(ascii_start, ascii_end + 1), desc="Creating images"):
        try:
            image = Image.new('RGBA', (image_size, image_size), (255, 255, 255, 0))
            draw = ImageDraw.Draw(image)
            char = chr(i)

            # Correct usage of textsize
            w, h = font.getsize(char)  # Use font object to get text size

            draw.text(((image_size - w) / 2, (image_size - h) / 2), char, fill="black", font=font)
            image.save(f"{output_dir}/F{i}.png")
        except Exception as e:
            print(f"Error creating image for character: {chr(i)} (ASCII: {i}). Error: {e}")

def main():
    parser = argparse.ArgumentParser(description='Create images from TTF font.')
    parser.add_argument('font_path', type=str, help='Path to the TTF font file')
    parser.add_argument('output_dir', type=str, help='Directory to save the output images')
    parser.add_argument('ascii_start', type=int, help='Starting ASCII code')
    parser.add_argument('ascii_end', type=int, help='Ending ASCII code')
    parser.add_argument('--size', type=int, default=64, help='Image size (default: 64)')

    args = parser.parse_args()

    create_font_images(args.font_path, args.output_dir, args.ascii_start, args.ascii_end, args.size)

if __name__ == "__main__":
    main()
