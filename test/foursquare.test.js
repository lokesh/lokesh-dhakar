import { checkins } from './data/checkins.js'
import {
	CATEGORY_ANY,
	SUBCATEGORY_ANY,
	checkinsToVenues,
	filterCheckinsByCategory,
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

// -- SETUP --
let checkinsCount = checkins.length;


let tCheckins;

// ----------------
// checkinsToVenues
// ----------------

tCheckins = checkinsToVenues(checkins);
t('checkinsToVenues: reduces checkins to venues', tCheckins.length, 3)
t('checkinsToVenues: adds count prop', tCheckins[0].count, 3)

// ------------------------
// filterCheckinsByCategory
// ------------------------

tCheckins = filterCheckinsByCategory(checkins);
t('filterCheckinsByCategory: return all when categories set to Any', tCheckins.length, 5)


tCheckins = filterCheckinsByCategory(checkins, 'Nightlife');
t('filterCheckinsByCategory: filter checkins by category', tCheckins.length, 2)


tCheckins = filterCheckinsByCategory(checkins, 'Nightlife', 'Dive Bar');
t('filterCheckinsByCategory: filter checkins by subcategory', tCheckins.length, 1)

