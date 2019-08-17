# lokeshdhakar.com

- Built with [Metalsmith](http://www.metalsmith.io/), a simple, plugin driven static site generator.
- [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) for templating.

Example [Metalsmith + Nunjucks demo site](https://github.com/voorhoede/demo-metalsmith-nunjucks).

## Writing a new post

Duplicate an existing post's md file.

- **Adding one-off CSS for a post.** Add the styles in a style tag in the md file.
- **Adding one-off JS for a post.** Add a script tag at the bottom of the md file.
- **Adding a custom slug.** The default slug for the URL will be a lowercased, hypenated version of the page title. To add a custom slug, add a permalink prop to the front-matter. Ex. `permalink: 'coffee-drinks'`

The custom slugs are a feature of `metalsmith-permalinks`. There is a [bug](https://github.com/segmentio/metalsmith-permalinks/issues/81) in the master branch of the project's main repo that prevents this feature from being utilized. I've patched the project files and pointed to my fork in `package.json`.

### Dev 101 posts

- Use Giphy to capture videos.
- For the reading time, I am using [WordCounter's](https://wordcounter.net/) estimate and multiplying by 1.5 to account for code and examples.


## Adding a Note

(Icons for note types from Feather Icons.)

- Add markdown file to `src/notes`. 
- Add an image in `media/notes`. Check Amazon. The image should have a tall aspect ratio and height between 400 and 600px. Save with compression to get the filesize to 35kb or lower.
- `npm run notes` - This uses markdown-json to create a `notes.json` file from the markdown files in the `src/notes` folder. This JSON is read by the Vue app in `notes.md`.

## Updating data used on pages and posts


### Update Running page data

Fetch the latest data from Strava and parse it.

```
npm run strava
```


### Adding a video to Inspiration page

Run the fetch-vid shell script and specify the Youtube video id and the title you would
like to show below the video thumb.
```
./fetch-vid.sh
```

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
