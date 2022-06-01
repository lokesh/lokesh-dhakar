import { checkins } from './data/checkins.js'
import { checkinsToVenues } from '../src/js/utils/foursquare.js'


function t(str, a, b) {
	let result = 'FAIL';

	if (a == b) {
		console.log(`PASS - ${str}`);
	} else {
		console.log(`FAIL - ${str}`);
		console.log(`Expected ${a} to equal ${b}`);
	}

}


let tCheckins = checkinsToVenues(checkins);

t('checkinsToVenues() reduces checkins to venues', tCheckins.length, 3)
t('checkinsToVenues() adds count prop', tCheckins[0].count, 3)





