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

export const CATEGORY_ANY = 'Any category';
export const SUBCATEGORY_ANY = 'Any sub-category';

/**
 * @param  {[Object]} checkins
 * @param  {String} categoryFilter e.g. 'Nightlife'
 * @param  {String} subCategoryFilter e.g. 'Dive Bar'
 * @return {[Object]} filtered checkins
 */
export function filterCheckinsByCategory(
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

