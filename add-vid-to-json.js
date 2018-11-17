const fs = require('fs');
const { resolve } = require('path');

const id = process.argv[2];
const filename = process.argv[3];
const title = process.argv[4];
const customTitle = process.argv[5];
const duration = process.argv[6];
const dateAdded = new Date().toJSON();

// Load JSON
const videosFilePath = resolve(process.cwd(), 'src/data/inspiration-videos.json');
let videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf-8'))

// Add video obj to JSON file if it doesn't exist
let index = videos.findIndex(video => video.id == id);
if (index === -1) {
  videos.push(
  {
    id,
    filename,
    title,
    customTitle,
    duration,
    dateAdded
  });
  fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));
} else {
    console.log('⚠️ Entry for this video already exists in JSON file.');
}

