require('harmonize')();

// Metalsmith
var metalsmith = require('metalsmith');

// Metalsmith Plugins
var autoprefixer = require('metalsmith-autoprefixer');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

var siteBuild = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Lokesh Dhakar',
      url: 'http://lokeshdhakar.com'
    }
  })
  .source('./src')
  .destination('./dist')
  .use(sass({
    outputDir: 'css/',
    outputStyle: 'expanded'
  }))
  .use(autoprefixer())
  .use(markdown())
  .use(permalinks(':title'))
  .use(layouts({
    engine: 'jade',
    directory: 'src/layouts'
  }))
  .use(serve())
  .use(
    watch({
      paths: {
        '${source}/**/*': true,
        // When a SASS file is edited, force a complete rebuild. I was not able to get
        // metalsmith-watch to rebuild just the CSS on a SASS edit.
        '${source}/sass/**/*': '**/*',
        '${source}/layouts/**/*': '**/*'
      },
      livereload: true
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
