# lokeshdhakar.com

- Built with [Metalsmith](http://www.metalsmith.io/), a simple, plugin driven static site generator.
- [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) for templating. 

Example [Metalsmith + Nunjucks demo site](https://github.com/voorhoede/demo-metalsmith-nunjucks).


## Writing a new post

Duplicate an existing post's md file.

- **Adding one-off CSS for a post.** Add the styles in a style tag in the md file.
- **Adding one-off JS for a post.** Add a script tag at the bottom of the md file.


## Developing

```
npm run dev  // Builds, sets up watchers, and serves at http://localhost:8080.
```

**Enable live reloading.** Add `<script src="http://localhost:35729/livereload.js"></script>` to 
each page. You can add to `base.njk`.

**Templates.** Using [Nunjuks] for templating.

## Deploying

Refresh data for the Boston Marathon blog post which hits the Strava API. Run at least once a year.
```
npm run fetch-data
``` 

```
node deploy // Not in repo.
```
