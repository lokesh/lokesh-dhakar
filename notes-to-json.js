const markdownJson = require('markdown-json');

const settings = {
        name: 'notes-json',
      	cwd: './',
      	src: './src',
        filePattern: 'notes/*.md',
        ignore: "*(icon|input)*",
        dist: './src/data/notes.json',
        server: false,
        port: 3001
      };

markdownJson(settings).then((data) => {
  console.log('data:', data);
}).catch((err) => {
  console.log('error:', err);
})
