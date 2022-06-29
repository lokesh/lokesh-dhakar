import { stateNameToAbbreviation } from './location.js';

export const CATEGORY_ANY = 'Any category';
export const SUBCATEGORY_ANY = 'Any sub-category';
export const LOCATION_ANY = 'Any location';

/**
 * Rolls checkin data up into venues. Adds a count property.
 * 
 * If any checkins for a venue have firstVisit or lastVisit set to true,
 * we set them as true for the venue.
 * 
 * @param  {[Object]} checkins
 * @return {[Object]} venues
 */
export function checkinsToVenues(checkins) {
  let venuesObj = {};

  checkins.forEach(checkin => {
    let { venueId } = checkin;
    if (venuesObj[venueId]) {
      let venue = venuesObj[venueId];
      venue.count++;

      if (checkin.firstVisit) {
        venue.firstVisit = true;
      }

      if (checkin.lastVisit) {
        venue.lastVisit = true;
      }

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
}

/**
 * @param  {[Object]} checkins or venues
 * @param  {String} categoryFilter e.g. 'Nightlife'
 * @param  {String} subCategoryFilter e.g. 'Dive Bar'
 * @return {[Object]} filtered checkins or venues
 */
export function filterByCategory(
  checkins,
  categoryFilter = CATEGORY_ANY,
  subCategoryFilter = SUBCATEGORY_ANY,
) {

  return checkins.filter(checkin => {
    let match = true;
    if (categoryFilter !== CATEGORY_ANY
        && checkin.category !== categoryFilter) {
      match = false;
    }
    if (subCategoryFilter !== SUBCATEGORY_ANY
        && checkin.subCategory !== subCategoryFilter) {
      match = false;
    }

    return match
  })
}

/**
 * @param  {[Object]} checkins or venues
 * @param  {Object} locationFilter e.g. {country: 'Canada', state: 'Ontario'}
 * @return {[Object]} filtered checkins or venues
 */
export function filterByLocation(checkins, locationFilter) {
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
}

/**
 * @param  {[Object]} checkins or venues
 * @param  {Object} venue metadata e.g. {outdoorSeating: 'true', comments: true}
 * @return {[Object]} filtered checkins or venues
 */
export function filterByMetadata(items, metadata = {}) {
  const { comments, outdoorSeating, goToSpot, dateSpot, wouldTakeVisitors } = metadata;

  return items.filter(item => {
    if (comments && !item.comments) return false;
    if (outdoorSeating && !item.outdoorSeating) return false;
    if (goToSpot && !item.goToSpot) return false;
    if (dateSpot && !item.dateSpot) return false;
    if (wouldTakeVisitors && !item.wouldTakeVisitors) return false;
    return true;
  })
}
