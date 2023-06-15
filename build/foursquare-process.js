const fetch = require('node-fetch');
const fs = require('fs');
const { resolve } = require('path');

// -------
// Config
// -------

// ------------------------
// API Auth and Config
// ------------------------

const CHECKINS_FILE_PATH = resolve(process.cwd(), 'build/data/foursquare-checkins.json');

const CATEGORIES_FILE_PATH = resolve(process.cwd(), 'build/data/foursquare-custom-categories.csv');
const PLACES_COMMENTS_FILE_PATH = resolve(process.cwd(), 'build/data/places-comments.json');

const PLACES_FILE_PATH = resolve(process.cwd(), 'src/data/places-all-time.json');
const PLACES_GROUPED_FILE_PATH = resolve(process.cwd(), 'src/data/places-grouped-by-year.json');




// ------------------------
// ?
// ------------------------


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
  return sortByCount(venuesArr);
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
 * ...
 * @param  {[Object]} checkins
 * @return {[Object]} checkins
 */
function customizeCategories(checkins) {
  function processCSV(csv) {
    let lines = csv.split('\n');
    let categories = {};

    for (let i = 1; i < lines.length; i++) {
        let fields = lines[i].split(',');
        let subCategory = fields[0].trim();
        let category = fields[1].trim();

        if (category) {
            if (categories[category]) {
                categories[category].push(subCategory);
            } else {
                categories[category] = [subCategory];
            }
        }
    }
    return categories;
  }
  
  const categoriesCSV = fs.readFileSync(CATEGORIES_FILE_PATH, 'utf8');
  const customCategories = processCSV(categoriesCSV);

  let unmappedCategories = {};

  checkins = checkins.map(checkin => {
    let categoryMatch = false;
    
    Object.entries(customCategories).forEach(category => {
      let categoryName = category[0];
      let categorySubcategories = category[1];

      if (categorySubcategories.indexOf(checkin.category) !== -1) {
        categoryMatch = true;
        checkin.subCategory = checkin.category;
        checkin.category = categoryName;
      }
    }) 

    // Which categories are not in my custom mapping.
    // Useful for debugging.
    if (!categoryMatch) {
      if (unmappedCategories[checkin.category]) {
        unmappedCategories[checkin.category]++;
      } else {
        unmappedCategories[checkin.category] = 1; 
      }
    }
    return checkin
  })

  function sortObject(obj) {
    let entries = Object.entries(obj);
    entries.sort((a, b) => {
      if (a[1] > b[1]) {
        return -1
      } else if (a[1] < b[1]) {
        return 1
      } else {
        return 0
      }
    });
    return entries.map(([key, value]) => ({[key]: value}));
  }

  unmappedCategories = sortObject(unmappedCategories);
  // DEBUG: List out the categories that are not accounted for in our custom mapping.
  // console.log(unmappedCategories);

  return checkins;  
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

  const data = fs.readFileSync(CHECKINS_FILE_PATH);
  checkins = JSON.parse(data);

  // Use custom category mapping
  checkins = customizeCategories(checkins);

  // Append data to checkins indicating if it is the first and/or last checkin to that venuee
  checkins = checkFirstLastVisit(checkins);
  console.log(`✅ [Foursquare] Data processed`);
  
  // Venues metadata refers to custom comments and attributes I've added to venues via my admin.
  // npm run venues-admin-server; npm run venues-admin
  const venuesData = fs.readFileSync(PLACES_COMMENTS_FILE_PATH);
  venues = JSON.parse(venuesData);
  checkins = mergeVenuesMetadata(checkins, venues);
  console.log(`✅ [Foursquare] Venue metadata merged into data`);

  // // Checkins to venues
  let allTime = checkinsToVenues(checkins);
  allTime = optimizeDataForDisplay(allTime);

  // Checkins grouped by year
  // Checkins to venues
  const groupedCheckins = groupCheckinsByYear(checkins); // We optimize for display in this step
  const groupedVenues = groupedCheckinsToVenues(groupedCheckins);

  // Output file
  // Write to file
  fs.writeFileSync(PLACES_FILE_PATH, JSON.stringify(allTime, null, 2));      

  // Write to file
  fs.writeFileSync(PLACES_GROUPED_FILE_PATH, JSON.stringify(groupedVenues, null, 2));      
}

main();
