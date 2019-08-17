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
    <div class="note-date">{{ noteDate }}</div>
    <div class="note-type" :class="`note-type--${type}`">
      <svg><use :href="`#svg-${type}`" /></svg>
    </div>
    <h2 class="note-title">{{ title }}</h2>
    <div v-if="rating" :class="`rating rating-${rating}`"></div>
    <div class="note-meta">{{ date }} | {{ creatorLabel }}</div>
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
    <div class="note-filters">
      <note-filter type="all" v-model="filter">All</note-filter>
      <note-filter type="movie" v-model="filter">Movies</note-filter>
      <note-filter type="book" v-model="filter">Books</note-filter>
      <note-filter type="music" v-model="filter">Music</note-filter>
      <!-- Sort by: Rating, date, etc -->
    </div>
    <note
      v-for="note in filteredNotes"
      :type="note.type"
      :title="note.title"
      :creator="note.creator"
      :date="note.date"
      :image="note.image"
      :rating="note.rating"
      :note-date="note.noteDate"
      :excerpt="note.excerpt"
      :contents="note.contents"
    >
      <!-- <span v-html="note.excerpt"></span> -->
      <!-- <span v-html="note.contents"></span> -->
    </note>    
  </div>
</div>

<style>
:root {
  --book-color: #F5914A;
  --movie-color: #3DAFD1;
  --music-color: #FB84E2;
}

/* FILTERS ------------------------------------- */

.note-filters {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color-light);
}

.note-filter {
  display: inline-block;
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
  display: inline-block;
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

.note-date {
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
      filter: 'all',
    };
  },
  mounted() {
    fetch('/data/notes.json')
      .then(res => res.json())
      .then(json => {
        this.notes = json.data
      })
      .catch((error) => {
        console.log(error);
      })
  },
  computed: {
    filteredNotes() {
      return (this.filter === 'all')
                ? this.notes
                : this.notes.filter(note => note.type === this.filter)
    },
  },
  // data() {
  //   return {
  //     videos: [],
  //     sortedBy: 'date',
  //   };
  // },

  // watch: {
  //   sortedBy(newVal) {
  //     if (newVal === 'date') {
  //       this.videos.sort((a, b) => {
  //         return (new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime() ? -1 : 1);
  //       })
  //     } else if (newVal === 'duration') {
  //       this.videos.sort((a, b) => {
  //         return (strToSeconds(b.duration) > strToSeconds(a.duration) ? -1 : 1);
  //       })
  //     }
  //   },
  // },

  // mounted() {
  //   fetch('/data/inspiration-videos.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.videos = data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // },

  // methods: {
  //   sortBy(field) {
  //     this.sortedBy = field;
  //   },
  // }
});
</script>
