---
title: "Notes"
date: 2018-10-03
layout: page.njk
pageWidth: "full"
---

<!--
# Style guide
- Italicize names of books, movies, and other long form works.
-->

<h1 class="page-title">Notes</h1>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none">
  <symbol id="svg-star-half" viewBox="0 0 576 512"><path d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z"></path><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></symbol>
  <svg id="svg-star" viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
  <svg id="svg-star-outline" viewBox="0 0 576 512" ><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>
  <symbol id="svg-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></symbol>
  <symbol id="svg-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </symbol>
  <symbol id="svg-movie" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-film"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>
  </symbol>
  <symbol id="svg-music" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-music"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>
  </symbol>
  <symbol id="svg-tv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tv"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></symbol>
</svg>

<!-- NOTE TEMPLATE -->

<template id="tpl-note">
  <article class="item" :class="{'item--open': open}">
    <div class="item-image-column">
      <img :src="`/media/notes/${image}`" class="item-image" />
    </div>
    <div class="item-text-column">
      <h2 class="item-title">{{ title }}</h2>
      <div class="item-meta">
        <span>{{ type }}</span>
        ·
        <span class="item-review-date">{{ formattedReviewDate }}</span>
      </div>
      <note-rating v-if="rating" :stars="rating"></note-rating>
      <div class="item-credits">
        <span class="item-publish-date">{{ publishDate }}</span> | <span>{{ creatorLabel }}</span>
      </div>
      <div v-if="contents" class="item-body" @click="open = true">
        <div v-if="open" v-html="contents"></div>
        <div v-else v-html="excerpt" class="item-excerpt"></div>
      </div>
    </div>
  </article>
</template>

<template id="tpl-note-rating">
  <div class="item-rating">
    <svg v-for="n in fullStars"><use href="#svg-star"></use></svg>
    <svg v-if="halfStar"><use href="#svg-star-half"></svg>
    <svg v-for="n in emptyStars"><use href="#svg-star-outline"></svg>
  </div>
</template>

<template id="tpl-note-filter">
  <div :class="['note-filter', `type-${type}`, { 'note-filter--checked': type === value }]">
      <input type="radio" name="note-filter" class="note-filter-radio" :value="type" :id="`filter-${type}`" @change="onChange" />
      <label class="note-filter-label" :for="`filter-${type}`">
        <svg class="note-filter-label-icon"><use :href="`#svg-${type}`" /></svg>
        <div class="note-filter-label-text">
          <slot />
        </div>
      </label>
  </div>
</template>

<div id="app">
  <div>
    <section class="note-controls">
      <div class="note-filters">
        <note-filter type="all" v-model="filter">All</note-filter>
        <note-filter type="movie" v-model="filter">Movies</note-filter>
        <note-filter type="tv" v-model="filter">TV</note-filter>
        <note-filter type="book" v-model="filter">Books</note-filter>
        <note-filter type="music" v-model="filter">Music</note-filter>
      </div>
      <div class="note-sort">
        <span class="note-sort-label">Sort by:</span>
        <select class="select" v-model="sort">
          <option value="review-date-desc">Review date</option>
          <option value="rating-desc">Rating: High to low</option>
          <option value="rating-asc">Rating: Low to high</option>
          <option value="publish-date-desc">Publish date: New to old</option>
          <option value="publish-date-asc">Publish date: Old to new</option>
        </select>
      </div>
    </section>
    <section class="item-grid" :class="`notes-sort-${sort}`">
      <note
        v-for="note in displayNotes"
        v-bind="note"
      >
      </note>    
    </section>
  </div>
</div>

<link rel="stylesheet" href="/css/forms.css">

<style>
:root {
  --book-color: #F5914A;
  --movie-color: #3DAFD1;
  --music-color: #FB84E2;
  --tv-color: #C6B848;
}

/* COLOR CLASSES ------------------------------------- */

.type-all {
  --type-color: var(--color);
}

.type-book {
  --type-color: var(--book-color);
}

.type-movie {
  --type-color: var(--movie-color);
}

.type-music {
  --type-color: var(--music-color);
}

.type-tv {
  --type-color: var(--tv-color);
}

/* FILTERS ------------------------------------- */

.note-controls {
  font-family: var(--font-ui);
  padding-bottom: var(--block-bottom);
  margin-bottom: var(--block-bottom);
}

.note-filters {
  display: flex;
  overflow-x: auto;
  padding: 0 calc(var(--gutter));
  margin: 0 calc(var(--gutter) * -1);
}

.note-filter {
  margin: 0 4px var(--block-bottom) 0;
}

.note-filter-radio {
  display: none;
}

.note-filter-label {
  display: inline-flex;
  align-items: center;
  padding: 0 0.6em 0;
  height: var(--form-control-height-xs);
  line-height: 1;
  margin-right: 0.25em;
  font-size: 0.9375rem;
  font-weight: var(--weight-bold);
  border-radius: var(--radius);
  border: 2px solid var(--type-color);
  cursor: pointer;
  color: var(--type-color);
}

.note-filter-label-icon {
  position: relative;
  top: -1px;
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.note-filter:hover .note-filter-label,
.note-filter--checked .note-filter-label {
  color: white;
  background: var(--type-color);
}

@media (min-width: 800px) {
  .note-controls {
    display: flex;
    justify-content: space-between;
  }

  .note-filter {
    margin: 0 2px 6px 0;
  }

  .note-filter-label {
    font-size: 0.8125rem;
    height: var(--form-control-height);
  }
  
  .note-filter-label-icon {
    top: 0;
  }
}


/* SORT -----------------------------------------*/

.note-sort {
  font-weight: var(--weight-bold);
  color: var(--muted-color);
}

.note-sort-label {
  display: none;
  margin-right: 4px;
}

.notes-sort-publish-date-desc .item-publish-date,
.notes-sort-publish-date-asc .item-publish-date {
  color: var(--primary-color);
}

.notes-sort-rating-desc .item-rating svg,
.notes-sort-rating-asc .item-rating svg{
  fill: var(--primary-color);
}

.notes-sort-review-date-desc .item-review-date {
  color: var(--primary-color);
}

@media (min-width: 800px) {
  .note-sort-label {
    display: inline;
  }

  .note-sort-select {
    font-size: 0.8125rem;
    height: var(--form-control-height);
  }
}

/* ITEMS -----------------------------------------*/

@media (min-width: 800px) {
  .item-grid {
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    grid-column-gap: 32px;
  }
}

.item {
  position: relative;
  overflow: hidden;
}

.item-image-column {
  float: left;
  width: 6rem;
  margin: 0 1rem 0.5rem 0;
}

.item-image {
  width: 100%;
  background: var(--recessed-bg-color);
  border-radius: var(--radius);
}

.item::after {
  content: '';
  position: absolute;
  background: linear-gradient( rgba(255, 255, 255, 0), var(--bg-color) 80%, var(--bg-color));
  bottom: 0;
  width: 100%;
  height: 3rem;
  pointer-events: none;
}

.item--open {
  max-height: none;
}

.item--open::after {
  display: none;
}

.item-excerpt:hover {
  background-color: var(--hover-bg-color);
  border-radius: var(--radius);
}

.item-excerpt p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-body { 
  cursor: pointer;
}

.item--open .item-body {
  cursor: auto;
}

@media (min-width: 800px) {
  .item-grid {
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    grid-column-gap: 32px;
  }

  .item {
    display: flex;
  }

  .item-image-column {
    float: none;
    width: auto;
    flex: 0 0 8rem;  
  }

  .item-text-column {
    flex: 1 1 auto;
  }
}


/* STAR RATING -----------------------------------------*/

.item-rating {
  display: flex;
  margin-bottom: 6px;
}
.item-rating svg {
  width: 16px;
  height: 16px;
}

</style>

<script src="/js/vue.min.js"></script>
<script>
Vue.component('note-filter', {
  template: '#tpl-note-filter',
  
  model: {
    event: 'change'
  },

  props: {
    type: String,
    value: String,
  },

  methods: {
    onChange(event) {
      this.$emit('change', event.target.value);
    }
  },
});

Vue.component('note-rating', {
  template: '#tpl-note-rating',
  props: {
    stars: Number,
  },
  computed: {
    fullStars() {
      return Math.floor(this.stars);
    },
    halfStar() {
      return !Number.isInteger(this.stars);
    },
    emptyStars() {
      return Math.floor(5 - this.stars);
    }
  }
});

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const MS_IN_MONTH = MS_IN_DAY * 30;

Vue.component('note', {
  template: '#tpl-note',
  props: {
    type: String,
    title: String,
    creator: String,
    publishDate: String,
    image: String,
    rating: Number,
    reviewDate: String,
    excerpt: String,
    contents: String,
    revisit: [Boolean, String],
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    creatorLabel() {
      switch (this.type) {
        case 'book':
          return `Written by ${this.creator}`;
        break;
        case 'movie':
        case 'tv':
          return `Directed by ${this.creator}`;
        break;
        case 'music':
          return `by ${this.creator}`;
        break;
      }
    },
    formattedReviewDate() {
      const diff = new Date() - new Date(this.reviewDate);
      if (diff < MS_IN_DAY) {
        return 'Today';
      } else if (diff < MS_IN_DAY * 2) {
        return 'Yesterday';
      } else if (diff < MS_IN_DAY * 7) {
        return 'This week';
      } else if (diff < MS_IN_DAY * 14) {
        return 'Last week';
      } else if (diff < MS_IN_DAY * 30) { 
        return 'This month';
      } else if (diff < MS_IN_DAY * 60) { 
        return 'Last month';
      } else if (diff < MS_IN_DAY * 180) {
        return `${Math.floor(diff / MS_IN_MONTH)} months ago`;
      } else {
        return this.reviewDate;
      }
    }
  }
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
  mounted() {
    fetch('/data/notes.json')
      .then(res => res.json())
      .then(json => {
        this.notes = json.data
        this.filterAndSort();
      })
      .catch((error) => {
        console.log(error);
      })
  },
 
  watch: {
    filter: function(val) {
      this.filterAndSort();
    },
    sort: function(val) {
      this.filterAndSort();
    },
  },

  methods: {
    filterAndSort() {
      // Filter
      const filteredNotes = (this.filter === 'all')
        ? this.notes
        : this.notes.filter(note => note.type === this.filter)

      // and Sort
      switch (this.sort) {
        case 'rating-desc':
          this.displayNotes = filteredNotes.sort((a, b) => {
            return b.rating - a.rating;
          });
          break;
        case 'rating-asc':
          this.displayNotes = filteredNotes.sort((a, b) => {
            return a.rating - b.rating;
          });
          break;
        case 'publish-date-desc':
          this.displayNotes = filteredNotes.sort((a, b) => {
            return (new Date(a.publishDate) > new Date(b.publishDate)) ? -1 : 1;
          });
          break;
        case 'publish-date-asc':
          this.displayNotes = filteredNotes.sort((a, b) => {
            return (new Date(a.publishDate) > new Date(b.publishDate)) ? 1 : -1;
          });
          break;
        case 'review-date-desc':
        default:
          this.displayNotes = filteredNotes.sort((a, b) => {
            return (new Date(a.reviewDate) > new Date(b.reviewDate)) ? -1 : 1;
          });
      }
    },
  },
});
</script>
