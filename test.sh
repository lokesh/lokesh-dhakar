#!/usr/bin/env bash

# title=$(youtube-dl --get-title 8dGuXne80tE>&1)
# duration=$(youtube-dl --get-duration 8dGuXne80tE>&1)

# node test.js "$title" $duration

# echo "${BLUE}Enter file name to use (ex. clay-teapot):${NORMAL}"
customTitle="Forging a hunting knife"
echo customTitle
# read filename

filename="${customTitle// /-}"
echo $filename

# read userInput
filename=$(echo "$filename" | tr '[:upper:]' '[:lower:]')
echo $filename


# echo "${BLUE}Enter file name to use (ex. clay-teapot):${NORMAL}"
# filename="clay-teapot"
# read filename

# str="${str// /_}"

# read userInput
# userInput=$(echo "$userInput" | tr '[:upper:]' '[:lower:]')
