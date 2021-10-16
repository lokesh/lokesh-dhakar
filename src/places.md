---
title: "Places"
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Places</h1>

<!--

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

- Use full state name in location dropdown
- Shorten and/or merge category names?
- In group view: on hover, highlight other options
- Add first Boolean in data to indicate first check-in.
In month and year groupings, the venues should display a tag and at the top
of the list we can indicate the count of new spots.
- Add custom notes? or should these happen in app
- Review categoies - merge Cafe and coffee shop? aggregate restaurants. Multiple categories? Check 4sq data.
- Improve hover style

Map
- Monospaced, with location in ascii rectangles on a map?

-->

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
    class="item item--dense"
  >
    <b>{{ venue.venue }}</b>
    <div class="item-meta">
      <span class="item-category">{{ venue.category }}</span>
      <span :class="{
        'count-2-plus': venue.count > 2,
        'count-10-plus': venue.count > 10,
        'count-25-plus': venue.count > 25
      }
      ">
        • {{ venue.count }}
      </span>
       visits
      <span v-if="venue.city">• {{ venue.city }}</span>
    </div>
  </div>
  <div
    class="display-lists"
    ref="lists"
  >
    <div
      v-if="groupFilter === GROUP_BY_YEAR"
      v-for="(venues, year) in displayList"
      class="display-list"
    >
      <h1>{{ year }}</h1>
      <div
        v-for="venue in venues"
        class="item item--dense"
        :class="`venue-${venue.venueId}`"
        @mouseover="highlight(`venue-${venue.venueId}`)"
        @mouseleave="unhighlight(`venue-${venue.venueId}`)"
      >
        <b>{{ venue.venue }}</b>
        <div class="item-meta">
          <span class="item-category">{{ venue.category }}</span>
          
          • 
          <span :class="{
            'count-10-plus': venue.count > 10,
            'count-25-plus': venue.count > 25
          }">
            {{ venue.count }} visits
          </span>
          <span v-if="venue.city">• {{ venue.city }}</span>
        </div>
      </div>
    </div>
  </div>
</div>

<link rel="stylesheet" href="/css/forms.css">

<script src="/js/vue.min.js"></script>

<script>
 
// ------
// CONFIG
// ------

const CATEGORY_ANY = 'Any category';
const LOCATION_ANY = 'Any location';

const GROUP_ALL = 'All-time';
const GROUP_BY_YEAR = 'Group by year'

// --------
// COMMENTS
// --------

var app = new Vue({
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

      return Object.entries(categories).sort((a, b) => {
        return a[1] >= b[1] ? -1 : 1;
      });
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

          // if (stateObj.count < 15) {
          //   return;
          // }          
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
            
            // if (cityCounter > 5 || cityObj.count < 10) {
            //   return;
            // }
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
      for (let year of Object.keys(groupedCheckins)) { 
        groupedCheckins[year] = this.sortVenuesByCount(this.checkinsToVenues(groupedCheckins[year]));
      }
      console.log(groupedCheckins);
      return groupedCheckins;
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
      let group = {};
      checkins.forEach(checkin => {
        if (group[checkin.year]) {
          group[checkin.year].push(checkin);
        } else {
          group[checkin.year] = [checkin];
        }
      })
      return group;
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
.venue-highlight {
  background: var(--hover-bg-color);
}

.item-meta {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-category {
  color: var(--primary-color);
}

.filters {
  margin-bottom: var(--block-bottom);
}

.filters > * {
  margin-bottom: 8px;
}

.display-lists {
  display: flex;
  gap: 32px;
  overflow-x: auto;
}

.display-list {
  min-width: 24rem;
}

/*.count-10-plus {
  color: var(--red);
  font-weight: var(--weight-bold);
}*/
</style>
 
