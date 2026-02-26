import { checkins } from './data/checkins.mjs'
import {
	CATEGORY_ANY,
	LOCATION_ANY,
	SUBCATEGORY_ANY,
	checkinsToVenues,
	filterByMetadata,
	filterByCategory,
	filterByLocation,
} from '../src/js/utils/foursquare.js'



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

function nl() {
	console.log('');
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

nl();

// ------------------------
// filterByCategory
// ------------------------

tCheckins = filterByCategory(checkins);
t('filterByCategory: return all when categories set to Any', tCheckins.length, 6);


tCheckins = filterByCategory(checkins, 'Nightlife');
t('filterByCategory: filter checkins by category', tCheckins.length, 1);


tCheckins = filterByCategory(checkins, 'Nightlife', 'Dive Bar');
t('filterByCategory: filter checkins by subcategory', tCheckins.length, 1);

nl();

// ------------------------
// filterByLocation
// ------------------------

tCheckins = filterByLocation(checkins, LOCATION_ANY);
t('filterByLocation: return all when location filter set to Any', tCheckins.length, 6)


tCheckins = filterByLocation(checkins, { country: 'India' });
t('filterByLocation: filter checkins by country', tCheckins.length, 1);

tCheckins = filterByLocation(checkins, { country: 'United States', state: 'California' });
t('filterByLocation: filter checkins by country & state', tCheckins.length, 4);

tCheckins = filterByLocation(checkins, { country: 'United States', state: 'TX', city: 'Austin' });
t('filterByLocation: filter checkins by countery, state, & city', tCheckins.length, 1);

nl();

// ----------------------
// filterByMetadata
// ----------------------

tCheckins = filterByMetadata(checkins);
t('filterByMetadata: return all when no metadata passed in', tCheckins.length, 6);

tCheckins = filterByMetadata(checkins, {comments: true});
t('filterByMetadata: filter on a venue metadata attribute', tCheckins.length, 4);

tCheckins = filterByMetadata(checkins, {comments: true, goToSpot: true});
t('filterByMetadata: filter on multiple venue metadata attributes', tCheckins.length, 3);

nl();

