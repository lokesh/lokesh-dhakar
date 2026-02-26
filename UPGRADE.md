# Upgrade Plan

Recommendations roughly ordered by impact.

## 1. Upgrade Node from 12 to 20+

Node 12 has been EOL since April 2022. It's missing years of security patches and you can't use modern JS features in build scripts (top-level await, optional chaining, etc.). Many dependencies will stop supporting it or already have. This is the highest-priority change — everything else gets easier after this.

## 2. Replace Metalsmith with something maintained

Metalsmith 2.3.0 is effectively abandoned. The plugin ecosystem (metalsmith-watch, metalsmith-serve, etc.) is stale and pinned to old Node. **Eleventy (11ty)** would be the most natural migration — it's also a simple, plugin-driven static site generator that works with Nunjucks templates and markdown with front-matter. Your existing content files and layouts would transfer with minimal changes. You'd get faster builds, active maintenance, and a much better dev server out of the box.

## 3. Drop jQuery

jQuery is only used for light DOM manipulation that's easily done with vanilla JS (`document.querySelector`, `fetch`, etc.), especially since Vue is already used for the interactive pages. It's 87KB of dead weight for visitors.

## 4. Consider replacing Vue with vanilla JS or Alpine.js

The Vue usage on the running, places, and notes pages is relatively thin — rendering lists, filtering, and toggling UI state. These pages don't use Vue Router, Vuex, or component composition. **Alpine.js** (~15KB) would handle the same interactivity with less overhead and no module import complexity. Alternatively, vanilla JS with template literals would work fine for this scale.

This is a lower priority — the current Vue setup works — but it would simplify the frontend and reduce page load.

## 5. Fix the test setup

The tests use a custom `t()` assertion function and require manually editing `package.json` (adding `"type": "module"`) to run. Jest is listed as a dependency but isn't actually used. Either:
- Switch tests to actually use Jest (it's already installed)
- Or use Node's built-in `node:test` and `node:assert` (available in Node 18+, no dependencies needed)

Either way, tests should run without manual `package.json` edits.

## 6. Consolidate the credentials files

There are both `.env` (SFTP credentials) and `.private` (API tokens as JSON) files. These serve the same purpose in different formats. Consolidating into a single `.env` file with `dotenv` would simplify the setup — one file to manage, one format to remember, one example file to document.

## 7. Add a deploy preview or CI step

Currently deployment is fully manual (`npm run deploy` does a full SFTP upload of dist/). Even a simple GitHub Action that runs `npm run build` on push would catch broken builds before you deploy. If you ever move hosting to something like Cloudflare Pages or Netlify, you'd also get deploy previews for free.
