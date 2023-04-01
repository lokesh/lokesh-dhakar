const browserSync = require('browser-sync')
const chokidar = require('chokidar')
const msBuild = require('./metalsmith.js') // <-- here is our metalsmith build

chokidar
  .watch(['src','layouts'], {
    // avoids causing duplicate builds for initially detected files and folders
    ignoreInitial: true
  })
  .on('ready', () => browserSync.init({
    host: 'localhost',
    port: 3000,
    server: './build',
    injectChanges: false,  // false = prefer full reload
    interval: 2000         // adjust if the build hasn't finished before the browser opens
  }))
  .on('all', async (...args) => {
    await msBuild()
    browserSync.reload()
  })

(async function() {
  await msBuild()
}())