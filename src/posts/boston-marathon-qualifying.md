---
title: "Runs"
date: 2018-07-29
layout: post.njk
---

<div class="center">

  <div id="app">
    <table>
      <tr v-for="run in runs">
        <td style="width: 100px; text-align: right;">{{ run.date }}</td>
        <td style="width: 50px; text-align: right;">{{ run.distance }} mi</td>
        <td style="width: 80px; text-align: right;">{{ run.pace }} /mi</td>
        <td >{{ run.name }}</td>
      </tr>
  </table>

</div>


<style>
td {
  padding: 4px;
}
</style>

<script src="/js/axios.min.js"></script>
<script src="/js/vue.js"></script>

<script>

var app = new Vue({
  el: '#app',
  data() {
    return {
      runs: [],
    };
  },
  created() {
    axios.get('/data/strava-activities.json')
    .then((response) => {
      this.runs = this.parseStravaData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },

  // name:
  // start_date_local
  // distance
  // moving_time
  // elapsed_time
  // total_elevation_gain
  // type
  // suffer_score

  methods: {
    parseStravaData(activities) {
      const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
    

      let runs = [];
      for (const activity of activities) {
        if (activity.type === 'Run') {
          
          // Meters to miles
          let miles = activity.distance * 0.000621371;
          
          // Calc pace (min / mi)
          // ex. 7.75
          let pace = (activity.moving_time / 60) / miles;

          // Format pace to time
          // 7.75 -> 7:45
          let paceFormattedSeconds = String(Math.floor(((pace * 60) % 60)));
          if (paceFormattedSeconds.length < 2) {
            paceFormattedSeconds = '0' + paceFormattedSeconds;
          }
          let paceFormatted = `${Math.floor(pace)}:${paceFormattedSeconds}`;
          
          runs.push({
            name: activity.name,
            distance: miles.toFixed(1),
            pace: paceFormatted,
            date: new Date(activity.start_date_local).toLocaleDateString('en-US', dateFormat),
          });
        }
      }
      return runs;
    },
  },
})

</script>

