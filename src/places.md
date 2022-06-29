---
title: "Places"
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Places</h1>

<!--

## To-do




- [ ] Fetch comments for checkins
Do this by first fetching checkins. Then for each venue, fetching checkin.
Set up code that we only get new check-ins moving forward and only for those venues do we get full venue data.

- [x] Clickable cities, states
- [x] Clickable categories
- [x] Show count and percentage of new spots.
- [ ] Add loading indicator
- [ ] Show favorites?
- [ ] Mobile dropdown for location too long


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
- Add custom notes? or should these happen in app
Map
- Monospaced, with location in ascii rectangles on a map?

-->

<template id="tpl-venue">
  <div>
    <div
      class="item item--dense"
      :class="[
        `venue-${venueId}`,
        `cat-${category}`,
        { notFirstVisit: !firstVisit },
      ]"
    >
      <div
        class="visits-bar"
        :style="getWidthFromVisitsCount(count)"
      ></div>
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
            {{ city }}
          </a>,
          <a @click="$emit('set-location', { country, state })">
            {{ state }}
          </a>
        </span>
      </div>
      <div>
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
   <div class="filters">
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
    <div>
      <!-- <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" v-model="showNewFilter" checked>
        <span>Only new spots</span>
      </label> -->
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
        @mouseover="highlight(`venue-${venue.venueId}`)"
        @mouseleave="unhighlight(`venue-${venue.venueId}`)"
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
import { stateNameToAbbreviation, stateAbbreviationToName } from '/js/utils/location.js';
import {
  CATEGORY_ANY,
  LOCATION_ANY,
  SUBCATEGORY_ANY,
  checkinsToVenues,
  filterCheckinsByCategory,
  filterCheckinsByLocation,
} from '/js/utils/foursquare.js';


// ------
// CONFIG
// ------

// If options don't meet min count, they will not be added to filter controls
const MIN_COUNT_FOR_LOCATION = 1;
const MIN_COUNT_FOR_CATEGORY = 1;
const MIN_COUNT_FOR_SUBCATEGORY = 1;

const GROUP_ALL = 'All-time';
const GROUP_BY_YEAR = 'Group by year'

// ----------
// COMPONENTS
// ----------

Vue.component('venue', {
  template: '#tpl-venue',
  
  props: {
    venueId: String,
    venue: String,
    category: String,
    subCategory: String,
    country: String,
    city: String,
    state: String,
    count: Number,
    firstVisit: Boolean,
    lastVisit: Boolean,
    comments: String,
    goToSpotFilter: Boolean,
    outdoorSeatingFilter: Boolean,
    dateSpotFilter: Boolean,
    wouldTakeVisitorsFilter: Boolean,
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
    getWidthFromVisitsCount(count) {
      return {
        width: `${Math.min(Math.max((count - 1), 0) * 5, 100)}%`,
      };
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
      CATEGORY_ANY,
      SUBCATEGORY_ANY,
      LOCATION_ANY,
      categories: [],
      checkins: [],
      categoryFilter: CATEGORY_ANY,
      subCategoryFilter: SUBCATEGORY_ANY,
      locationFilter: {},
      groupFilter: GROUP_BY_YEAR,
      showNewFilter: false,
      goToSpotFilter: false,
      outdoorSeatingFilter: false,
      dateSpotFilter: false,
      wouldTakeVisitorsFilter: false,
      GROUP_ALL,
      GROUP_BY_YEAR,
    };
  },

  async created() {
    let resp = await fetch('/data/foursquare-checkins.json');
    this.checkins = await resp.json();
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
        [CATEGORY_ANY]: this.venuesFilteredByLocation.length 
      };

      this.venuesFilteredByLocation.forEach((venue) => {
        let { category, subCategory } = venue;

        // If category has not been bucketed by my, skip
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
        return (cat[1] >= MIN_COUNT_FOR_CATEGORY);
      });

      // Sort
      categories = categories.sort((a, b) => {
        return a[1] >= b[1] ? -1 : 1;
      });

      return categories;
    },


    subCategoryOptions() {
      if (!this.categoryFilter) return [];
      
      let subCategories = {
        [SUBCATEGORY_ANY]: this.venuesFilteredByPrimaryCategoryAndLocation.length
      };

      this.venuesFilteredByPrimaryCategoryAndLocation.forEach(venue => {
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
        return (cat[1] >= MIN_COUNT_FOR_SUBCATEGORY);
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
    checkinsFilteredByCategory() {
      return filterCheckinsByCategory(this.checkins, this.categoryFilter, this.subCategoryFilter);
    },

    /**
     * Apply location filters to checkins
     * @return {[Object]} checkins
     */
    checkinsFilteredByLocation() {
      return filterCheckinsByLocation(this.checkins, this.locationFilter);
    },

    /**
     * Apply primary category and location filters to checkins, but not subcategory
     * @return {[Object]} checkins
     */
    checkinsFilteredByPrimaryCategoryAndLocation() {
      let checkins = filterCheckinsByCategory(this.checkins, this.categoryFilter);
      return filterCheckinsByLocation(checkins, this.locationFilter);
    },

    /**
     * Apply category and location filters to checkins
     * @return {[Object]} checkins
     */
    checkinsFilteredByCategoryAndLocation() {
      let checkins = filterCheckinsByCategory(this.checkins, this.categoryFilter, this.subCategoryFilter);
      return filterCheckinsByLocation(checkins, this.locationFilter);
    },

    displayList() {
      if (this.groupFilter === GROUP_BY_YEAR) {
        // console.log(this.venuesFilteredByCategoryAndLocationGroupedByYear);
        return this.venuesFilteredByCategoryAndLocationGroupedByYear;
      } 
      return this.venuesFilteredByCategoryAndLocation;
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
      this.venuesFilteredByCategory.forEach(checkin => {
        let { country, state, city, venueId } = checkin;
        if (!country || !state || !city) return;

        if (country === 'United States') {
          state = stateAbbreviationToName(state);
        }

        // Count venues only once, though there could be multiple checkins
        if (countedVenues[venueId]) {
          return;
        } else {
          countedVenues[venueId] = true;
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
        count: this.venuesFilteredByCategory.length,
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
        
        if (countryObj.count < MIN_COUNT_FOR_LOCATION) {
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

          if (stateObj.count < MIN_COUNT_FOR_LOCATION) {
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
            
            if (cityObj.count < MIN_COUNT_FOR_LOCATION) {
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

    // venuesFilteredByAll() {
    //   return checkinsToVenues(this.checkinsFilteredByCategory);
    // },

    venuesFilteredByCategory() {
      return checkinsToVenues(this.checkinsFilteredByCategory);
    },

    venuesFilteredByLocation() {
      return checkinsToVenues(this.checkinsFilteredByLocation);
    },

    venuesFilteredByCategoryAndLocation() {
      const venues = checkinsToVenues(this.checkinsFilteredByCategoryAndLocation);
      return this.sortVenuesByCount(venues);
    },

    venuesFilteredByPrimaryCategoryAndLocation() {
      const venues = checkinsToVenues(this.checkinsFilteredByPrimaryCategoryAndLocation);
      return this.sortVenuesByCount(venues);
    },

    venuesFilteredByCategoryAndLocationGroupedByYear() {
      const groupedCheckins = this.groupCheckinsByYear(this.checkinsFilteredByCategoryAndLocation);

      const groupedVenues = groupedCheckins.map(yearObj => {
        const { year, checkins } = yearObj;
        return {
          year,
          venues: checkins ? this.sortVenuesByCount(checkinsToVenues(checkins)) : [],
        };
      })

      return groupedVenues;
    },
  },

  methods: {
    countNewVenues(venues) {
      return venues.filter(v => v.firstVisit).length
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

    /**
     * @return {[Object]} checkins e.g. [{ year: 2010, checkins: [] }, ... ]
     */
    groupCheckinsByYear(checkins) {
      let groupsObj = {};
      let years = [];
      let groupsArr = [];
      checkins.forEach(checkin => {
        if (groupsObj[checkin.year]) {
          groupsObj[checkin.year].push(checkin);
        } else {
          years.push(checkin.year);
          groupsObj[checkin.year] = [checkin];
        }
      })

      years = years.sort((a, b) => {
        return (a >= b) ? -1 : 1;
      })

      let prevYear;
      let yearsLength = years.length;
      years.forEach((year, i) => {
        // if prevYear is set and year doesn't equal year - 1
        // prevYear = 2017
        // year = 2013
        // fill in 2016, 2015, 2014
        
        // and if not last in index
        if (prevYear && (i < yearsLength)) {
          while (prevYear - 1 > year) {
            prevYear--;
            groupsArr.push({
              year: prevYear,
            })
          }
        }
        groupsArr.push({
          year,
          checkins: groupsObj[year]
        })

        prevYear = year;
      })

      return groupsArr;
    },

    highlight(elClass) {
      let els = [...this.$refs.lists.getElementsByClassName(elClass)]
      els.forEach(el => { el.classList.add('venue-highlight') });
    },
    
    unhighlight(elClass) {
      let els = [...this.$refs.lists.getElementsByClassName(elClass)]
      els.forEach(el => { el.classList.remove('venue-highlight') });
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

    resetFilters() {
      this.resetCategoryFilter();
      this.resetSubCategoryFilter();
      this.resetLocationFilter();
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
.venues {
  --col-width: 22rem;
}

@media (min-width: 800px) {
  .venues {
    --col-width: 26rem;
  }
}

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
  font-weight: var(--weight-bold);
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

.venue-highlight {
  /*background: var(--hover-bg-color);*/
}

/*
https://lokeshdhakar.com/projects/color-stacks/?graySteps=5&grayCast=0&grayLumaStart=98&grayLumaEnd=5&grayLumaCurve=linear&colorSteps=7&colorLumaStart=110&colorLumaEnd=10&colorLumaCurve=linear&colorChromaStart=42&colorChromaEnd=12&colorChromaCurve=linear&showLabel=true&showHex=true&showContrastRatio=false&colorHues=0%2C30%2C55%2C78%2C118%2C157%2C182%2C230%2C274%2C309%2C348
 */


.item.item--dense {
  /* Overriding default styling */
  /*border-bottom: none;*/
  /*margin-bottom: calc(var(--block-bottom) / 2);*/
  padding-bottom: calc(var(--block-bottom) / 1.5);
}


.visits-bar {
  height: 4px;
  margin-bottom: 6px;
  border-radius: var(--radius-sm);
  background-color: var(--color);
}

.item-title::before {
  content: '';
  display: inline-flex;
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
  margin-right: 6px;
  background-color: #bbb;
  border-radius: var(--radius-sm);  
}

.cat-Park .item-title,
.cat-Scenic .item-title,
.cat-Beach .item-title,
.cat-Trail .item-title,
.cat-Hill .item-title,
.cat-Landmark .item-title {
  background-color: #ffd1ed;
}


.cat-Park .item-title::before,
.cat-Scenic .item-title::before,
.cat-Beach .item-title::before,
.cat-Trail .item-title::before,
.cat-Hill .item-title::before,
.cat-Landmark .item-title::before {
  background-color: #bf91ad;
}

.cat-Café .item-title,
.cat-Bakery .item-title,
.cat-Coffee .item-title {
  background-color: #ffe5a7;
}


.cat-Café .item-title::before,
.cat-Bakery .item-title::before,
.cat-Coffee .item-title::before {
  background-color: #DF932D;
}

.cat-Café .visits-bar,
.cat-Bakery .visits-bar,
.cat-Coffee .visits-bar {
  background-color: #DF932D;
}

.cat-Pub .item-title,
.cat-Wine .item-title,
.cat-Cocktail .item-title,
.cat-Brewery .item-title,
.cat-Bar .item-title {
  background-color: #e2f4ac;
}


.cat-Pub .item-title::before,
.cat-Wine .item-title::before,
.cat-Cocktail .item-title::before,
.cat-Brewery .item-title::before,
.cat-Bar .item-title ::before{
  background-color: #b3d943;
}


.cat-Pub .visits-bar,
.cat-Wine .visits-bar,
.cat-Cocktail .visits-bar,
.cat-Brewery .visits-bar,
.cat-Bar .visits-bar {
  background-color: #b3d943;
}


.cat-Ramen .item-title,
.cat-Chinese .item-title,
.cat-Thai .item-title,
.cat-Asian .item-title,
.cat-Donuts .item-title,
.cat-Juice .item-title,
.cat-Food .item-title,
.cat-Burritos .item-title,
.cat-Vegetarian .item-title,
.cat-Desserts .item-title,
.cat-Cupcakes .item-title,
.cat-Sandwiches .item-title,
.cat-Italian .item-title,
.cat-American .item-title, 
.cat-Tacos .item-title, 
.cat-Pizza .item-title,
.cat-Sushi .item-title,
.cat-Noodles .item-title {
  background-color: #c5eeff;
}


.cat-Ramen .item-title::before,
.cat-Chinese .item-title::before,
.cat-Thai .item-title::before,
.cat-Asian .item-title::before,
.cat-Donuts .item-title::before,
.cat-Juice .item-title::before,
.cat-Food .item-title::before,
.cat-Burritos .item-title::before,
.cat-Vegetarian .item-title::before,
.cat-Desserts .item-title::before,
.cat-Cupcakes .item-title::before,
.cat-Sandwiches .item-title::before,
.cat-Italian .item-title::before,
.cat-American .item-title::before,
.cat-Tacos .item-title::before ,
.cat-Pizza .item-title::before,
.cat-Sushi .item-title::before,
.cat-Noodles .item-title::before{
  background-color: #71c9ef;
}




.cat-Ramen .visits-bar,
.cat-Chinese .visits-bar,
.cat-Thai .visits-bar,
.cat-Asian .visits-bar,
.cat-Donuts .visits-bar,
.cat-Juice .visits-bar,
.cat-Food .visits-bar,
.cat-Burritos .visits-bar,
.cat-Vegetarian .visits-bar,
.cat-Desserts .visits-bar,
.cat-Cupcakes .visits-bar,
.cat-Sandwiches .visits-bar,
.cat-Italian .visits-bar,
.cat-American .visits-bar, 
.cat-Tacos .visits-bar, 
.cat-Pizza .visits-bar,
.cat-Sushi .visits-bar,
.cat-Noodles .visits-bar {
  background-color: #71c9ef;
}

.venue-title-row {
  display: flex;
  gap: 6px;
  margin-bottom: 2px;
}

.venue-new-label {
  display: inline-flex;
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
  padding: 2px 6px;
  border-radius: var(--radius);
  background: #f0ebea;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: var(--col-width);

  /* TEMPORARY */
  /*background: transparent !important;*/
}

.venue-meta {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.venue-meta a {
  color: var(--muted-color);
}

.venue-meta a:hover {
  cursor: pointer;
  /*text-decoration: underline;*/
}


.venue-category {
  /*color: var(--primary-color);*/
}

.filters {
  margin-bottom: var(--block-bottom);
}

.filters > * {
  margin-bottom: 8px;
}
</style>
 
