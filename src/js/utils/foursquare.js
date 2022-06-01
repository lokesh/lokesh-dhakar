/**
 * Rolls checkin data up into venues. Adds a count property.
 * @param  {[Object]} checkins
 * @return {[Object]} venues
 */
export function checkinsToVenues(checkins) {
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
}


