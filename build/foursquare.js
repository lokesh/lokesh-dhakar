const fetch = require('node-fetch');
const fs = require('fs');
const { resolve } = require('path');


/*
- [ ]  Get token
- [ ]  Save token

Do these two first as token might not expire
- [ ] Fetch data
- [ ] Save data to file


- Remove venueId to reduce file size?
- gzip ahead of time?
 */

console.log('🕐 [Foursquare] Refreshing data');

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


async function fetchCheckinCount() {
   const params = new URLSearchParams({
    ...AUTH_PARAMS,
  })

  const resp = await fetch(`${CHECKINS_URL}?${new URLSearchParams(params)}`);
  const json = await resp.json();
  return json.response.checkins.count;
}

/**
 * ...
 * @param  {Number} offset ]
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
  checkins = simplifyData(json.response.checkins.items);

  return checkins;
}

/**
 * Some checkins are missing venue data
 * @param  {[Object]} checkins
 * @return {[Object]}
 */
function removeBadData(checkins) {
  return checkins.filter(item => {
    return item.venue;
  })
}

/**
 * @param  {[Object]} checkins
 * @return {[Object]}
 */
function simplifyData(checkins) {
  return checkins.map(item => {
    const date = new Date(item.createdAt * 1000);

    return {
      venue: item.venue.name,
      venueId: item.venue.id,
      city: item.venue.location.city,
      state: item.venue.location.state,
      country: item.venue.location.country,
      category: (item.venue.categories[0] ? item.venue.categories[0].shortName: ''),
      year: date.getFullYear(),
      month: date.getMonth(),
    }
  })
}


async function main() {
  // Get checkin count
  const checkinCount = await fetchCheckinCount();
  const fetchCount = Math.ceil(checkinCount / LIMIT);

  // Get checkins
  const checkins = [];
  for (let i = 0; i < fetchCount; i++) {
    let items = await fetchCheckins(i * LIMIT);
    checkins.push(...items);
  }

  // Write to file
  fs.writeFileSync(CHECKINS_FILE_PATH, JSON.stringify(checkins, null, 2));
  console.log('✅ [Foursquare] Data refreshed');
}

main();