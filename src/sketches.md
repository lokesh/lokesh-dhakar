---
title: "Sketches"
date: 2020-03-25
layout: page.njk
pageWidth: "full"
---

<!-- Once I get to 20 sketches, I'll implement sorting and filter -->

<h1 class="page-title">Sketches</h1>

<section style="display: none;" class="collection-controls">
  <div class="collection-filters">
    <note-filter data-type="all">All</note-filter>
    <note-filter data-type="movie">Movies</note-filter>
    <note-filter data-type="tv">TV</note-filter>
    <note-filter data-type="book">Books</note-filter>
    <note-filter data-type="music">Music</note-filter>
  </div>
  <div class="collection-sort">
    <span class="collection-sort-label">Sort by:</span>
    <select class="select" v-model="sort">
      <option value="review-date-desc">Review date</option>
      <option value="rating-desc">Rating: High to low</option>
      <option value="rating-asc">Rating: Low to high</option>
      <option value="publish-date-desc">Publish date: New to old</option>
      <option value="publish-date-asc">Publish date: Old to new</option>
    </select>
  </div>
</section>

<section class="item-grid"></section>

<style>

.item-grid {
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
}

.item-body {
  display: none;
}

.item-image {
  width: 100%;  
  padding-top: 75%;
  margin-bottom: 8px;
  background-color: var(--recessed-bg-color);
  background-size: cover;
  border-radius: var(--radius);
}

.item-meta {
  color: var(--muted-color);
}


@media (min-width: 800px) {
  .item-grid {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
    grid-column-gap: 32px;
  }
  
  /* 16:9 aspect ratio on desktop */
  .item-image {
    padding-top: 56.25%;
  }

  .item-body {
    display: block;
  }
}

@media (min-width: 1200px) {
  .item-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

figcaption {
  display: none;
}
</style>


<script>
// // Categories
// const CODE = [
//   P5,
//   PROCESSING,
// ];
// const DRAWING = [
//   PROCREATE,
// ];

const grid = document.getElementsByClassName('item-grid')[0];

function render(sketches) {
  let html = '';

  // Sort
  sketches = sketches.sort((a, b) => {
    return (new Date(a.date) > new Date(b.date)) ? -1 : 1;
  });

  // Format an render
  sketches.forEach(sketch => {
    // CODEPEN
    if (sketch.codepen) {
      if (!sketch.thumb) {
        sketch.thumb = `https://codepen.io/lokesh/pen/${sketch.codepen}/image/small.png`;  
      }
      sketch.src = `https://codepen.io/lokesh/pen/${sketch.codepen}`;
    };

    // NOT CODEPEN
    if (!sketch.codepen)  {
      let file = sketch.title.replace(/\s+/g, '-').toLowerCase();
      
      // Defaults to jpeg. No way to change at moment.
      if (!sketch.thumb) {
        sketch.thumb = `/media/sketches/${file}-thumb.jpg`;
      }

      if (!sketch.src) {
       sketch.src = `/media/sketches/${file}.jpg`; 
      }
    }

    html += `
    <article class="item">
      <a href="${sketch.src}">
        <img class="item-image" style="background-image: url(${sketch.thumb})" />
      </a>
      <div class="item-title">
        <a href="${sketch.src}">
          ${sketch.title}
        </a>
      </div>
      <div class="item-meta">${sketch.tags} · ${sketch.date}</div>
      <div class="item-body">${sketch.desc || ''}</div>
    </article>
    `
  })
  grid.innerHTML = html;
}

async function main() {
  const response = await fetch('/data/sketches.json');
  const json = await response.json();    
  const sketches = json.data;
  render(sketches);
}

main();
</script>
