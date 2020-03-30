---
title: "Sketches"
date: 2020-03-25
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Sketches</h1>

<p>This page is a work-in-progress. After I add a few more examples I'll update and link out to full-size images and interactive demos for all the code sketches.</p>

<section class="gallery">

<figure>
  <figcaption>Mar 28, 2020 · P5.js</figcaption>
  <img src="/media/sketches/2020-03-28.png" class="width-1280">
</figure>

<figure>
  <figcaption>Mar 27, 2020 · P5.js</figcaption>
  <img src="/media/sketches/2020-03-27.png" class="width-1280">
</figure>

<figure>
  <figcaption>Mar 26, 2020 · P5.js - <a href="https://github.com/lokesh/processing/blob/master/p5/2020-03-26.html">Source</a></figcaption>
  <img src="/media/sketches/2020-03-26.png" class="width-1280">
</figure>

<figure>
    <figcaption>
    Mar 25, 2020 · P5.js - <a href="https://github.com/lokesh/processing/blob/master/p5/2020-03-25-circles.html">Source</a>
  </figcaption>
  <img src="/media/sketches/2020-03-25.png" class="width-1280">
</figure>

<figure>
    <figcaption>
    Mar 25, 2020 · P5.js - <a href="https://github.com/lokesh/processing/blob/master/p5/2020-03-25-circles.html">Source</a>
  </figcaption>
  <img src="/media/sketches/2020-03-25-b.png" class="width-1280">
</figure>

<figure>
    <figcaption>
    Mar 25, 2020 · P5.js - <a href="https://github.com/lokesh/processing/blob/master/p5/2020-03-25-circles.html">Source</a>
  </figcaption>
  <img src="/media/sketches/2020-03-25-c.png" class="width-1280">
</figure>

</section>

<style>

.gallery {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--gutter);
  grid-row-gap: var(--gutter);
}

figure img {
  width: 100%;
}

@media (min-width: 600px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, 240px)
  }
}

figcaption {
  display: none;
}
</style>

<script src="/js/vue.min.js"></script>
<script>

Vue.component('sketch', {
  template: '#tpl-note',
  props: {
    type: String, // medium? p5, processing, generative, paint, sketch, procreate
    date: String,
    images: [String, Array], //
    contents: String,
  },
})


new Vue({
  el: '#app',
  data() {
    return { 
      notes: [],
      displayNotes: [],
      filter: 'all',
      sort: 'review-date-desc',
    };
  },
  methods: {
    filterAndSort() {
    },
  },
});
</script>
