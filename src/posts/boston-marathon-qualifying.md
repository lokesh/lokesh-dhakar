---
title: "Boston Marathon qualifying"
date: 2018-07-29
layout: post.njk
---

## Tracking my progress

In the chart below, you can see all my recent runs. The goal is to complete a marathon distance (26.2mi) run at a 7:15/mi pace.

<div class="center">
  
  <div class="legend">
    <div class="color-info">
        <div class="swatch" style="background-color: #58DF82"></div>7:15/mi or faster pace
    </div>
    <div class="color-info">
      <div class="swatch" style="background-color: #F6DC58"></div>7:15/mi to 8:00/mi
    </div>
    <div class="color-info">
      <div class="swatch" style="background-color: #FCA469"></div>8:00/mi or slower
    </div>
  </div>

  <div id="runs">
      <div v-for="(run, index) in runs">
        <div class="run">
          <div class="run-name">
            <a :href="`//strava.com/activities/${run.id}`">{{ run.date }} • {{ run.name }}</a>
          </div>
          <div class="run-metrics">
            {{ run.paceFormatted }}/mi • {{ run.distance }}mi
          </div>
          <div class="distance-bar" :style="`
            width: ${run.distancePercent}%;
            background-color: ${getPaceColor(run.pace)};
          `">
          </div>
        </div>
      </div>
  </div>
</div>


## Backstory

In the back-of-my-mind, I've always thought I'd like to run a marathon someday. And in the past couple years, I've started to get into a regular cadence with my morning runs. So this seemed like a good time to start thinking about those back-of-the-mind marathon plans.

**Which marathon to run?** Though I lived in Boston previously, the Boston Marathon never held any special meaning to me. I knew of it, but not about it. So what was the reason for picking Boston? My family lives just one hour North in New Hampshire, and this would give me another chance to visit them.

**Learning about qualifying.** For a race, I assumed you would go to a website to register, pay a fee, and then show up at the race. I was unaware that you had to qualify. I was also unaware about how difficult qualifying would be.

For my age group, 35-39 years old, qualifying for the Boston Marathon requires a sub 3hr 10min time. This means
keeping a 7:15/mi pace for 26.2 miles. 

I'm not there yet. A little slow. And having some knee and hip pain when I ramp up the miles. But I'll get there. And having this lofty goal has helped me focus.


<style>
.legend {
  padding-bottom: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid #ddd;
}

.color-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
}

.swatch {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 4px;
}

.run {
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #EDEDED;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.run a {
  color: #000;
}

.run-name {
  z-index: 1;
  opacity: 0.8;
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.run-metrics {
  z-index: 1;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  opacity: 0.8;
  padding: 8px;
  text-align: right;
  display: flex;
  align-items: center;

}

.distance-bar {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<script src="/js/axios.min.js"></script>
<script src="/js/vue.min.js"></script>

<script>

var app = new Vue({
  el: '#runs',
  
  data() {
    return {
      runs: [],
    };
  },
  
  created() {
    axios.get('/data/strava-activities-edited-runs.json')
    .then((response) => {
      this.runs = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  },

  methods: {
    getPaceColor(pace) {
      let paceColor;
      if (pace > 8) {
        paceColor = '#FCA469';
      } else if (pace > 7.25) {
        paceColor = '#F6DC58';
      } else {
        paceColor = '#58DF82';
      }
      return paceColor;
    },
  }
});
</script>

