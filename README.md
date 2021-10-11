# lokeshdhakar.com

- Built with [Metalsmith](http://www.metalsmith.io/), a simple, plugin driven static site generator.
- Templating with [Nunjucks](https://mozilla.github.io/nunjucks/templating.html).
- Hosted on Netlify

Example [Metalsmith + Nunjucks demo site](https://github.com/voorhoede/demo-metalsmith-nunjucks).

## Writing a new post

Duplicate an existing post's md file.

- **Adding one-off CSS for a post.** Add the styles in a style tag in the md file.
- **Adding one-off JS for a post.** Add a script tag at the bottom of the md file.
- **Adding a custom slug.** The default slug for the URL will be a lowercased, hypenated version of the page title. To add a custom slug, add a permalink prop to the front-matter. Ex. `permalink: 'coffee-drinks'`

The custom slugs are a feature of `metalsmith-permalinks`. There is a [bug](https://github.com/segmentio/metalsmith-permalinks/issues/81) in the master branch of the project's main repo that prevents this feature from being utilized. I've patched the project files and pointed to my fork in `package.json`.

### Tutorial posts

- Use Giphy to capture videos.
- For the reading time, I am using [WordCounter's](https://wordcounter.net/) estimate and multiplying by 1.5 to account for code and examples.

## Adding a Note

- **Markdown**: Add a markdown file to `src/notes`. Duplicate an existing one as a starting point. Then run `npm run notes`, which uses markdown-json to create a `notes.json`. This JSON is read by the Vue app in `notes.md`.
- **Thumbnail**: Grab an image from Google Images or Amazon. The image should have a tall aspect ratio. Then run `npm run img <FILENAME>` which will resize and place it in the media folder.
Icons for note types from Feather Icons.

## Adding a Sketch

- Update `src/data/sketches.json`.
- **Thumbnail**: Codepen thumbs are auto-generated at 640 x 360px. For manual creation, run `npm run img <FILENAME>` which will resize your image, generate a thumbnail, and place it in the media folder.
  - Thumbnails are rendered at a 16:9 aspect ratio on desktop and slightly taller on mobile. For best results, use an image with a 16:9 or similar aspect ratio.

## Updating data used on pages and posts

### Update Running page data

Fetch the latest data from Strava and parse it.

```
npm run strava
```

### Update places data

Fetch the latest Swarm check-in data with the Foursquare API.

```
npm run foursquare
```


<!--
### Adding a video to Inspiration page

Run the fetch-vid shell script and specify the Youtube video id and the title you would
like to show below the video thumb.

Before running the script, check the requirements listed at the top of the file.

```
./fetch-vid.sh
```
-->

## Developing

```
npm run dev  // Builds, sets up watchers, and serves at http://localhost:8080.
```

**Enable live reloading.** Add `<script src="http://localhost:35729/livereload.js"></script>` to
each page. You can add to `base.njk`.

**Templates.** Using [Nunjuks] for templating.

- To add custom string formatters, edit the `engineOptions` object in `build.js`.

## Deploying

```
npm run deploy
```
