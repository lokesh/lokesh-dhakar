---
title: "Notes"
date: 2018-10-03
layout: page.njk
---

<!--
# Style guide
- Italicize names of books, movies, and other long form works.
-->

<h1 class="page-title">Notes</h1>

<svg style="display: none">
  <symbol id="svg-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></symbol>
  <symbol id="svg-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </symbol>
  <symbol id="svg-movie" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-film"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>
  </symbol>
  <symbol id="svg-music" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-music"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>
  </symbol>
</svg>


<!-- NOTE TEMPLATE -->

<template id="tpl-note">
  <article class="note" :class="{'note--open': open}" @click="open = true">
    <img :src="`/media/notes/${image}`" class="note-image" />
    <div class="noteDate">{{ noteDate }}</div>
    <div class="note-type" :class="`note-type--${type}`">
      <svg><use :href="`#svg-${type}`" /></svg>
    </div>
    <h2 class="note-title">{{ title }}</h2>
    <div v-if="rating" :class="`rating rating-${rating}`"></div>
    <div class="note-meta">
      <span class="note-date">{{ date }}</span> | <span class="note-creator">{{ creatorLabel }}</span>
    </div>
    <div class="note-body">
       <div v-if="!open">
        <span v-html="excerpt" class="note-excerpt"></span>
        <span class="note-read-more">Read more…</span>
      </div>
      <div v-if="open" v-html="contents"></div>
    </div>
  </article>
</template>

<template id="tpl-note-filter">
  <div :class="['note-filter', `note-filter--${type}`, { 'note-filter--checked': type === value }]">
      <input type="radio" name="note-filter" class="note-filter-radio" :value="type" :id="`filter-${type}`" @change="onChange" />
      <label class="note-filter-label" :for="`filter-${type}`">
        <svg class="note-filter-label-icon"><use :href="`#svg-${type}`" /></svg>
        <slot />
      </label>
  </div>
</template>

<div id="app">
  <div>
    <section class="note-controls">
      <div class="note-filters">
        <note-filter type="all" v-model="filter">All</note-filter>
        <note-filter type="movie" v-model="filter">Movies</note-filter>
        <note-filter type="book" v-model="filter">Books</note-filter>
        <note-filter type="music" v-model="filter">Music</note-filter>
      </div>
      <div class="note-sort">
        <span class="note-sort-label">Sort by:</span>
        <select class="note-sort-select" v-model="sort">
          <option value="noteDate-desc">Review date</option>
          <option value="rating-desc">Rating: High to low</option>
          <option value="rating-asc">Rating: Low to high</option>
          <option value="date-desc">Publish date: New to old</option>
          <option value="date-asc">Publish date: Old to new</option>
        </select>
      </div>
    </section>
    <section :class="`notes-sort-${sort}`">
      <note
        v-for="note in displayNotes"
        :type="note.type"
        :title="note.title"
        :creator="note.creator"
        :date="note.date"
        :image="note.image"
        :rating="note.rating"
        :noteDate="note.noteDate"
        :excerpt="note.excerpt"
        :contents="note.contents"
      >
      </note>    
    </section>
  </div>
</div>

<style>
:root {
  --book-color: #F5914A;
  --movie-color: #3DAFD1;
  --music-color: #FB84E2;
}

/* FILTERS ------------------------------------- */

.note-controls {
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color-light);
}

.note-filter {
  display: inline-block;
  margin-bottom: 8px;
}

.note-filter-radio {
  display: none;
}

.note-filter-label {
  display: inline-flex;
  align-items: center;
  padding: 0.2em 0.6em 0.3em;
  margin-right: 0.25em;
  font-size: 0.8125rem;
  font-weight: var(--bold);
  border-radius: var(--border-radius);
  border: 2px solid var(--color);
  cursor: pointer;
}

.note-filter-label-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.note-filter--checked .note-filter-label {
  color: white;
  background: var(--color);
}

.note-filter--movie .note-filter-label {
  color: var(--movie-color);
  border-color: var(--movie-color);
}

.note-filter--movie.note-filter--checked .note-filter-label {
  color: white;
  background: var(--movie-color);
}

.note-filter--book .note-filter-label {
  color: var(--book-color);
  border-color: var(--book-color);
}

.note-filter--book.note-filter--checked .note-filter-label {
  color: white;
  background: var(--book-color);
}

.note-filter--music .note-filter-label {
  color: var(--music-color);
  border-color: var(--music-color);
}

.note-filter--music.note-filter--checked .note-filter-label {
  color: white;
  background: var(--music-color);
}

@media (min-width: 800px) {
  .note-controls {
    display: flex;
    justify-content: space-between;
  }
}


/* SORT -----------------------------------------*/

.note-sort {
  font-size: 0.8125rem;
  font-weight: var(--bold);
  color: var(--muted-color);
}

.note-sort-label {
  display: none;
  margin-right: 4px;
}

.note-sort-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0.25em 1.6em 0.25em 0.6em;
  font-size: 0.8125rem;
  font-weight: var(--bold);  
  border-radius: var(--border-radius);
  border: 2px solid var(--color);
  cursor: pointer;  
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right .7em top 50%;
  background-size: .65em auto;
  outline: none;
}

.notes-sort-date-desc .note-date,
.notes-sort-date-asc .note-date {
  color: var(--secondary-color);
}

.notes-sort-rating-desc .rating,
.notes-sort-rating-asc .rating {
  color: var(--secondary-color);
}

@media (min-width: 800px) {
  .note-sort-label {
    display: inline;
  }
}

/* NOTE -----------------------------------------*/

.note {
  position: relative;
  overflow: hidden;
  max-height: 14rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color-light);
  font-size: 0.875rem;
  cursor: pointer;
}

.note::after {
  content: '';
  position: absolute;
  background: linear-gradient( rgba(255, 255, 255, 0), var(--bg-color) 80%, var(--bg-color));
  bottom: 0;
  width: 100%;
  height: 4rem;
}

.note--open {
  max-height: none;
  cursor: auto;
}

.note--open::after {
  display: none;
}

.note-excerpt p {
  display: inline;
}

.note-read-more {
  font-weight: var(--bold);
 /*color: var(--secondary-color);*/
}

.note a {
  text-decoration: underline;
  color: var(--color);
}

.note p:last-of-type{
  margin-bottom: 8px;
}

.note-image {
  float: left;
  width: 6rem;
  margin: 0 1rem 0.25rem 0;
  border-radius: var(--border-radius);
}

@media (min-width: 800px) {
  .note-image {
    width: 8rem;
  }
}

.noteDate {
  display: none;
  float: right;
  text-align: right;
  font-weight: var(--bold);
  margin-bottom: 4px;
  font-size: 0.6875rem;
  font-weight: var(--x-bold);
  text-transform: uppercase;
}

.note-type {
  display: flex;
  float: right;
  margin-left: 8px;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  line-height: 24px;
  color: #fff;
  background-color: #7c72f5;
}

@media (min-width: 800px) {
  .note-type {
    float: none;
    margin-left: 0;
  }
}

.note-type svg {
  width: 16px;
  height: 16px;
}

.note-type.note-type--book {
  background-color: var(--book-color);
}

.note-type.note-type--movie {
  background-color: var(--movie-color);  
}

.note-type.note-type--music {
  background-color: var(--music-color);
}

.note-title {
  margin: 0;
}

.note-title a {
  text-decoration: none;
}

.note-title a:hover {
  text-decoration: underline;
}

.note-meta {
  font-weight: var(--bold);
  color: var(--muted-color);
  margin-bottom: 2px;
}

.note-body {}


/* STAR RATING -----------------------------------------*/

.rating {
  font-size: 1.125rem;
  margin-bottom: 2px;
}

.rating-1::before {
  content: '★☆☆☆☆';
}
.rating-2::before {
  content: '★★☆☆☆';
}
.rating-3::before {
  content: '★★★☆☆';
}

.rating-4::before {
  content: '★★★★☆';
}

.rating-5::before {
  content: '★★★★★';
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

Vue.component('filters', {
  template: '#tpl-filters',
})

Vue.component('note', {
  template: '#tpl-note',
  props: {
    type: String,
    title: String,
    creator: String,
    date: String,
    image: String,
    rating: Number,
    noteDate: String,
    excerpt: String,
    contents: String,
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
        case 'tv show':
          return `Directed by ${this.creator}`;
        break;
        case 'music':
          return `by ${this.creator}`;
        break;
      }
    },
  }
})


new Vue({
  el: '#app',
  data() {
    return { 
      notes: [],
      displayNotes: [],
      filter: 'all',
      sort: 'noteDate-desc',
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
      console.log('filter');
      this.filterAndSort();
    },
    sort: function(val) {
      console.log('sort');
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
      console.log(this.sort);
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
        case 'date-desc':
          this.displayNotes = filteredNotes.sort((a, b) => {
            return (new Date(a.date) > new Date(b.date)) ? -1 : 1;
          });
          break;
        case 'date-asc':
          this.displayNotes = filteredNotes.sort((a, b) => {
            return (new Date(a.date) > new Date(b.date)) ? 1 : -1;
          });
          break;
        case 'noteDate-desc':
        default:
          this.displayNotes = filteredNotes.sort((a, b) => {
            return (new Date(a.noteDate) > new Date(b.noteDate)) ? -1 : 1;
          });
      }
    },
  },
});
</script>
