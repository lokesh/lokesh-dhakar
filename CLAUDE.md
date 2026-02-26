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
npm run test         # Run foursquare utility tests (test/foursquare.test.js)

# Data fetching
npm run strava              # Fetch & process Strava activities → src/data/
npm run foursquare-fetch    # Fetch raw Foursquare check-ins
npm run foursquare-process  # Process, categorize, aggregate check-ins → src/data/
npm run notes               # Convert src/notes/ markdown → src/data/notes.json

# Utilities
npm run img <FILENAME>      # Resize image, generate thumbnail, place in media folder
```

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

Tests are in `test/foursquare.test.js` with test data in `test/data/checkins.js`. Tests cover the client-side filtering/aggregation functions from `src/js/utils/foursquare.js` (checkinsToVenues, filterByCategory, filterByLocation, filterByMetadata).
