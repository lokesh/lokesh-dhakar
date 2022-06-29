import { checkins } from './data/checkins.js'
import {
	CATEGORY_ANY,
	LOCATION_ANY,
	SUBCATEGORY_ANY,
	checkinsToVenues,
	filterCheckinsByCategory,
	filterCheckinsByLocation,
} from '../src/js/utils/foursquare.js'


/*
	IMPORTANT
	---------
	To run tests, update package.json by adding: "type": "module", and then run:
	npm run test
*/


function t(str, a, b) {
	let result = 'FAIL';

	if (a == b) {
		console.log(`PASS - ${str}`);
	} else {
		console.log(`---`);
		console.log(`FAIL - ${str}`);
		console.log(`Expected ${a} to equal ${b}`);
		console.log(`---`);
	}

}

// -- SETUP --
let checkinsCount = checkins.length;


let tCheckins;

// ----------------
// checkinsToVenues
// ----------------

tCheckins = checkinsToVenues(checkins);
t('checkinsToVenues: reduces checkins to venues', tCheckins.length, 4)
t('checkinsToVenues: adds count prop', tCheckins[0].count, 3)

// ------------------------
// filterCheckinsByCategory
// ------------------------

tCheckins = filterCheckinsByCategory(checkins);
t('filterCheckinsByCategory: return all when categories set to Any', tCheckins.length, 6)


tCheckins = filterCheckinsByCategory(checkins, 'Nightlife');
t('filterCheckinsByCategory: filter checkins by category', tCheckins.length, 1)


tCheckins = filterCheckinsByCategory(checkins, 'Nightlife', 'Dive Bar');
t('filterCheckinsByCategory: filter checkins by subcategory', tCheckins.length, 1)

// ------------------------
// filterCheckinsByLocation
// ------------------------

tCheckins = filterCheckinsByLocation(checkins, LOCATION_ANY);
t('filterCheckinsByLocation: return all when location filter set to Any', tCheckins.length, 6)


tCheckins = filterCheckinsByLocation(checkins, { country: 'India' });
t('filterCheckinsByLocation: filter checkins by country', tCheckins.length, 1)

tCheckins = filterCheckinsByLocation(checkins, { country: 'United States', state: 'California' });
t('filterCheckinsByLocation: filter checkins by country & state', tCheckins.length, 4)

tCheckins = filterCheckinsByLocation(checkins, { country: 'United States', state: 'TX', city: 'Austin' });
t('filterCheckinsByLocation: filter checkins by countery, state, & city', tCheckins.length, 1)

