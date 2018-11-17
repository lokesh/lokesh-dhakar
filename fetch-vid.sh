#!/usr/bin/env bash


# ------------
# REQUIREMENTS
# ------------
# brew install youtube-dl
# brew install ffmpeg
# pip install glue
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

echo "${BLUE}Enter file name to use (ex. clay-teapot):${NORMAL}"
# filename="clay-teapot"
read filename

# Remove old versions
rm ${folder}/${filename}*

# Download youtube video and thumbnail with
# ---
# set -e Stops the script if a command has an error
set -e
youtube-dl https://www.youtube.com/watch?v=${id} --write-thumbnail -o "${folder}/${filename}.%(ext)s" --restrict-filenames -f 243
set +e


sips --resampleWidth 480x --setProperty formatOptions 80 ${folder}/${filename}.jpg

# List of available video file formats
# ---
# We try to download file format '243', which is a 640 x 320 webm file.
# If it fails, or doesn't exist, you can pull up a list of available file
# formats up with the following command.
# youtube-dl https://www.youtube.com/watch?v=${id} -F


# Extract keyframes as jpegs
# ---
# We need is 20 keyframes. We parse 200 seconds of the video file which  usually
# gets us about 40, so a nice buffer.
ffmpeg -t 200 -i "${folder}/${filename}.webm" -vf "select=eq(pict_type\,I)" -vsync vfr ${folder}/${filename}-%d.jpg -hide_banner

# Delete unneeded files. Frames after 50 and the video file.
# ---

rm ${folder}/${filename}-{21..500}*
rm ${folder}/${filename}.webm

# Resize preview images down to 320
# ---
# Using the built in OSX sips util. Alternative to imagemagick.
sips --resampleWidth 240x ${folder}/${filename}-*.jpg


# Combine preview images into one horizontal image
# ---
convert -quality 50% +append ${folder}/${filename}-* ${folder}/${filename}-sprite.jpg

rm ${folder}/${filename}-{1..20}*

node test.js "really" "that would be cool"
