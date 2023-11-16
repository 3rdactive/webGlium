import os
import argparse
from PIL import Image
from tqdm import tqdm

def change_text_color(directory, new_color):
    files = [f for f in os.listdir(directory) if f.endswith('.png')]
    for filename in tqdm(files, desc="Processing images"):
        file_path = os.path.join(directory, filename)
        try:
            with Image.open(file_path) as img:
                if img.mode != 'RGBA':
                    img = img.convert('RGBA')

                data = img.getdata()
                newData = []

                for item in data:
                    if item[0] < 100 and item[1] < 100 and item[2] < 100:
                        newData.append(new_color + (item[3],))
                    else:
                        newData.append(item)

                img.putdata(newData)
                img.save(file_path)
        except IOError:
            print(f"Cannot process {filename}")

def main():
    parser = argparse.ArgumentParser(description='Change text color in images.')
    parser.add_argument('directory', type=str, help='Directory containing the font images')
    parser.add_argument('--r', type=int, default=255, help='Red color value (0-255)')
    parser.add_argument('--g', type=int, default=255, help='Green color value (0-255)')
    parser.add_argument('--b', type=int, default=255, help='Blue color value (0-255)')

    args = parser.parse_args()

    new_color = (args.r, args.g, args.b)
    change_text_color(args.directory, new_color)

if __name__ == "__main__":
    main()
