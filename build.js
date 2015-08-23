require('harmonize')();

// Metalsmith
var metalsmith = require('metalsmith');

// Metalsmith Plugins
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

var siteBuild = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'lokeshdhakar.com',
      url: 'http://lokeshdhakar.com'
    }
  })
  .source('./src')
  .destination('./dist')
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
        "src//**/*": true
        // "templates/**/*": "**/*.md",
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
