---
title: "Places"
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Places</h1>

- Location dropdown:

```
USA (800)
  CA (320)
    San Francisco (240)
    Los Angeles (24)
    Mill Valley (8)
```

- Sort dropdown: most check-ins, most recent, least recent
- Geo search
- Favorites toggle
- Add custom notes? or should these happen in app
- Review categoies - merge Cafe and coffee shop?

Map
- Monospaced, with location in ascii rectangles on a map?

<!-- <section class="note-controls">
  <div class="note-filters">
    <note-filter type="all" v-model="filter">All</note-filter>
    <note-filter type="movie" v-model="filter">Movies</note-filter>
    <note-filter type="tv" v-model="filter">TV</note-filter>
    <note-filter type="book" v-model="filter">Books</note-filter>
    <note-filter type="music" v-model="filter">Music</note-filter>
    <note-filter type="game" v-model="filter">Games</note-filter>
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
</section> -->

<div id="venues" class="venues">

  <div>
    <span>Category:</span>
    <select class="select" v-model="categoryFilter">
      <option :value="CATEGORY_ANY">{{ CATEGORY_ANY }}</option>
      <option v-for="category in categories" :value="category[0]">{{ category[0] }} ({{ category[1] }})</option>
    </select>
  </div>

  <div>
    <span>Sort by:</span>
    <select class="select" v-model="categoryFilter">
      <option value="most-visits">Most visits</option>
      <option value="recent-visit">Recent visit</option>
      <option value="oldest-visit">Oldest visit</option>
    </select>
  </div>


  <div v-for="venue in displayVenues" class="item item--dense">
    <b>{{ venue.name }}</b>
    <div class="item-meta">
      <span class="item-category">{{ venue.category }}</span> • {{ venue.count }} visits • {{ getAddress(venue.address) }}
    </div>
  </div>
</div>

<link rel="stylesheet" href="/css/forms.css">

<script src="/js/vue.min.js"></script>

<script>
 
// ------
// CONFIG
// ------

const CATEGORY_ANY = 'Any';

// --------
// COMMENTS
// --------

var app = new Vue({
  el: '#venues',

  data() {
    return {
      CATEGORY_ANY,
      categories: [],
      venues: [],
      categoryFilter: CATEGORY_ANY,
      // comments: {
      //   2650727758:{
      //     type: 'race',
      //     text: 'Race • 2019 Bridge to Bridge 12k'
      //   },
      //   1774076006: {
      //     type: 'achievement',
      //     text: 'First mile under 5:30'
      //   },
      //   1584701112: {
      //     type: 'race',
      //     text: 'Race • 2018 Bay to Breakers',
      //   },
      //   1798971397:{
      //     type: 'race',
      //     text: 'Race • 2018 Bridge to Bridge 5k'
      //   },
      //   1173566338: {
      //     type: 'race',
      //     text: 'Race • 2017 JP Morgan Corporate Challenge 5k'
      //   },
      //   657497518: {
      //     type: 'achievement',
      //     text: 'First mile under 6 minutes'
      //   },
      //   1830959635: {
      //     type: 'injury',
      //     text: `I'm having some pain in my left ankle which,
      //      started the day after a hard effort up a steep hill. The ankle pain goes in and out,
      //     but has lingered for over a week now. I'm pausing my running for a couple of weeks to
      //     recover.`,
      //   },
      //   1830959635: {
      //     type: 'achievement',
      //     text: `10 miles at 7:15/mi pace`,
      //   },
      //   1735738378: {
      //     type: 'injury',
      //     text: `I attemped my first half-marathon, the SF Half. Unfortunately I had knee pain
      //     that started just a mile in. The likelihood of me finishing was slim, and injury high,
      //     so I cut my losses after finishing five miles.`
      //   },
      // }
    };
  },

  created() {
    fetch('/data/foursquare-venues.json')
      .then(res => res.json())
      .then(data => {
        // TODO: move to func
        this.venues = data.sort((a, b) => {
          return (a.count >= b.count) ? -1 : 1;
        })
        this.populateCategories();
        // this.categories = this.venues.
        // this.venues = data.sort((a, b) => {
        //   return (a.createdAt >= b.createdAt) ? -1 : 1;
        // })
      })
      .catch((error) => {
        console.log(error);
      })
  },

  computed: {
    /**
     * Sorted and filtered for display
     */
    displayVenues() {
      let venues = this.venues;
      if (this.categoryFilter !== CATEGORY_ANY) {
        venues = venues.filter(venue => {
          return venue.category === this.categoryFilter;
        })
      }
      
      return venues;
    },
  },

  methods: {
    getAddress(addr) {
      if (addr) {
        if (addr[2]) {
          console.log(addr[1]);
        }
        let addrInput = (addr[1]) ? addr[1] : addr[0];
        let addrArray = addrInput.split(' ');
        addrArray.pop();
          // console.log(formattedAddr);
        return addrArray.join(' ');
        // } else {
        //   return addr[0].split();
        // }
      } else {
        return '';
      }
    },
    
    /**
     * Loop through venues and lookup categories.
     */
    populateCategories() {
      let categories = {};
      this.venues.forEach((venue) => {
        let { category } = venue;
        if (categories.hasOwnProperty(category)) {
          categories[category] = categories[category] + 1;
        } else {
          categories[category] = 1;
        }
      })
      this.categories = Object.entries(categories).sort((a, b) => {
        return a[1] >= b[1] ? -1 : 1;
      });
    },

    sort() {

    },


    // getPaceColor(pace) {
    //   let paceColor;
    //   if (pace > 8) {
    //     paceColor = '#FCA469';
    //   } else if (pace > 7.27) {
    //     paceColor = '#F6DC58';
    //   } else {
    //     paceColor = '#58DF82';
    //   }
    //   return paceColor;
    // },
    // getTransition(index) {
    //   return (index < 40) ? `transition: all 0.5s ${(index + 5) * 0.05}s`: '';
    // },
    // hasComment(id) {
    //   return this.comments.hasOwnProperty(id);
    // }
  }
});
</script>

<style>
.item-category {
  color: var(--primary-color);
}
</style>
