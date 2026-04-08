# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/blog site (lokeshdhakar.com) built with Metalsmith (static site generator) and Nunjucks templating. Interactive pages use Vue.js for client-side rendering. Hosted on Dreamhost, deployed via SFTP.

**Node version**: 22 (see .nvmrc)

## Commands

```bash
npm run dev          # Build + watch + serve at http://localhost:8080
npm run build        # Build static site (src/ → dist/)
npm run deploy       # SFTP deploy dist/ to Dreamhost
npm run test         # Run foursquare utility tests (test/foursquare.test.mjs)

# Data fetching
npm run strava              # Fetch & process Strava activities → src/data/
npm run foursquare-fetch    # Fetch raw Foursquare check-ins
npm run foursquare-process  # Process, categorize, aggregate check-ins → src/data/
npm run notes               # Convert src/notes/ markdown → src/data/notes.json

# Places admin
npm run places-admin-server # Start Express API server for venue metadata
npm run places-admin        # Open admin UI for adding venue comments/traits

# Utilities
npm run img <FILENAME>      # Resize image, generate thumbnail, place in media folder
```

**Live reload**: Add `<script src="http://localhost:35729/livereload.js"></script>` to `src/layouts/base.njk` during development (don't commit).

## Architecture

### Build Pipeline

`build.js` configures the Metalsmith pipeline: reads markdown from `src/`, applies plugins (markdown, collections, permalinks, layouts), outputs static HTML to `dist/`. Custom Nunjucks filters for date formatting are defined in `build.js` under `engineOptions`. Dev mode adds file watching and a local server.

Uses a patched fork of `metalsmith-permalinks` (pointed at lokesh's GitHub) to support custom slugs via `permalink` front-matter.

### Content Model

- **Blog posts**: Markdown files in `src/posts/` with YAML front-matter (title, date, layout). Custom CSS/JS can be inlined in the markdown file.
- **Notes**: Markdown in `src/notes/`, converted to JSON via `npm run notes`, rendered by Vue app in `src/notes.md`.
- **Pages**: Top-level markdown files in `src/` (index.md, about.md, running.md, places.md, etc.).
- **Layouts**: Nunjucks templates in `src/layouts/` — `base.njk` is the master template.

### Data-Driven Pages

Three pages use Vue.js (loaded as ES module, no build step) to render JSON data:

- **Running** (`src/running.md`): Displays Strava activities as visual bars. Data fetched by `build/strava.js`, which handles OAuth token refresh and writes to `src/data/strava-activities.json` and `src/data/strava-activities-edited-runs.json`.

- **Places** (`src/places.md`): Displays Foursquare/Swarm check-ins with filtering by location and category. Two-stage pipeline: fetch (`build/foursquare-fetch.js`) then process (`build/foursquare-process.js`). Processing remaps Foursquare categories to ~10 custom categories via CSV (`build/data/foursquare-custom-categories.csv`), marks first/last visits, merges venue metadata from admin, and outputs `places-all-time.json` and `places-grouped-by-year.json`.

- **Notes** (`src/notes.md`): Displays notes with thumbnails from `src/data/notes.json`.

### Places Admin

Express server (`admin/server.js`) + HTML UI (`admin/places.html`) for adding venue comments and traits (date spot, outdoor seating, etc.). Data saved to `build/data/places-comments.json`, merged during `foursquare-process`.

### Frontend

No JS build step — browser ES6 modules loaded directly. Utility functions in `src/js/utils/` (foursquare.js, site.js, color.js, location.js, text.js). Vendor deps in `src/js/deps/`.

### API Credentials

Strava and Foursquare tokens stored in `.private` file (not in git). SFTP credentials in `.env`. See `.private.example` and `.env.example` for format. Strava tokens expire every 6 hours; `build/strava.js` handles refresh automatically.

## Writing a New Post

1. Duplicate an existing markdown file in `src/posts/`
2. Update front-matter (title, date, layout)
3. For custom URL slug, add `permalink: 'my-slug'` to front-matter
4. One-off CSS: add `<style>` tag in the markdown
5. One-off JS: add `<script>` tag at the bottom of the markdown

## Testing

Tests are in `test/foursquare.test.mjs` with test data in `test/data/checkins.js`. Tests cover the client-side filtering/aggregation functions from `src/js/utils/foursquare.js` (checkinsToVenues, filterByCategory, filterByLocation, filterByMetadata).

## Adding Content

### Notes

1. Add a markdown file to `src/notes/` (duplicate an existing one)
2. Run `npm run notes` to regenerate `src/data/notes.json`
3. For thumbnail: grab a tall-aspect-ratio image, run `npm run img <FILENAME>` to resize and place it

### Sketches

1. Update `src/data/sketches.json`
2. Codepen thumbs auto-generate at 640x360px; for manual creation run `npm run img <FILENAME>`

### Work/Projects images

Export 2400x1800 from Figma, compress with squoosh.app (WebP, effort 4, quality 75, preserve transparency).

## Re-authorizing API Tokens

### Strava

Tokens auto-refresh via `build/strava.js`. If fully broken:

1. Visit `http://www.strava.com/oauth/authorize?client_id=7203&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read`
2. Grab the `code` from the redirect URL
3. POST to `https://www.strava.com/api/v3/oauth/token` with client_id, client_secret (from Strava API settings), the code, and `grant_type=authorization_code`
4. Update `.private` with the returned access_token and refresh_token

### Foursquare

1. Visit `https://foursquare.com/oauth2/authenticate?client_id=EOR1IUQHRPBCVEAFX0XTOCTPRSIJARFVXZGBUGKV012MNA4C&response_type=code&redirect_uri=https://www.google.com`
2. Grab the `code` from the redirect URL
3. GET/POST to `https://foursquare.com/oauth2/access_token` with client_id, client_secret, the code, `grant_type=authorization_code`, and `redirect_uri=https://www.google.com`
