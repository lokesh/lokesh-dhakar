const { program } = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const jimp = require('jimp');
const resizeImage = require('./utils/resizeImage');

/* ------ */
/* CONFIG */
/* ------ */
const NOTE_QUALITY = 60;
const NOTE_MAX_HEIGHT = 480;
const NOTE_PATH = path.resolve(process.cwd() + '/src/media/notes');

const SKETCH_QUALITY = 70;
const SKETCH_THUMB_QUALITY = 60;
const SKETCH_MAX_SIZE = 2000;
const SKETCH_THUMB_MAX_SIZE = 480;
const SKETCH_PATH = path.resolve(process.cwd() + '/src/media/sketches');

// Argument validation
if (!process.argv[2]) {
  throw new Error('⚠️ Filename must be passed as argument');
}

function prompt() {
  return inquirer
    .prompt([
      { type: 'list', name: 'type', message: 'Choose type', choices: ['Note', 'Sketch'] },
      // { type: 'number', name: 'quality', message: 'JPEG compression quality', default: 65 }
    ]);
}

async function saveNoteImage(file) {
  let fileNoExt = path.parse(file).name;
  const img = await jimp.read(file);
  img.quality(NOTE_QUALITY)
  await resizeImage(img, { maxHeight: NOTE_MAX_HEIGHT });
  await img.writeAsync(`${NOTE_PATH}/${fileNoExt}.jpg`);
}

async function saveSketchImages(file) {
  let fileNoExt = path.parse(file).name;

  // Large image
  const img = await jimp.read(file);
  img.quality(SKETCH_QUALITY)
  await resizeImage(img, { maxSize: SKETCH_MAX_SIZE });
  await img.writeAsync(`${SKETCH_PATH}/${fileNoExt}.jpg`);

  // Thumbnail
  const thumb = await jimp.read(file);
  thumb.quality(SKETCH_THUMB_QUALITY)
  await resizeImage(thumb, { maxSize: SKETCH_THUMB_MAX_SIZE });
  await thumb.writeAsync(`${SKETCH_PATH}/${fileNoExt}-thumb.jpg`);

  // Clean up
  fs.unlinkSync(file);
}

program
  .arguments('<file>')
  .action(function(file) {
    prompt()
      .then(function(answers) {
        if (answers.type === 'Note') {
          saveNoteImage(file);
        } else if (answers.type === 'Sketch') {
          saveSketchImages(file);
        }
      })
  });

program.parse(process.argv);
