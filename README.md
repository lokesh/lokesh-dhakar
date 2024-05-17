# lokeshdhakar.com

- Built with [Metalsmith](http://www.metalsmith.io/), a simple, plugin driven static site generator.
- Templating with [Nunjucks](https://mozilla.github.io/nunjucks/templating.html).
- Hosted on Netlify

Example [Metalsmith + Nunjucks demo site](https://github.com/voorhoede/demo-metalsmith-nunjucks).


## To-do

### Next
- Update this readme. Decide on wether to keep or update the following pages: running , notes, page, places, sketches, and inspiration

### Nice-to-haves
- Add videos bitsweeper, team bee

### Maybe someday
- Add filtering to work section
- Add infographics: coffee and baseball pitches

## Work

Images
1. Export 2400 x 1800 from Figma
2. Use squoosh.app to compress. WebP, effort 4, quality 75, preserve transparency


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

---

If API busted, refetch access and refresh tokens:

1. Visit the following URL and allow access to all public data. To pull down private data, update the scope. http://www.strava.com/oauth/authorize?client_id=7203&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read
2. Once redirected, grab the code from the URL.
3. Use Postman/bruno to POST:
https://www.strava.com/api/v3/oauth/token?
  client_id=FIND_AT_SETTINGS_API
  &client_secret=FIND_AT_SETTINGS_API
  &code=GET_FROM_PREV_URL
  &grant_type=authorization_code
4. The response will include an access_token and refresh_token. Update .private



### Update Places data

//1. `npm run foursquare-fetch`
2. `npm run foursquare-process`



---

If API busted, refetch tokens:
1. Visit: 
https://foursquare.com/oauth2/authenticate?client_id=EOR1IUQHRPBCVEAFX0XTOCTPRSIJARFVXZGBUGKV012MNA4C&response_type=code&redirect_uri=https://www.google.com
2. Once redirected, grab the code from the URL.
3. GET or POST with Postman or Bruno: https://foursquare.com/oauth2/access_token
    ?client_id=CLIENT_ID
    &client_secret=CLIENT_SECRET
    &grant_type=authorization_code
    &redirect_uri=https://www.google.com
    &code=CODE_FROM_PREV_URL

### Update places metadata

- Fetch latest check-in data.
- `npm run places-admin-server`
- `npm run places-admin`
- Add metadata through the admin.
- Update `build/foursquare.js` and set `MERGE_VENUES_METADATA` to `true` and run `npm run foursquare`


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

## Architecture


### Places

I've been using Swarm (fka Foursquare) to check-in to places (restaurants, parks, etc) for 10+ years as a personal log. The Places page on my site displays this data with a custom UI. We first pull down the data from the Foursquare API, process it, and then dump the processed data into two JSON files that are ready for displaying in the UI.

How it all works in more details...

1. Fetch
`npm run foursquare` will run `build/foursquare-fetch.js`

This pages through my check-ins and then collects them into a single json file `src/data/foursquare-checkins.json`. 

1B. Simplify

Take raw Foursquare API checkin data and both, flatten and strip down to essentials:
```
{
    "venue": "Whole Foods Market",
    "venueId": "52603bff11d21a914be4eb71",
    "city": "San Francisco",
    "state": "CA",
    "country": "United States",
    "category": "Grocery Store",
    "year": 2022,
    "month": 0
  },
```

2. More processing
`npm run foursquare` will run `build/foursquare-process.js`

2A. Remap venue categorizes

The Foursquare categorization of venues doesn't suit my needs. e.g. I'd like Bakeries and Cafes to be bucketed together. For this reason, I do a remapping of the categories into approximately 10 main categories which I will later show in the UI. I remap most, but not all, of the 1200+ categories.

The remapping is tracked in a [Google Doc](https://docs.google.com/spreadsheets/d/1YVD54Ree4aF8sivG3qOB9YuRB20Hg_RcvamMRjWnjDI/edit#gid=0) from where a CSV is exported: `build/data/foursquare-custom-categories.csv`.

2B. Mark first and last visit

If a check-in was the first or last time I visisted, note it in the check-in data. This is used in the UI to help indicate first visits to a venue.

2C. Insert comments

npm run `foursquare-admin-server`;
npm run `foursquare-admin`;

Starts up a small admin interface for adding comments to venues as well as adding custom traits (date spot, would take visitors, outdoor seating, et al).

The data from the admin is saved to `src/data/venues-metadata.json` and in this step it is merged into the check-in data.

2D. Prep for display

Create two data sets. One that is grouped by year and an all-time set. This is the step where we stop tracking individual check-ins and instead aggregate into venues.

2E. Output file

We output two JSON files that are consumed by the UI:
`places-grouped-by-year.json`
`places-all-time.json'`

3. Display

places.md

A UI built with VueJS.

#### Data structure

New custom top-level categories have been created. The category field from the Foursquare API is moved into a new `subCategory` field.

Example processed checkin data:
```
{
  "venue": "Dolores Park Cafe",
  "venueId": "44ca68a6f964a52001361fe3",
  "city": "San Francisco",
  "state": "CA",
  "country": "United States",
  "category": "Coffee", // These are custom. 4sq cat moved to subCategory
  "year": 2022,
  "month": 5,
  "subCategory": "Café",
  "firstVisit": false, // Is this the first time visiting this venue
  "lastVisit": false, // Was this the most recent visit
}
```

`firstVisit` is not a guarantee that the checkin is the first visit. We are looking at checkin data at month-level granularity. If multiple checkins happens at the venue in the same month as the first visit, then all of these checkins will have `firstVisit` set to `true`. Same situation with `lastVisit`.

#### Testing

`npm run test`

Simple, ad-hoc testing.
- Tests: `test/foursquare.test.js`.
- Functions being tested: `src/js/utils/foursquare.js`

Continue to move unit testable functions from `places.md` into the utils file.

