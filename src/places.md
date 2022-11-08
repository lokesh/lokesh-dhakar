---
title: "Places"
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Places</h1>

<!--

## To-do

- [ ] Add loading indicator
- [ ] Mobile dropdown for location too long

---

- [ ] Move checkinsToVenues func to separate util for node build/foursquare.js from utils/foursquare.js
- [ ] Clean up foursquare.js. Lots of funcs scatted at top


- [ ] New color scheme for categories

https://lokeshdhakar.com/projects/color-stacks/?graySteps=5&grayCast=0&grayLumaStart=98&grayLumaEnd=5&grayLumaCurve=linear&colorSteps=7&colorLumaStart=110&colorLumaEnd=10&colorLumaCurve=linear&colorChromaStart=42&colorChromaEnd=12&colorChromaCurve=linear&showLabel=true&showHex=true&showContrastRatio=false&colorHues=0%2C30%2C55%2C78%2C118%2C157%2C182%2C230%2C274%2C309%2C348




# How the filtering works - outdated

1. We filter the checkins which gives us the following computed props:
- Checkins filtered by location
- Checkins filtered by category
- Checkins filtered by both

2. We roll-up the checkin computed props into venues:
- Venues filtered by location - Used to populate category dropdown.
- Venues filtered by category - Used to populate location dropdown.
- Venues filtered by both - Displayed in list.

----

# Brainstorming

- Highlight trips automatically
- Monospaced, with location in ascii rectangles on a map?

-->

<template id="tpl-venue">
  <div>
    <div
      class="item item--dense"
      :class="[
        `venue-${id}`,
        `cat-${category}`,
        { notFirstVisit: !firstVisit },
      ]"
    >
      <div
        class="visits-bar"
      >
        {{ generateVisitsBarFromCount(count) }}
      </div>
      <div class="venue-title-row">
        <div class="item-title venue-title">{{ venue }}</div>
        <div
          v-if="firstVisit"
          class="venue-new-label"
        >
          NEW
        </div>
      </div>
      <div class="item-meta venue-meta">
        <template v-if="category && showCategory">
          <span class="item-category">
            <a @click="$emit('set-category', category)">
              {{ category }}
            </a>
          </span>
        </template>
        <template v-if="category && showCategory && subCategory && showSubCategory">
          •
        </template>
        <template v-if="subCategory && showSubCategory">
          <span class="item-category">
            <a @click="$emit('set-sub-category', subCategory)">
              {{ subCategory }}
            </a>
          </span>
        </template>
        <template v-if="category && count > 1">
          •
        </template>
        <template v-if="count > 1">
          <span>
            {{ count }} visits
          </span>
        </template>
        <template v-if="(city || count > 1) && city">
          •
        </template>
        <span v-if="city">
          <a @click="$emit('set-location', { country, state, city })">
            {{ city }}</a>,
          <a @click="$emit('set-location', { country, state })">
            {{ state }}
          </a>
        </span>
      </div>
      <div class="venue-comment">
        {{ comments }}
      </div>
    </div>
  </div>
</template>


<div id="venues" class="venues">
<!-- 
    DEBUGGING: <br />
    location: {{locationFilter }}<br />
    cat: {{ categoryFilter }}<br />
    subcat: {{ subCategoryFilter }} 
 -->

  <div v-if="isFetching">
    Loading
    <div class="loader-bar"></div>
    <!-- <div class="loader-arrow"></div> -->
  </div>
  <div
    v-else
    class="filters"
  >
    <div>
      <select class="select" v-model="locationFilter">
        <option v-for="(location, i) in locationOptions" :value="location.path" :key="i">
          <template v-if="location.path.state">&nbsp;</template>
          <template v-if="location.path.city">&nbsp;</template>
          {{ location.name }} ({{ location.count }})
        </option>
      </select>
    </div>
    <div class="category-filters">
      <select class="select" v-model="categoryFilter">
        <option v-for="category in categoryOptions" :value="category[0]">{{ category[0] }} ({{ category[1] }})</option>
      </select>
      <select
        v-if="categoryFilter !== CATEGORY_ANY"
        class="select"
        v-model="subCategoryFilter"
      >
        <option v-for="subCategory in subCategoryOptions" :value="subCategory[0]">{{ subCategory[0] }} ({{ subCategory[1] }})</option>
      </select>
    </div>
    <div>
      <select class="select" v-model="groupFilter">
        <option v-for="group in groupOptions" :value="group">{{ group }}</option>
      </select>
    </div>
    <div class="toggle-filters">
      <!-- <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" v-model="showNewFilter" checked>
        <span>Only new spots</span>
      </label> -->
      <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" v-model="faveFilter" checked>
        <span>Fave</span>
      </label>
      <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" v-model="goToSpotFilter" checked>
        <span>Go to spot</span>
      </label>
      <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" v-model="outdoorSeatingFilter" checked>
        <span>Outdoor seating</span>
      </label>
      <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" v-model="dateSpotFilter" checked>
        <span>Date spot</span>
      </label>
      <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" v-model="wouldTakeVisitorsFilter" checked>
        <span>Would take visitors</span>
      </label>
    </div>
    <button ref="resetBtn" @click="resetFilters">Reset</button>
  </div>
  <div
    v-if="groupFilter === GROUP_ALL"
    v-for="venue in displayList"
  >
    <venue
      v-bind="venue"
      @set-category="setCategoryFilter"
      @set-sub-category="setSubCategoryFilter"
      @set-location="setLocationFilter"
    />
  </div>
  <div
    class="display-lists"
    :class="{ hideOld: showNewFilter }"
    ref="lists"
  >
    <div
      v-if="groupFilter === GROUP_BY_YEAR"
      v-for="list in displayList"
      class="display-list"
      :class="{
          'no-checkins': !list.venues.length
        }"
    >
      <h1 class="year-title">{{ list.year }}</h1>
      <div
        v-if="list.venues.length"
        class="year-numbers"
      >
        {{ list.venues.length }} place<span v-if="list.venues.length > 1">s</span><br />
        {{ countNewVenues(list.venues) }} new ({{ Math.round(countNewVenues(list.venues) / list.venues.length * 100) }} %)
      </div>
      <div
        v-for="venue in list.venues"
      >
        <venue
          v-bind="venue"
          :show-category="categoryFilter === CATEGORY_ANY"
          :show-sub-category="categoryFilter !== CATEGORY_ANY"
          @set-category="setCategoryFilter"
          @set-sub-category="setSubCategoryFilter"
          @set-location="setLocationFilter"
        />
      </div>
    </div>
  </div>
</div>

<link rel="stylesheet" href="/css/forms.css">

<script src="/js/vue.min.js"></script>

<script type="module">
import { stateAbbreviationToName } from '/js/utils/location.js';
import {
  CATEGORY_ANY,
  LOCATION_ANY,
  SUBCATEGORY_ANY,
  filterByCategory,
  filterByLocation,
  filterByMetadata,
} from '/js/utils/foursquare.js';


// ------
// CONFIG
// ------

// If options don't meet min count, they will not be added to filter controls
const DESKTOP_MINS = {
  location: 1,
  category: 1,
  subCategory: 1,
}
const MOBILE_MINS = {
  location: 10,
  category: 2,
  subCategory: 2,
}

let filterMins = {};

const GROUP_ALL = 'All-time';
const GROUP_BY_YEAR = 'Group by year'

window.addEventListener('resize', () => {
  updateFilterMinimums();
})

function updateFilterMinimums() {
  filterMins = (window.innerWidth < 800) ? MOBILE_MINS : DESKTOP_MINS;;
}

updateFilterMinimums();

// ----------
// COMPONENTS
// ----------

Vue.component('venue', {
  template: '#tpl-venue',
  
  props: {
    id: String,
    venue: String,
    category: String,
    subCategory: String,
    country: String,
    city: String,
    state: String,
    count: Number,
    firstVisit: Boolean,
    comments: String,
    goToSpot: Boolean,
    outdoorSeating: Boolean,
    dateSpot: Boolean,
    wouldTakeVisitors: Boolean,
    showCategory: {
      type: Boolean,
      default: true,
    },
    showSubCategory: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    generateVisitsBarFromCount(count) {
      let bar = '';
      if (count > 1) {
        bar += '▓'.repeat(Math.floor((count - 1) / 2));
        bar += ((count - 1) % 2) ? '░' : '';
      }

      return bar;
    },
  },
});


// ---
// APP
// ---

const app = new Vue({
  el: '#venues',

  data() {
    return {
      isFetching: true,
      CATEGORY_ANY,
      SUBCATEGORY_ANY,
      LOCATION_ANY,
      venues: [],
      venuesGroupedByYear: [],
      categories: [],
      categoryFilter: CATEGORY_ANY,
      subCategoryFilter: SUBCATEGORY_ANY,
      locationFilter: {},
      groupFilter: GROUP_BY_YEAR,
      showNewFilter: false,
      commentsFilter: false,
      faveFilter: false,
      goToSpotFilter: false,
      outdoorSeatingFilter: false,
      dateSpotFilter: false,
      wouldTakeVisitorsFilter: false,
      GROUP_ALL,
      GROUP_BY_YEAR,
    };
  },

  async created() {
    let resp = await fetch('/data/venues.json');
    this.venues = await resp.json();

    let resp2 = await fetch('/data/venues-grouped-by-year.json');
    this.venuesGroupedByYear = await resp2.json();

    this.isFetching = false;
  },

  watch: {
    categoryFilter() {
      this.resetSubCategoryFilter();
    },
  },

  computed: {

    /*
    [ 1 ]
    Any Category (2323)
    Food (232)
    Coffee (150)

    [ 2 ]
    All [Food]
    Veg (100)
    Indian (23)
    Korean (6)
     */

    /**
    * Category filter dropdown options.
    * @return {[[Array]]} e.g. [['coffee shop', 23], ['gym', 5]]
    */
    categoryOptions() {
      let categories = {
        [CATEGORY_ANY]: this.filteredByLocation.length 
      };

      this.filteredByLocation.forEach((venue) => {
        let { category, subCategory } = venue;

        // If category has not been bucketed by me, skip
        if (!subCategory) return;

        if (categories.hasOwnProperty(category)) {
          categories[category] = categories[category] + 1;
        } else {
          categories[category] = 1;
        }
      })

      // Convert
      categories = Object.entries(categories);

      // Filter low count
      categories = categories.filter(cat => {
        return (cat[1] >= filterMins.category);
      });

      // Sort
      categories = categories.sort((a, b) => {
        return a[1] >= b[1] ? -1 : 1;
      });

      return categories;
    },

    metaDataFilters() {
      return {
        comments: this.commentsFilter,
        fave: this.faveFilter,
        goToSpot: this.goToSpotFilter,
        outdoorSeating: this.outdoorSeatingFilter,
        dateSpot: this.dateSpotFilter,
        wouldTakeVisitors: this.wouldTakeVisitorsFilter,
      }
    },

    subCategoryOptions() {
      if (!this.categoryFilter) return [];
      
      let subCategories = {
        [SUBCATEGORY_ANY]: this.filteredByPrimaryCategoryAndLocation.length
      };

      this.filteredByPrimaryCategoryAndLocation.forEach(venue => {
          let { subCategory } = venue;

        // If category has not been bucketed by my, skip
        if (!subCategory) return;

        if (subCategories.hasOwnProperty(subCategory)) {
          subCategories[subCategory] = subCategories[subCategory] + 1;
        } else {
          subCategories[subCategory] = 1;
        }
      })

      // Convert
      subCategories = Object.entries(subCategories);

      // Filter low count
      subCategories = subCategories.filter(cat => {
        return (cat[1] >= filterMins.subCategory);
      });

      // Sort
      subCategories = subCategories.sort((a, b) => {
        return a[1] >= b[1] ? -1 : 1;
      });

      return subCategories;
    },

    /**
     * Apply category filters to checkins
     * @return {[Object]} checkins
     */
    filteredByCategory() {
      return filterByCategory(this.venues, this.categoryFilter, this.subCategoryFilter);
    },

    /**
     * Apply location filters to checkins
     * @return {[Object]} checkins
     */
    filteredByLocation() {
      return filterByLocation(this.venues, this.locationFilter);
    },

    /**
     * Apply primary category and location filters to checkins, but not subcategory
     * @return {[Object]} checkins
     */
    filteredByPrimaryCategoryAndLocation() {
      let checkins = filterByCategory(this.venues, this.categoryFilter);
      return filterByLocation(checkins, this.locationFilter);
    },

    /**
     * Apply category and location filters to checkins
     * @return {[Object]} checkins
     */
    filteredByCategoryAndLocation() {
      let checkins = filterByCategory(this.venues, this.categoryFilter, this.subCategoryFilter);
      return filterByLocation(checkins, this.locationFilter);
    },

    displayList() {
      if (this.groupFilter === GROUP_BY_YEAR) {
        return this.venuesGroupedByYear.map(yearObj => {
          const { year, venues } = yearObj;

          return {
            year,
            venues: venues ? this.applyAllFilters(venues) : [],
          }
        });
      } 

      return this.applyAllFilters(this.venues);
    },

    locationOptions() {
      let tree = {};

      /*
      Construct tree
      ---
      [
        USA: {
          count: 100,
          children: [
            'CA': {
              count: 50,
              children: [
                'San Francisco': {
                  count: 20,
                }
              ]
            }
          ]
        }
      ]
       */
      
      let countedVenues = {};
      this.filteredByCategory.forEach(checkin => {
        let { country, state, city, id } = checkin;
        if (!country || !state || !city) return;

        if (country === 'United States') {
          state = stateAbbreviationToName(state);
        }

        // Count venues only once, though there could be multiple checkins
        if (countedVenues[id]) {
          return;
        } else {
          countedVenues[id] = true;
        }
        
        if (tree[country]) {
          tree[country].count++;
        } else {
          tree[country] = {
            count: 1,
            children: {},
          };
        }

        if (tree[country].children[state]) {
            tree[country].children[state].count++;
        } else {
          tree[country].children[state] = {
            count: 1,
            children: {},
          };
        }          

        if (tree[country].children[state].children[city]) {
            tree[country].children[state].children[city].count++;
        } else {
          tree[country].children[state].children[city] = {
            count: 1,
          };
        }          
      })

      let options = [];

      options.push({
        name: LOCATION_ANY,
        count: this.filteredByCategory.length,
        path: {},
      });

      const countryCounts = [];
      for (let [country, countryObj] of Object.entries(tree)) {       
        countryCounts.push([country, countryObj.count]);
      };

      const countryCountsSorted = countryCounts.sort((a, b) => {
        if (a[1] > b[1]) {
          return -1;
        } else if (a[1] < b[1]) {
          return 1
        }
        return 0
      });

      countryCountsSorted.forEach(countryArr => {
        let country = countryArr[0];
        let countryObj = tree[country];
        
        if (countryObj.count < filterMins.location) {
          return;
        }

        options.push({
          name: country,
          count: countryObj.count,
          path: {
            country,
          }
        })

        // Sort states
        let stateCounts = [];
        for (let [state, stateObj] of Object.entries(countryObj.children)) {       
          stateCounts.push([state, stateObj.count]);
        };

        let stateCountsSorted = stateCounts.sort((a, b) => {
          if (a[1] > b[1]) {
            return -1;
          } else if (a[1] < b[1]) {
            return 1
          }
          return 0
        });

        stateCountsSorted.forEach(stateArr => {
          let state = stateArr[0];
          let stateObj = tree[country].children[state];

          if (stateObj.count < filterMins.location) {
            return;
          }

          options.push({
            name: state,
            count: stateObj.count,
            path: {
              country,
              state,
            }
          })

          // Sort cities
          let cityCounts = [];
          for (let [city, cityObj] of Object.entries(stateObj.children)) {       
            cityCounts.push([city, cityObj.count]);
          };

          let cityCountsSorted = cityCounts.sort((a, b) => {
            if (a[1] > b[1]) {
              return -1;
            } else if (a[1] < b[1]) {
              return 1
            }
            return 0
          });

          let cityCounter = 0;
          cityCountsSorted.forEach(cityArr => {
            let city = cityArr[0];
            let cityObj = tree[country].children[state].children[city];
            
            if (cityObj.count < filterMins.location) {
              return;
            }

            options.push({
              name: city,
              count: cityObj.count,
              path: {
                country,
                state,
                city,
              }
            });

            cityCounter++;
          });
        });
      })

      return options;      
    },

    groupOptions() {
      return [
        GROUP_ALL,
        GROUP_BY_YEAR,
      ];
    },
  },

  methods: {
    countNewVenues(venues) {
      return venues.filter(v => v.firstVisit).length
    },

    applyAllFilters(items) {
      let filteredItems = filterByCategory(items, this.categoryFilter, this.subCategoryFilter);
      filteredItems = filterByLocation(filteredItems, this.locationFilter);
      filteredItems = filterByMetadata(filteredItems, this.metaDataFilters)
      return filteredItems;
    },

    /**
     * @param  {[Object]} checkins
     * @param  {String} categoryFilter e.g. 'Airport'
     * @return {[Object]} filtered checkins
     */
    filterCheckinsByPrimaryCategory(checkins, categoryFilter) {
      if (categoryFilter === CATEGORY_ANY) {
        return checkins;
      }

      return checkins.filter(checkin => {
        return checkin.category === categoryFilter;
      })
    },

    setCategoryFilter(cat) {
      this.categoryFilter = cat;
      this.resetSubCategoryFilter();
    },

    setSubCategoryFilter(subCat) {
      this.subCategoryFilter = subCat;
    },

    setLocationFilter(loc) {
      if (loc.state) {
        loc.state = stateAbbreviationToName(loc.state);
      }
      this.locationFilter = loc;
      // ...
    },

    resetCategoryFilter() {
      this.categoryFilter = CATEGORY_ANY;
    },

    resetSubCategoryFilter() {
      this.subCategoryFilter = SUBCATEGORY_ANY;
    },
    
    resetLocationFilter() {
      this.locationFilter = {};
    },

    resetToggleFilters() {
      this.faveFilter = false;
      this.goToSpotFilter = false;
      this.outdoorSeatingFilter = false;
      this.dateSpotFilter = false;
      this.wouldTakeVisitorsFilter = false;
    },

    resetFilters() {
      this.resetCategoryFilter();
      this.resetSubCategoryFilter();
      this.resetLocationFilter();
      this.resetToggleFilters();
    },

    sortVenuesByCount(venues) {
      return venues.sort((a, b) => {
        return (a.count >= b.count) ? -1 : 1;
      })
    },
  }
});
</script>

<style>

:root {
  --col-width: 320px;

  --cat-arts: #eb0054;
  --cat-coffee: #d90;
  --cat-dessert: #f39;
  --cat-food: #07e;
  --cat-nightlife: #40c;
  --cat-outdoors: #090;
  --cat-shop: #000;
  
  --cat-travel: var(--color);
  --cat-locale: var(--color);
  --cat-residence: var(--color);
  --cat-work: var(--color);
}

.template {
  display: none;
}

/* LOADER ------------------------------ */

.loader-bar {
  display: inline-block;
}

.loader-bar::after {
  display: inline-block;
  animation: bar steps(1, end) 4s infinite;
  content: '';
}

@keyframes bar {
  0%  { content: '[#·········]'; }
  10%  { content: '[##········]'; }
  20%  { content: '[####······]'; }
  30%  { content: '[#####·····]'; }
  40%  { content: '[######····]'; }
  50%  { content: '[######····]'; }
  60%  { content: '[#######···]'; }
  70%  { content: '[########··]'; }
  80%  { content: '[#########·]'; }
  90% { content: '[##########]'; }
  100% { content: '[##########]'; }
}


.loader-arrow {
  font-size: 2rem;
}

.loader-arrow::after {
  display: inline-block;
  animation: arrow steps(1, end) 1s infinite;
  content: '';
}

@keyframes arrow {
  0%   { content: '↑'; }
  12%  { content: '↗'; }
  25%  { content: '→'; }
  37%  { content: '↘'; }
  50%  { content: '↓'; }
  62%  { content: '↙'; }
  75%  { content: '←'; }
  87%  { content: '↖'; }
  100% { content: '↑'; }
}

/* FILTERS ------------------------------ */

.category-filters {
  display: flex;
  overflow-x: auto;
  gap: var(--gutter);
}

.display-lists {
  display: flex;
  gap: 32px;
  overflow-x: auto;
}

.toggle-filters {
  display: flex;
  overflow-x: auto;
  gap: var(--gutter);
}

.toggle-filters .checkbox-label {
  flex: 1 0 auto;
}

@media (min-width: 800px) {
  .toggle-filters .checkbox-label {
    flex: 0 0 auto;
  }
}

/* TEMP */
.display-lists.hideOld .item.notFirstVisit {
  display: none;
}

.display-list {
  width: var(--col-width);
}

.display-list-single {
  width: auto;
}

.display-list.no-checkins {
  width: auto;
  flex: 1 0 5rem;
}

.year-title {
  margin-bottom: 6px;
}

.year-numbers {
  margin-bottom: calc(var(--gutter) * 2);
  color: var(--muted-color);
  font-size: 0.9375rem;
}

.no-checkins .year-title {
  position: relative;
  text-align: center;
  color: var(--faint-color);
}

.no-checkins .year-title::before {
  position: absolute;
  content: '';
  display: block;
  width: 4px;
  height: 1rem;
  background-color: var(--faint-color);
  top: 100%;
  left: 50%;
  margin-top: var(--gutter);
}

.item.item--dense {
  /* Overriding default styling */
  padding-bottom: calc(var(--block-bottom) / 1.5);
}


.visits-bar {
  font-size: 0.8125rem;
  margin-bottom: 4px;
  border-radius: var(--radius-sm);
  /*color: var(--color);*/
}

.item-title::before {
  content: '';
  display: inline-flex;
  display: none !important;
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
  margin-right: 6px;
  background-color: #bbb;
  border-radius: var(--radius-sm);  
}

.item-category {
  /*font-weight: bold;*/
}

.cat-Coffee {
  color: var(--cat-coffee);
}

.cat-Arts {
  color: var(--cat-arts);
}

.cat-Dessert {
  color: var(--cat-dessert);
}

.cat-Food {
  color: var(--cat-food);
}

.cat-Locale {
  color: var(--cat-locale);
}

.cat-Nightlife {
  color: var(--cat-nightlife);
}

.cat-Outdoors {
  color: var(--cat-outdoors);
}

.cat-Residence {
  color: var(--cat-residence);
}

.cat-Shop {
  color: var(--cat-shop);
}

.cat-Travel {
  color: var(--cat-travel);
}

.cat-Work {
  color: var(--cat-work);
}


.venue-title-row {
  display: flex;
  gap: 6px;
/*  margin-bottom: 2px;*/
}

.venue-new-label {
  display: inline-flex;
  display: none;

  align-items: center;
  padding: 2px 6px;
  border-radius: var(--radius);
  font-size: 11px;
  font-weight: var(--weight-bold);
  background: var(--green);
  letter-spacing: 0.01em;
}

.venue-title {
  display: inline-flex;
  align-items: center;
  padding: 2px 0;
  border-radius: var(--radius);
/*  background: #f0ebea;*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*max-width: var(--col-width);*/
}

.venue-meta {
  font-size: 0.8125rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.venue-meta a {
  color: inherit;
}

.venue-meta a:hover {
  cursor: pointer;
}

.venue-comment {
  margin-top: 2px;
  font-size: 0.8125rem;
  color: var(--color);
}

.filters {
  margin-bottom: var(--block-bottom);
}

.filters > * {
  margin-bottom: 8px;
}
</style>
 
