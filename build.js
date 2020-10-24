const fs = require('fs');
const { resolve } = require('path');

// Metalsmith
var metalsmith = require('metalsmith');

// Metalsmith Plugins
const when = require('metalsmith-if');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

const isDevMode = process.env.MODE === 'dev';

var siteBuild = metalsmith(__dirname)
  // Have Metalsmith ignore our Notes markdown files.
  // We convert them to JSON and load them into our Vue app in notes.md
  .ignore([
    '**/notes/*.md'
  ])
  .metadata({
    site: {
      title: 'Lokesh Dhakar',
      url: 'https://lokeshdhakar.com'
    }
  })

  .source('./src')
  .destination('./dist')
  .clean(true) // Clean destination dir on build
  .use(collections({
     posts: {
       pattern: 'posts/*.md',
       sortBy: 'date',
       reverse: true,
      }
  }))
  .use(markdown())
  .use(permalinks({
    'pattern': ':title',
    // https://github.com/segmentio/metalsmith-permalinks/issues/39#issuecomment-166571578
    'relative': false,
  }))
  .use(layouts({
    directory: 'src/layouts',
    engineOptions: {
      filters: {
        date: function(date) {
          return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },
        isLessThanYearOld: function(date) {
          const now = new Date();
          let diff = now.getTime() - date.getTime();
          let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          return (diffDays <= 365)
        },
      },
    }
  }))
  .use(
    when(
      isDevMode,
      serve()
    )
  )
  .use(
    when(
      isDevMode,
      watch({
        paths: {
          '${source}/**/*': true,
          '${source}/data/**/*': '**/*',
          '${source}/css/**/*': '**/*',
          '${source}/components/**/*': '**/*',
          '${source}/js/**/*': '**/*',
          '${source}/layouts/**/*': '**/*'
        },
        livereload: isDevMode
      })
    )
  )
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      // TEMP LOCATION
      const redirectsFilePath = resolve(process.cwd(), '_redirects');
      const redirectsDestFilePath = resolve(process.cwd(), 'dist/_redirects');

      fs.copyFileSync(redirectsFilePath, redirectsDestFilePath);

      console.log('Site build complete!');
    }
  });


