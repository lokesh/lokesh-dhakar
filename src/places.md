---
title: "Places"
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Places</h1>

<!--




## To-do
- [x] At-a-glance visual indicator of visits
- [ ] Category eval
- [ ] Document data pipeline and transformations


# How the filtering works

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

- allow clicking category in venue listing to set it as active cat filter
- Highlight trips automatically
- Categories
-- Get Foursquare cat hierarchy: https://api.foursquare.com/v2/venues/categories?v=20140620
-- Update to reflect the hiearchy I'd like to use. aka, create coffee shops at top-level


restaurants
bars
bike shops
airports
offices
homes
parks
grocery stores
retail shop


4sq top level cats
- Arts & Entertainment
- College & University
- Event
- Food
- Nightlife Spot
- Outdoors & Recreation
- Professional & Other Places
- Residence
- Shop & Service
- Travel & Transporation

- Shorten and/or merge category names?

- Show top 3 categories by year?

- Loader


- Add first Boolean in data to indicate first check-in.
In month and year groupings, the venues should display a tag and at the top
of the list we can indicate the count of new spots.
- Add custom notes? or should these happen in app
- Improve hover style




Map
- Monospaced, with location in ascii rectangles on a map?

<div
    class="item item--dense"
    :class="[
      `venue-${venueId}`,
      `cat-${category}`,
    ]"
    @mouseover="highlight(`venue-${venueId}`)"
    @mouseleave="unhighlight(`venue-${venueId}`)"
  >
    <div class="item-title">{{ venue }}</div>
    <div class="item-meta">
      <span class="item-category">{{ category }}</span>
      • 
      <span :class="{
        'count-10-plus': count > 10,
        'count-25-plus': count > 25
      }">
        {{ count }} visits
      </span>
      <span v-if="=city">• {{ city }}</span>
    </div>
  </div>
-->

<template id="tpl-venue">
  <div>
    <div
      class="item item--dense"
      :class="[
        `venue-${venueId}`,
        `cat-${category}`,
      ]"
    >
      <div
        class="visits-bar"
        :style="getWidthFromVisitsCount(count)"
      ></div>
      <div class="item-title venue-title">{{ venue }}</div>
      <div class="item-meta venue-meta">
        <template v-if="category">
          <span class="item-category">{{ category }}</span>
        </template>
        <template v-if="category && count > 1">
          •
        </template>
        <template v-if="count > 1">
          <span :class="{
            'count-10-plus': count > 10,
            'count-25-plus': count > 25
          }">
            {{ count }} visits
          </span>
        </template>
        <template v-if="(city || count > 1) && city">
          •
        </template>
        <span v-if="city">{{ city }}, {{ state }}</span>
      </div>
    </div>
  </div>
</template>


<div id="venues" class="venues">
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
    <div>
      <select class="select" v-model="categoryFilter">
        <option v-for="category in categoryOptions" :value="category[0]">{{ category[0] }} ({{ category[1] }})</option>
      </select>
    </div>
    <div>
      <select class="select" v-model="groupFilter">
        <option v-for="group in groupOptions" :value="group">{{ group }}</option>
      </select>
    </div>
    <button ref="resetBtn" @click="resetFilters">Reset</button>
  </div>
  <div
    v-if="groupFilter === GROUP_ALL"
    v-for="venue in displayList"
  >
     <venue v-bind="venue" />
  </div>
  <div
    class="display-lists"
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
        v-for="venue in list.venues"
        @mouseover="highlight(`venue-${venue.venueId}`)"
        @mouseleave="unhighlight(`venue-${venue.venueId}`)"
      >
        <venue v-bind="venue" />
      </div>
    </div>
  </div>
</div>

<link rel="stylesheet" href="/css/forms.css">

<script src="/js/vue.min.js"></script>

<script type="module">
import { stateNameToAbbreviation, stateAbbreviationToName } from '/js/utils/location.js';

// ------
// CONFIG
// ------

// If location doesn't meet min venues, it won't be displayed in location filter
const MIN_COUNT_FOR_LOCATION = 10;
const MIN_COUNT_FOR_CATEGORY = 0;

const CATEGORY_ANY = 'Any category';
const LOCATION_ANY = 'Any location';

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
    city: String,
    state: String,
    count: Number,
  },

  methods: {
    // onChange(event) {
    //   this.$emit('change', event.target.value);
    // }
    // 
    getWidthFromVisitsCount(count) {
      return {
        width: `${Math.min(Math.max((count - 5), 0) * 5, 100)}%`,
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
      LOCATION_ANY,
      categories: [],
      checkins: [],
      categoryFilter: CATEGORY_ANY,
      locationFilter: {},
      groupFilter: GROUP_BY_YEAR,
      GROUP_ALL,
      GROUP_BY_YEAR,
    };
  },

  created() {
    fetch('/data/foursquare-checkins.json')
      .then(res => res.json())
      .then(data => {
        this.checkins = data;
      })
      .catch((error) => {
        console.log(error);
      })
  },

  computed: {
    /**
     * Category filter dropdown options.
     * @return {[[Array]]} e.g. [['coffee shop', 23], ['gym', 5]]
     */
    categoryOptions() {
      let categories = {
        [CATEGORY_ANY]: this.venuesFilteredByLocation.length 
      };

      this.venuesFilteredByLocation.forEach((venue) => {
        let { category } = venue;
        if (categories.hasOwnProperty(category)) {
          categories[category] = categories[category] + 1;
        } else {
          categories[category] = 1;
        }
      })

      // Sort
      categories = Object.entries(categories).sort((a, b) => {
        return a[1] >= b[1] ? -1 : 1;
      });

      return (MIN_COUNT_FOR_CATEGORY)
        ? categories.filter(cat => cat[1] > MIN_COUNT_FOR_CATEGORY)
        : categories;
    },

    /**
     * Apply category filters to checkins
     * @return {[Object]} checkins
     */
    checkinsFilteredByCategory() {
      return this.filterCheckinsByCategory(this.checkins, this.categoryFilter);
    },

    /**
     * Apply location filters to checkins
     * @return {[Object]} checkins
     */
    checkinsFilteredByLocation() {
      return this.filterCheckinsByLocation(this.checkins, this.locationFilter);
    },

    /**
     * Apply category and location filters to checkins
     * @return {[Object]} checkins
     */
    checkinsFilteredByCategoryAndLocation() {
      let checkins = this.filterCheckinsByCategory(this.checkins, this.categoryFilter);
      return this.filterCheckinsByLocation(checkins, this.locationFilter);
    },

    displayList() {
      if (this.groupFilter === GROUP_BY_YEAR) {
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

    venuesFilteredByCategory() {
      return this.checkinsToVenues(this.checkinsFilteredByCategory);
    },

    venuesFilteredByLocation() {
      return this.checkinsToVenues(this.checkinsFilteredByLocation);
    },

    venuesFilteredByCategoryAndLocation() {
      const venues = this.checkinsToVenues(this.checkinsFilteredByCategoryAndLocation);
      return this.sortVenuesByCount(venues);
    },

    venuesFilteredByCategoryAndLocationGroupedByYear() {
      const groupedCheckins = this.groupCheckinsByYear(this.checkinsFilteredByCategoryAndLocation);

      // this.getTopCategoriesFromCheckins(groupedCheckins)
      // console.log(groupedCheckins);

      const groupedVenues = groupedCheckins.map(yearObj => {
        const { year, checkins } = yearObj;
        return {
          year,
          venues: checkins ? this.sortVenuesByCount(this.checkinsToVenues(checkins)) : [],
        };
      })

      return groupedVenues;
    },
  },

  methods: {
    /**
     * Rolls checkin data up into venues. Adds a count property.
     * @param  {[Object]} checkins
     * @return {[Object]} venues
     */
    checkinsToVenues(checkins) {
      let venuesObj = {};

      checkins.forEach(checkin => {
        let { venueId } = checkin;
        if (venuesObj[venueId]) {
          venuesObj[venueId].count++;
        } else {
          venuesObj[venueId] = {
            ...checkin,
            count: 1,
          }
        }
      });

      const venuesArr = [];
      for (let [venueId, venue] of Object.entries(venuesObj)) {       
        venuesArr.push(venue);
      };

      return venuesArr;
    },

    /**
     * @param  {[Object]} checkins
     * @param  {String} categoryFilter e.g. 'Airport'
     * @return {[Object]} filtered checkins
     */
    filterCheckinsByCategory(checkins, categoryFilter) {
      if (categoryFilter === CATEGORY_ANY) {
        return checkins;
      }

      return checkins.filter(checkin => {
        return checkin.category === categoryFilter;
      })
    },
    
    /**
     * @param  {[Object]} checkins
     * @param  {Object} locationFilter e.g. {country: 'Canada', state: 'Ontario'}
     * @return {[Object]} filtered checkins
     */
    filterCheckinsByLocation(checkins, locationFilter) {
      if (locationFilter !== LOCATION_ANY) {
        let { country, state, city } = locationFilter;
        
        if (country === 'United States') {
          state = stateNameToAbbreviation(state);
        }

        checkins = checkins.filter(checkin => {
          if (country && checkin.country !== country) {
            return false;
          }
          if (state && checkin.state !== state) {
            return false;
          }
          if (city && checkin.city !== city) {
            return false;
          }
          return true;
        })
      }

      return checkins;
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
            console.log(prevYear);
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

    resetCategoryFilter() {
      this.categoryFilter = CATEGORY_ANY;
    },
    
    resetLocationFilter() {
      this.locationFilter = {};
    },

    resetFilters() {
      this.resetCategoryFilter();
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


.display-lists {
  display: flex;
  gap: 32px;
  overflow-x: auto;
}

.display-list {
  width: var(--col-width);
}

/*@media (min-width: 800px) {
  .display-list {
    width: 26rem;
  }
}
*/
.display-list.no-checkins {
  width: auto;
}

.no-checkins .year-title {
  position: relative;
  color: var(--muted-color);
}

.no-checkins .year-title::before {
  position: absolute;
  content: '';
  display: block;
  width: 1px;
  height: 1rem;
  background-color: var(--border-color-light);
  top: 100%;
  left: 50%;
  margin-top: var(--gutter);
}

.venue-highlight {
  background: var(--hover-bg-color);
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
  margin-bottom: 8px;
  border-radius: var(--radius-sm);
  background-color: var(--color);
}

.item-title::before {
  content: '';
  display: inline-block;
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

.venue-category {
  /*color: var(--primary-color);*/
}

.filters {
  margin-bottom: var(--block-bottom);
}

.filters > * {
  margin-bottom: 8px;
}


/*.count-10-plus {
  color: var(--red);
  font-weight: var(--weight-bold);
}*/
</style>
 
