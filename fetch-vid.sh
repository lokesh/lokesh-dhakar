#!/usr/bin/env bash

# ------------
# REQUIREMENTS
# ------------
# ffmpeg:     brew install ffmpeg
# youtube-dl: brew install youtube-dl

# ------
# CONFIG
# ------

folder="/Users/lokesh/git/lokesh-dhakar/src/media/inspiration/videos"

# ---

# Stops the script if a command has an error
set -e

NORMAL=$(tput sgr0)
YELLOW=$(tput setaf 190)
BLUE=$(tput setaf 153)

echo "${BLUE}Enter video id (ex. ybb-HhSrtxA):${NORMAL}"
id="8dGuXne80tE"
# read id

echo "${BLUE}Enter file name to use (ex. clay-teapot):${NORMAL}"
filename="tester"
# read filename


# Download youtube video and thumbnail with
# ---

# youtube-dl https://www.youtube.com/watch?v=${id} --write-thumbnail -o "${folder}/${filename}.%(ext)s" --restrict-filenames -f 243

# List of available video file formats
# ---
# We try to download file format '243', which is a 640 x 320 webm file.
# If it fails, or doesn't exist, you can pull up a list of available file
# formats up with the following command.
# youtube-dl https://www.youtube.com/watch?v=${id} -F


# Extract keyframes as jpegs
# ---

# ffmpeg -i "${folder}/${filename}.webm" -vf "select=eq(pict_type\,I)" -vsync vfr ${folder}/${filename}-%d.jpg -hide_banner


# Resize images?
node test.js "really" "that would be cool"
