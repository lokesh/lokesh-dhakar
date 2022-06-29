const fetch = require('node-fetch');
const fs = require('fs');
const { resolve } = require('path');


function checkinsToVenues(checkins) {
  let venuesObj = {};

  checkins.forEach(checkin => {
    let { id } = checkin;
    if (venuesObj[id]) {
      let venue = venuesObj[id];
      venue.count++;

      if (checkin.firstVisit) {
        venue.firstVisit = true;
      }

      if (checkin.lastVisit) {
        venue.lastVisit = true;
      }

    } else {
      venuesObj[id] = {
        ...checkin,
        count: 1,
      }
    }
  });

  const venuesArr = [];
  for (let [id, venue] of Object.entries(venuesObj)) {       
    venuesArr.push(venue);
  };

  return venuesArr;
}


/**
 * @return {[Object]} checkins e.g. [{ year: 2010, checkins: [] }, ... ]
 */
function groupCheckinsByYear(checkins) {
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
      checkins: optimizeDataForDisplay(groupsObj[year])
    })

    prevYear = year;
  })

  return groupsArr;
}


function groupedCheckinsToVenues(groupedCheckins) {
  const groupedVenues = groupedCheckins.map(yearObj => {
    const { year, checkins } = yearObj;
    return {
      year,
      venues: checkins ? sortByCount(checkinsToVenues(checkins)) : [],
    };
  })

  return groupedVenues;
}

function sortByCount(venues) {
  return venues.sort((a, b) => {
    return (a.count >= b.count) ? -1 : 1;
  })
}



// -------
// Testing
// -------

const FETCH_DATA = false; // Hit Foursquare API
const USE_SAMPLE_DATA = false;  // Use sample json

const PROCESS_DATA = true; // Add subcategory, firstVisit, lastVisit
const MERGE_VENUES_METADATA = true;


if (!FETCH_DATA) {
  console.log('🟡 [Foursquare] Fetching data disabled');
} else {
  console.log('🕐 [Foursquare] Refreshing data');
}

if (USE_SAMPLE_DATA) {
  console.log('🟡 [Foursquare] Using sample data');
}


if (!PROCESS_DATA) {
  console.log('🟡 [Foursquare] Data processing disabled');
}

// ------------------------
// API Auth and Config
// ------------------------

const credentialsFilePath = resolve(process.cwd(), '.private');
let credentials = JSON.parse(fs.readFileSync(credentialsFilePath), 'utf-8');

const AUTH_PARAMS = {
  'v': credentials.foursquare.api_version,
  'oauth_token': credentials.foursquare.oauth_token,
};

const CHECKINS_URL  = 'https://api.foursquare.com/v2/users/self/checkins';
const LIMIT = 250;

const CHECKINS_FILE_PATH = resolve(process.cwd(), 'src/data/foursquare-checkins.json');



const CHECKINS_TEST_INPUT_FILE_PATH = resolve(process.cwd(), 'src/data/foursquare-checkins-test-input.json');
const CHECKINS_TEST_OUTPUT_FILE_PATH = resolve(process.cwd(), 'src/data/foursquare-checkins-test-ouput.json');

const VENUES_FILE_PATH = resolve(process.cwd(), 'src/data/venues.json');
const VENUES_GROUPED_FILE_PATH = resolve(process.cwd(), 'src/data/venues-grouped-by-year.json');


const VENUES_METADATA_FILE_PATH = resolve(process.cwd(), 'src/data/venues-metadata.json');


/**
 * @return {Number} count of all checkins for my user
 */
async function fetchCheckinCount() {
   const params = new URLSearchParams({
    ...AUTH_PARAMS,
  })

  const resp = await fetch(`${CHECKINS_URL}?${new URLSearchParams(params)}`);
  const json = await resp.json();
  return json.response.checkins.count;
}

/**
 * @param  {Number} offset
 * @return {[Object]}
 */
async function fetchCheckins(offset = 0) {
  console.log(`   [Foursquare] Fetching checkins ${offset} - ${offset + LIMIT}`);
  const params = new URLSearchParams({
    ...AUTH_PARAMS,
    limit: LIMIT,
    offset,
  })

  const resp = await fetch(`${CHECKINS_URL}?${new URLSearchParams(params)}`);
  const json = await resp.json();

  let checkins = json.response.checkins.items;
  checkins = removeBadData(checkins)
  checkins = simplifyData(checkins);

  // checkins = customizeCategories(checkins);

  return checkins;
}


/**
 * ...
 * @param  {[Object]} checkins
 * @return {[Object]} checkins
 */
function customizeCategories(checkins) {
  const customCategories = [
    {
      name: 'Arts',
      subCategories: [
        'Art Museum',
        'Art Gallery',
        'Movie Theater',
        'Museum',
        'Arcade',
        'Theme Park',
        'Sculpture',
        'Science Museum',
        'Theater',
        'Indie Movies',
        'Library',
        'Church',
        'History Museum',
        'Opera House',
        'Bowling Alley',
        'Casino',
        'Concert Hall',
        'Public Art',
      ],
    }, {
      name: 'Coffee',
      subCategories: [
        'Coffee Shop',
        'Café',
        'Bakery',
        'Tea Room',
      ]
    }, {
      name: 'Food',
      subCategories: [
        'Vegetarian / Vegan',
        'Pizza',
        'Mexican',
        'Food Truck',
        'Food Stand',
        'American',
        'Sandwiches',
        'Thai',
        'Indian',
        'Fast Food',
        'Vietnamese',
        'Burgers',
        'Sushi',
        'Asian',
        'Deli / Bodega',
        'Seafood',
        'Italian',
        'Tacos',
        'Breakfast',
        'Restaurant',
        'Diner',
        'Street Food Gathering',
        'Chinese',
        'Ramen',
        'Burritos',
        'Ethiopian',
        'Korean',
        'Food Court',
        'New American',
        'Bagels',
        'Juice Bar',
        'Hot Dogs',
        'Agrican',
        'Afghan',
        'Japanese',
        'Soup',
        'Pakistani',
        'Dim Sum',
        'German',
        'Noodles',
        'Scandinavian',
      ]
    }, {
      name: 'Dessert',
      subCategories: [
        'Donuts',
        'Ice Cream',
        'Desserts',
        'Yogurt',
      ]
    }, {
      name: 'Outdoors',
      subCategories: [
        'Park',
        'Scenic Lookout',
        'Beach',
        'Trail',
        'Landmark',
        'Other Outdoors',
        'Plaza',
        'Mountain',
        'Bridge',
        'Garden',
        'State / Provincial Park',
        'Playground',
        'Dog Run',
        'National Park',
        'Piers',
        'Track',
        'Cemetary',
        'Lake',
        'Zoo',
        'Zoo Exhibit',
        'Historic Site',
        'Hill',
        'Bike Trail',
        'Golf Course',
        'Soccer Field',
        'Baseball Field',
      ]
    }, {
      name: 'Nightlife',
      subCategories: [
        'Bar',
        'Dive Bar',
        'Cocktail',
        'Brewery',
        'Pub',
        'Sports Bar',
        'Gastropub',
        'Lounge',
        'Wine Bar',
        'Rock Club',
        'Nightclub',
        'Music Venue',
        'Speakeasy',
        'Beer Garden',
        'Whisky Bar',
        'Winery',
        'Vineyard',
      ]
    }, {
      name: 'Shop',
      subCategories: [
        'Grocery Store',
        'Pet Service',
        'Bike Shop',
        'Apparel',
        'Gas Station',
        'Mall',
        'Furniture / Home',
        'Sporting Goods',
        'Bookstore',
        'Pharmacy',
        'Convenience Store',
        'Electronics',
        'Big Box Store',
        'Salon / Barbershop',
        'Gift Shop',
        'Liqour Store',
        'Arts & Crafts',
        'Market',
        'Rental Car',
        'Pet Store',
        'Toys & Games',
        'Hardware',
        'Thrift / Vintage',
        'Animal Shelter',
        'Post Office',
        'Accessories',
        'Gym',
        'Gourmet',
        'Farmer\'s Market',
        'Shopping Plaza',
        'Beer Store',
        'Record Shop',
        'Flower Shop',
        'Garden Center',
      ]
    }, {
      name: 'Travel',
      subCategories: [
        'Airport',
        'Hotel',
        'Train Stati',
        'Tourist Inf',
        'Rest Areas',
        'Parking',
        'Road',
        'Light Rail',
        'Pedestrian ',
        'Metro',
        'Boat / Ferr',
        'Bus Station',
        'Train Station',
        'Resort',
        'Harbor / Marina',
        'Terminal',
        'Plane',
      ]
    }, {
      name: 'Work',
      subCategories: [
        'Office',
        'Tech Startup',
        'Building',
        'Coworking Space',
        'Convention Center',
        'Event Space',
      ]
    }, {
      name: 'Residence',
      subCategories: [
        'Home',
      ]
    }, {
      name: 'Education',
      subCategories: [
        'High School',
        'University',
        'Academic Building',
      ]
    }, {
      name: 'Locale',
      subCategories: [
        'Neighborhood',
        'City',
      ]
    },
  ]

  return checkins.map(checkin => {
    customCategories.forEach(customCat => {
      if (customCat.subCategories.indexOf(checkin.category) !== -1) {
        checkin.subCategory = checkin.category;
        checkin.category = customCat.name;
      }
    })
    return checkin
  })
}

/**
 * ...
 * @param  {[Object]} checkins
 * @return {[Object]} checkins
 */
function checkFirstLastVisit(checkins) {
  return checkins.map(checkin => {
    let allCheckinsToVenue = checkins.filter(c => {
      return c.id === checkin.id;
    })

    let firstVisit = true;
    let lastVisit = true;

    allCheckinsToVenue.forEach(c => {
      if (c.year < checkin.year) {
        firstVisit = false
      } else if (c.year === checkin.year && c.month < checkin.month) {
        firstVisit = false;
      }
    })

    allCheckinsToVenue.forEach(c => {
      if (c.year > checkin.year) {
        lastVisit = false
      } else if (c.year === checkin.year && c.month > checkin.month) {
        lastVisit = false;
      }
    })

    return {
      ...checkin,
      firstVisit,
      lastVisit,
    }
  })
}


/**
 * ...
 * @param  {[Object]} checkins
 * @return {[Object]} checkins
 */
function mergeVenuesMetadata(checkins, venues) {
  return checkins.map(checkin => {
    if (venues[checkin.id]) {
      return {
        ...checkin,
        ...venues[checkin.id]
      }
    } else {
      return checkin;
    }
  })
}


/**
 * Some checkins are missing venue data
 * @param  {[Object]} checkins
 * @return {[Object]} checkins
 */
function removeBadData(checkins) {
  return checkins.filter(item => {
    return item.venue;
  })
}

/**
 * Take raw Foursquare API checkin data and restructure
 * @param  {[Object]} checkins
 * @return {[Object]} checkins
 */
function simplifyData(checkins) {
  return checkins.map(item => {
    const date = new Date(item.createdAt * 1000);

    return {
      venue: item.venue.name,
      id: item.venue.id,
      city: item.venue.location.city,
      state: item.venue.location.state,
      country: item.venue.location.country,
      year: date.getFullYear(),
      month: date.getMonth(),
      category: (item.venue.categories[0] ? item.venue.categories[0].shortName: ''),
    }
  })
}



/**
 * Remove data unneeded for UI. e.g. year and month, which are needed for grouping
 * but not needed on individual items when passed to the UI
 * @param  {[Object]} items
 * @return {[Object]} items
 */
function optimizeDataForDisplay(items) {
  return items.map(item => {
    const { year, month, lastVisit, ...rest } = item;
    return rest;
  })
}

/**
 * Makes multiple fetch calls, concats data, and stores JSON in file.
 */
async function main() {

  let checkins = [];

  if (USE_SAMPLE_DATA) {
    const data = fs.readFileSync(CHECKINS_TEST_INPUT_FILE_PATH);
    checkins = JSON.parse(data);    
  } else if (FETCH_DATA) {
    // Get checkin count
    const checkinCount = await fetchCheckinCount();
    const fetchCount = Math.ceil(checkinCount / LIMIT);

    // Get checkins
    for (let i = 0; i < fetchCount; i++) {
      let items = await fetchCheckins(i * LIMIT);
      checkins.push(...items);
    }

    fs.writeFileSync(CHECKINS_FILE_PATH, JSON.stringify(checkins, null, 2));
    console.log('✅ [Foursquare] Data refreshed');
  } else {
    const data = fs.readFileSync(CHECKINS_FILE_PATH);
    checkins = JSON.parse(data);
  }

  if (PROCESS_DATA) {
    checkins = customizeCategories(checkins);
    checkins = checkFirstLastVisit(checkins);
    console.log(`✅ [Foursquare] ${USE_SAMPLE_DATA ? 'Sample d' : 'D'}ata processed`);
  }

  if (MERGE_VENUES_METADATA) {
    const venuesData = fs.readFileSync(VENUES_METADATA_FILE_PATH);
    venues = JSON.parse(venuesData);
    checkins = mergeVenuesMetadata(checkins, venues);
    console.log(`✅ [Foursquare] Venue metadata merged into ${USE_SAMPLE_DATA ? 'sample' : ''} data`);
  }

  // Checkins to venues
  let allTime = checkinsToVenues(checkins);
  allTime = optimizeDataForDisplay(allTime);

  // Checkins grouped by year
  // Checkins to venues
  const groupedCheckins = groupCheckinsByYear(checkins); // We optimize for display in this step
  const groupedVenues = groupedCheckinsToVenues(groupedCheckins);

  // Output file
  if (PROCESS_DATA || MERGE_VENUES_METADATA) {
    if (USE_SAMPLE_DATA) {
      // Write to file
      fs.writeFileSync(CHECKINS_TEST_OUTPUT_FILE_PATH, JSON.stringify(checkins, null, 2));
    } else {
      // Write to file
      fs.writeFileSync(CHECKINS_FILE_PATH, JSON.stringify(checkins, null, 2));

      // Write to file
      fs.writeFileSync(VENUES_FILE_PATH, JSON.stringify(allTime, null, 2));      

      // Write to file
      fs.writeFileSync(VENUES_GROUPED_FILE_PATH, JSON.stringify(groupedVenues, null, 2));      
    }

  }
}

main();
