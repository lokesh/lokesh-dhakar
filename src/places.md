---
title: "Places"
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Places</h1>

<!--

# TODO

- Location dropdown:

```
USA (800)
  CA (320)
    San Francisco (240)
    Los Angeles (24)
    Mill Valley (8)
```

- Add first Boolean in data to indicate first check-in.
In month and year groupings, the venues should display a tag and at the top
of the list we can indicate the count of new spots.

- Geo search
- Favorites toggle
- Add custom notes? or should these happen in app
- Review categoies - merge Cafe and coffee shop?

Map
- Monospaced, with location in ascii rectangles on a map?

-->

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
  checkinsFilteredByCategory: {{ checkinsFilteredByCategory.length }}<br />
  checkinsFilteredByLocation: {{ checkinsFilteredByLocation.length }}<br />
  checkinsFilteredByCategoryAndLocation: {{ checkinsFilteredByCategoryAndLocation.length }}
  <br />
  <button ref="resetBtn">Reset</button>
  <div>
    <select class="select" v-model="categoryFilter">
      <option v-for="category in categoryOptions" :value="category[0]">{{ category[0] }} ({{ category[1] }})</option>
    </select>
  </div>

  <div>
    {{ locationFilter }}
    <select class="select" v-model="locationFilter">
      <option v-for="(location, i) in locationOptions" :value="location.path" :key="i">
        <template v-if="location.path.state">&nbsp;</template>
        <template v-if="location.path.city">&nbsp;</template>
        {{ location.name }} ({{ location.count }})
      </option>
    </select>
  </div>

  <div v-for="checkin in checkinsFilteredByCategoryAndLocation" class="item item--dense">
    <b>{{ checkin.venue }}</b>
    <div class="item-meta">
      <span class="item-category">{{ checkin.category }}</span> • {{ checkin.count }} visits • {{ checkin.city }}
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
const LOCATION_ANY = 'Any';

// --------
// COMMENTS
// --------

var app = new Vue({
  el: '#venues',

  data() {
    return {
      CATEGORY_ANY,
      categories: [],
      checkins: [],
      categoryFilter: CATEGORY_ANY,
      locationFilter: LOCATION_ANY,
    };
  },

  created() {
    fetch('/data/foursquare-checkins.json')
      .then(res => res.json())
      .then(data => {
        // TODO: move to func
        this.checkins = data.sort((a, b) => {
          return (a.count >= b.count) ? -1 : 1;
        })
        // this.populateCategories();
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
     * Category filter dropdown options.
     * @return {[[Array]]} e.g. [['coffee shop', 23], ['gym', 5]]
     */
    categoryOptions() {
      let categories = {
        [CATEGORY_ANY]: this.checkinsFilteredByLocation.length 
      };

      this.checkinsFilteredByLocation.forEach((venue) => {
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

    /*
      USA: {
        count: 100,
        children: {
          'California': {
            count: 50,
            children: {
              'San Francisco': {
                count: 20,
              },
            }
          }
        }
      }

      Create tree, sort in follow-up step.

     */

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

      this.checkinsFilteredByCategory.forEach(checkin => {
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

      // console.log(tree);
      
      let options = [];

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

      // console.log(countryCountsSorted);

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
        // console.log(stateCountsSorted);

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
          // console.log(stateCountsSorted);

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

      // options = options.filter(option => {
      //   return option.count > 10;
      // })

      console.log(options);
      /*
      Flatten tree into unsorted list
      ---
      0: {name: 'United States', count: 2988, path: {…}}
      1: {name: 'CA', count: 1720, path: {…}}
      2: {name: 'San Francisco', count: 1224, path: {…}}
      3: {name: 'Emeryville', count: 11, path: {…}}  
    
      Path ex:
      {country: 'United States', state: 'CA', city: 'San Francisco'}
       */
      // const list = [];
      
      // for (let [country, countryObj] of Object.entries(tree)) {       
      //   list.push({
      //     name: country,
      //     count: countryObj.count,
      //     path: {
      //       country,
      //     }
      //   })

      //   for (let [state, stateObj] of Object.entries(countryObj.children)) { 
      //     list.push({
      //       name: state,
      //       count: stateObj.count,
      //       path: {
      //         country,
      //         state,
      //       }
      //     })

      //     for (let [city, cityObj] of Object.entries(stateObj.children)) { 
      //       list.push({
      //         name: city,
      //         count: cityObj.count,
      //         path: {
      //           country,
      //           state,
      //           city,
      //         }
      //       })
      //     }
      //   }
      // }
      
      // console.log(list);
      

      // list.sort((a, b) => {
        // console.log(a, b);
        
        // let aType = 'country';
        // if (a.path.city) {
        //   aType = 'city'
        // } else if (a.path.state) {
        //   aType = 'state';
        // } 
        // if (a is less than b by some ordering criterion) {
        //   return -1;
        // }
        // if (a is greater than b by the ordering criterion) {
        //   return 1;
        // }
        // // a must be equal to b
        // return 0;
      // });


      // let options = [];
      // locations.forEach(country => {
      //   options.push({
      //     name: country,
      //     count: country.coun
      //   })
      // })      
      // [{
      //   name: 'San Francisco',
      //   count: 200,
      //   prop: {
      //     country: 'us',
      //     state: 'ca',
      //     city: 'san'
      //   }
      // }]

      // Sort countries
      // - Push countries into an array and sort
      /*
        [
          {
            name: US,
            count: 2000,
            path: {
              country: 'us'
            }
            children: {}
          }
        ]
      */

      // Sort states
      // - Push states

      // Sort cities
      


      // let categories = {
      //   [CATEGORY_ANY]: this.checkins.length 
      // };

      // this.checkins.forEach((venue) => {
      //   let { category } = venue;
      //   if (categories.hasOwnProperty(category)) {
      //     categories[category] = categories[category] + 1;
      //   } else {
      //     categories[category] = 1;
      //   }
      // })

      // return Object.entries(categories).sort((a, b) => {
      //   return a[1] >= b[1] ? -1 : 1;
      // });
      return options;      
    },

    venues() {
      // "venue": "The Panhandle",
      // "venueId": "483155fcf964a520e04f1fe3",
      // "city": "San Francisco",
      // "state": "CA",
      // "country": "United States",
      // "category": "Park",
      // "year": 2021,
      // "month": 9

    },

  },

  methods: {
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
 
