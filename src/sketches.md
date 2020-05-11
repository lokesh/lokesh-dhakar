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
  padding-top: 56.25%;
  margin-bottom: 6px;
  background-color: var(--recessed-bg-color);
  background-size: cover;
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

  .item-body {
    display: block;
  }
}

figcaption {
  display: none;
}
</style>


<script>

// TYPE
const CODEPEN = 'codepen';

// Tags
const P5 = 'p5.js';
const JS = 'Javascript';
const PROCESSING = 'Processing';
const PROCREATE = 'Procreate';

// Categories
const CODE = [
  P5,
  PROCESSING,
];
const DRAWING = [
  PROCREATE,
];

 // String (image or link) OR Array (images)

// Load array of objects
const sketches = [
{
  title: 'Joy Division equalizer',
  date: 'Apr 4, 2020',
  tags: P5,
  desc: 'Spectrum analysis with <a href="https://p5js.org/reference/#/p5.FFT">p5.FFT</a>',
  codepen: 'WNvqpbj'
},
{
  title: 'Particle network',
  date: 'Apr 8, 2020',
  tags: P5,
  codepen: 'wvKwdOX',
},
{
  title: 'Gravitational attraction',
  date: 'Apr 12, 2020',
  tags: P5,
  desc: 'Vector math with support for forces.',
  codepen: 'RwWPjqg',
},
{
  title: 'Solitare win screen',
  date: 'Mar 28, 2020',
  tags: P5,
  codepen: 'OJyNzYZ',
},
{
  title: 'Narwhal and jellyfish',
  date: 'Apr 21, 2020',
  tags: PROCREATE,
  desc: 'Based of my nephew\'s drawing.'
},
{
  title: 'Circle bursts',
  date: 'Mar 29, 2020',
  tags: P5,
  codepen: 'BaoxEme',
},
{
  title: 'Quadtree',
  date: 'Apr 18, 2020',
  tags: P5,
  codepen: 'abvZgQG',
},
{
  title: 'Mondrian quadtree',
  date: 'Apr 19, 2020',
  tags: P5,
  codepen: 'rNOmrbB',
},
{
  title: 'Image to ANSI',
  date: 'May 4, 2020',
  tags: JS,
  codepen: 'vYNpmVW',
},
{
  title: 'Image to ASCII',
  date: 'May 7, 2020',
  tags: JS,
  codepen: 'zYvWNbZ',
},
{
  title: 'Dancing beads',
  date: 'Mar 27, 2020',
  tags: P5,
  codepen: 'ExVLJQv',
},
{
  title: 'Jumpman',
  date: 'Jun 16, 2018',
  tags: P5,
  desc: 'Beginnings of a platformer.',
  codepen: 'GRpdLXe',
},
{
  title: 'Lokesh Mama and fish',
  date: 'May 7, 2020',
  tags: PROCREATE,
  desc: 'Based of my niece\'s drawing.'
}
]

const grid = document.getElementsByClassName('item-grid')[0];

function render() {
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

render()

// Filter

// For each, html string w/template literal

// Append



</script>
