const fetch = require('node-fetch');
const fs = require('fs');
const { resolve } = require('path');

/*
------
STRAVA
------
 */
console.log('🕐 [Strava] Refreshing data');

// Read credentials
const credentialsFilePath = resolve(process.cwd(), '.private');
let credentials = JSON.parse(fs.readFileSync(credentialsFilePath), 'utf-8');

// Read existing activities
const activitiesFilePath = resolve(process.cwd(), 'src/data/strava-activities.json');
const editedRunsFilePath = resolve(process.cwd(), 'src/data/strava-activities-edited-runs.json');
let activities = JSON.parse(fs.readFileSync(activitiesFilePath, 'utf-8'))

// Auth tokens expire every 6 hours
// https://developers.strava.com/docs/authentication/#refreshingexpiredaccesstokens
async function refreshTokens() {
  const URL = `https://www.strava.com/api/v3/oauth/token?client_id=${credentials.strava.client_id}&client_secret=${credentials.strava.client_secret}&grant_type=refresh_token&refresh_token=${credentials.strava.refresh_token}`;
  const response = await fetch(URL, { method: 'POST' });
  const data = await response.json()
  console.log('   [Strava] API tokens refreshed');
  return data;
}

function saveTokens(credentials, newStravaTokens) {
  credentials.strava = {
    ...credentials.strava,
    ...newStravaTokens,
  }
  fs.writeFileSync(credentialsFilePath, JSON.stringify(credentials, null, 2));
}

async function fetchData(accessToken) {
  const response = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=200', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  const json = await response.json();

  // We fetch the last 200 activities from the Strava API. We then check our local activites data
  // and see what the id is for the most recent acitivity we have already saved. We slice the new
  // API data and just take the new activities that we don't have saved locally.
  let overlapIndex = json.findIndex(activity => activity.id == activities[0].id);
  let newActivities = json.slice(0, overlapIndex);
  let updatedActivities= newActivities.concat(activities);

  // Update the raw activities json file
  fs.writeFileSync(activitiesFilePath, JSON.stringify(updatedActivities, null, 2));
  console.log('   [Strava] API data loaded and saved');

  // Prep data for the blog post and save into a separate file.
  const runs = updatedActivities.filter(activity => activity.type === 'Run');
  const formattedRuns = formatRunData(runs);
  fs.writeFileSync(editedRunsFilePath, JSON.stringify(formattedRuns, null, 2));
  console.log('   [Strava] Edited Runs data saved');
  console.log('✅ [Strava] Data refreshed');
}

function formatRunData(runs) {
  let formattedRuns = [];
  runs.forEach((run) => {
    // Meters to miles
    let miles = run.distance * 0.000621371;

    // Distance to %
    let distancePercent = miles / 26.2;

    // Calc pace (min / mi)
    // ex. 7.75
    let pace = (run.moving_time / 60) / miles;

    // Format pace to time
    // 7.75 -> 7:45
    let paceFormattedSeconds = String(Math.floor(((pace * 60) % 60)));
    if (paceFormattedSeconds.length < 2) {
      paceFormattedSeconds = '0' + paceFormattedSeconds;
    }
    let paceFormatted = `${Math.floor(pace)}:${paceFormattedSeconds}`;

    formattedRuns.push({
      id: run.id,
      name: run.name,
      distance: miles.toFixed(1),
      distancePercent: distancePercent * 100,
      elevation: run.total_elevation_gain * 3.28084,
      pace,
      paceFormatted,
      date: new Date(run.start_date_local).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      year: new Date(run.start_date_local).getFullYear(),
      startDate: run.start_date_local,
    });

  });
  return formattedRuns;
}

async function main() {
  let newTokens = await refreshTokens();
  saveTokens(credentials, newTokens);

  fetchData(newTokens.access_token);
}

main();
