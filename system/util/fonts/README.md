In this folder are some utility scripts for generating WebGlium Fonts, and the default built in ones

# How do webglium fonts work?

Well when developing fonts i took a rather simplistic approch, when creating a font you enter the path to a directory, said directory should be filled with image files labled to their ASCII numeric code, a commonly used range is 32-255. including almost all characters, every time a character is rendered on screen the program will take the ASCII numeric code of that character and use the sprite labeled as said code.

# ttf-to-GliumFont.py

This creates the GliumFont files from a TTF font file

Dependencies: pillow<=9.5.0 (Functions needed are not present in versions higher then 9.5.0), tqdm

Example usage:
 - python ttf-to-GliumFont.py path/to/font.ttf output/directory 32 255 --size 64

The first argument should define the path to your TTF font file.

The second should define the path where the WebGlium font images will be outputted.

The third and forth are the ascii ranges, reccomended at 32-255, if you have a font with more / less characters. change this to fit that.

the size argument is optional, and will default at 64 (will define the size of each character)

# GliumFontColorFix.py

Webglium works best with white fonts, if they are black tint / text color will not work, this function fixes black fonts

Dependencies: pillow<=9.5.0 (Functions needed are not present in versions higher then 9.5.0), tqdm

Example usage:
 - python GliumFontColorFix.py path/to/font/images

The first argument should define the path to the folder with the images

an optional argument to add is ' --r 255 --g 255 --b 255' which defines what color the font should be corrected TO, this might break your font if you try anything other then 255, making it unusuable in webglium.