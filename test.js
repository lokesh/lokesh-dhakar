const fetch = require('node-fetch');
const fs = require('fs');
const { resolve } = require('path');


const id = process.argv[2];
const filename = process.argv[3];
const title = process.argv[4];
const customTitle = process.argv[5];
const duration = process.argv[6];
const dateAdded = new Date().toJSON();

// Load existing JSON
const videosFilePath = resolve(process.cwd(), 'test.json');
let videos = JSON.parse(fs.readFileSync(videosFilePath, 'utf-8'))
console.log(videos);

// Check if id already exists
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

  // Update the raw activities json file
  fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));

} else {
  console.log("SKIP!");
}
// If not, add it


/*
"id": "zoY0q4qaJeA",
"filename": "woodblock-print",
"name": "Ukiyoe Heroes Portraits (#1) : Proof printing 'The Wolf Goddess'",
"customName": "Woodblock printing",
"length": 9
*/


/*
 {
    "id": "2aXqNaDIaPY",
    "filename": "band-lighting",
    "title": "Umphrey's McGee: 'Der Bluten Kat' w/Jefferson Waful LD Commentary",
    "customTitle": "Lighting a musical performance",
    "length": 17
  },

 */
