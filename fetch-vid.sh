#!/usr/bin/env bash

# ------------
# REQUIREMENTS
# ------------
# brew install youtube-dl
# brew install ffmpeg
# sips (built-in to OSX)

# ------
# CONFIG
# ------

folder="/Users/lokesh/git/lokesh-dhakar/src/media/inspiration"

# ---

NORMAL=$(tput sgr0)
YELLOW=$(tput setaf 190)
BLUE=$(tput setaf 153)

echo "${BLUE}Enter video id (ex. ybb-HhSrtxA):${NORMAL}"
# id="ybb-HhSrtxA"
read id

echo "${BLUE}Enter the title you want to display under the thumbnail (ex. Forging a knife):${NORMAL}"
# filename="clay-teapot"
read customTitle

filename="${customTitle// /-}"
filename=$(echo "$filename" | tr '[:upper:]' '[:lower:]')


# Clean up old files
rm ${folder}/${filename}*

# Download youtube video and thumbnail.
# ---
# We try to download file format '243', which is a 640 x 320 webm file.
# If it fails, or doesn't exist, you can pull up a list of available file
# formats up with the following command.
# youtube-dl https://www.youtube.com/watch?v=${id} -F
#
# set -e Stops the script if a command has an error
set -e
youtube-dl https://www.youtube.com/watch?v=${id} --write-thumbnail -o "${folder}/${filename}.%(ext)s" --restrict-filenames -f 243

title=$(youtube-dl --get-title 8dGuXne80tE>&1)
duration=$(youtube-dl --get-duration 8dGuXne80tE>&1)

set +e
sips --resampleWidth 480x --setProperty formatOptions 80 ${folder}/${filename}.jpg


# Extract keyframes as jpegs
# ---
# We need 20 keyframes to generate the sprite sheet. We parse 200 seconds of the video file which
# is more than enough for us to get 20 keyframes. We delete the excess keyframes and the video
# file after.
ffmpeg -t 200 -i "${folder}/${filename}.webm" -vf "select=eq(pict_type\,I)" -vsync vfr ${folder}/${filename}-%d.jpg -hide_banner

rm ${folder}/${filename}-{21..500}*
rm ${folder}/${filename}.webm

# Resize preview images down to 320 and combine into one horiozntal image.
# ---
sips --resampleWidth 240x ${folder}/${filename}-*.jpg
convert -quality 70% +append ${folder}/${filename}-* ${folder}/${filename}-sprite.jpg

rm ${folder}/${filename}-{1..20}*

node test.js ${id} ${filename} ${title} ${customTitle} ${duration}
