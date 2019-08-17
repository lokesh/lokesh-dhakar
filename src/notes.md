---
title: "Notes"
date: 2018-10-03
layout: page.njk
---

<!--
# Style guide
- Italicize names of books, movies, and other long form works.
-->

<template id="tpl-note">
  <article class="note" :class="{'note--open': open}" @click="open = true">
    <img :src="`/media/notes/${image}`" class="note-image" />
    <div class="note-date">{{ noteDate }}</div>
    <div class="note-type" :class="`note-type--${type}`">
      <img :src="`/media/icons/${type}.svg`" />
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

<template id="tpl-filters">
  <div class="note-filters">
    <filter-button>All</filter-button>
    <filter-button type="movie">Movies</filter-button>
    <filter-button type="book">Books</filter-button>
    <filter-button type="music">Music</filter-button>

    <!-- Sort by: Rating, date, etc -->
  </div>
</template>

<template id="tpl-filter-button">
  <button class="filter-button" :class="`filter-button--${type}`">
    <slot />
  </button>
</template>

<div id="app">
  <div>
    <!-- <filters></filters> -->
    <note
      v-for="note in notes"
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

.note-filters {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color-light);
}

.filter-button {
  
  font-weight: var(--bold);
  border-radius: var(--border-radius);
  border: none;
}

.filter-button--book {
  color: white;
  background: var(--book-color);

}

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
  background: linear-gradient(transparent, var(--bg-color) 80%, var(--bg-color));
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
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  line-height: 24px;
  color: #fff;
  background-color: #7c72f5;
}

.note-type img {
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

.revisit {
  /*display: none;*/
}

.revisit::before {
  display: inline-block;
  padding: 1px 4px 2px;
  margin-bottom: 4px;
  color: #fff;
  background-color: #000;
  border-radius: var(--border-radius);
  font-weight: var(--x-bold);
  font-size: 0.6875rem;
  text-transform: uppercase;
}


.movie .revisit::before {
  content: 'Worth rewatching';
}

/*.date {
  margin-top: 4px;
  font-size: 0.75rem;
  font-weight: var(--bold);
  color: var(--muted-color);
}
*/
</style>


<script src="/js/vue.min.js"></script>
<script>


Vue.component('filter-button', {
  template: '#tpl-filter-button',
  props: {
    type: String,
  },
})

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
    }
  }
})


new Vue({
  el: '#app',
  data() {
    return { 
      notes: []
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
