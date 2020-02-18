// node resize.js snow-crash.jpg

const jimp = require('jimp');
const path = require('path');

const file = process.argv[2];
let quality = process.argv[3];

// Argument validation
if (!file) {
  throw new Error('⚠️ Filename must be passed as argument');
}

const HEIGHT = 480;
const destPath = path.resolve(process.cwd() + '/src/media/notes');
const fileNoExt = path.parse(file).name;

quality = quality ? quality : 65;

async function main() {
  const img = await jimp.read(file);
  img.quality(quality)
  await img.resize(jimp.AUTO, HEIGHT)
  await img.writeAsync(`${destPath}/${fileNoExt}.jpg`);
}

main();
