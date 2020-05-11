---
title: "Sketches"
date: 2020-03-25
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Sketches</h1>

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
  margin-bottom: 6px;
  background-color: var(--recessed-bg-color);
  background-size: cover;
  /*background-position: center;*/
  border-radius: var(--radius);
}

.item-title {
  margin-bottom: 2px;
}

.item-meta {
  color: var(--muted-color);
}


@media (min-width: 800px) {
  .item-grid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
      <h3 class="item-title">
        <a href="${sketch.src}">
          ${sketch.title}
        </a>
      </h3>
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
