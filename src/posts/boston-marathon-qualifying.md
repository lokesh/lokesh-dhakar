---
title: "Boston Marathon qualifying"
date: 2018-09-03
layout: post.njk
---

## Tracking my progress

In the chart below, you can see all my recent runs. The goal is to complete a marathon distance (26.2mi) run at a 7:15/mi pace.
  
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

<div class="center center--960">
  <div id="runs" class="runs">
    <div class="distance-goal">26.2mi</div>
    <div v-for="(run, index) in flatRuns">
      <h3 v-if="index > 0 && run.year !== flatRuns[index - 1].year">
        {{ run.year }}
      </h3>

      <div 
        v-if="hasComment(run.id)"
        class="comment
      ">
        <div class="comment-icon">📝</div>
        <div class="comment-text" v-html="comments[run.id]"></div>
      </div>
      <transition
        appear
        appear-class="slide-start"
        appear-to-class="slide-end"
      >
        <div class="run" :style="getTransition(index)">
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
      </transition>
    </div>
  </div>

</div>

## Backstory

In the back-of-my-mind, I've always thought I'd like to run a marathon someday. And in the past couple years, I've started to get into a regular cadence with my morning runs. So this seemed like a good time to start thinking about those back-of-the-mind marathon plans.

**Which marathon to run?** Though I lived in Boston previously, the Boston Marathon never held any special meaning to me. I knew of it, but not about it. So what was the reason for picking Boston? My family lives just one hour North in New Hampshire, and this would give me another chance to visit them.

**Learning about qualifying.** For a race, I assumed you would register on a website, pay a fee, and then show up at the race. I was unaware that you had to qualify. I was also unaware about how difficult qualifying would be.

For my age group, 35-39 years old, qualifying for the Boston Marathon requires a sub 3hr 10min time. This means
keeping a 7:15/mi pace for 26.2 miles. 

I'm not there yet. A little slow. And having some knee and hip pain when I ramp up the miles. But I'll get there. And having this lofty goal has helped me focus.

---

## 🛠 Behind the scenes

The data for my runs in this post are pulled from [Strava](//strava.com). I run a script manually thats hits the API, does some processing, and then saves the parsed data as JSON in a file.

- [Blog post source code](https://raw.githubusercontent.com/lokesh/lokesh-dhakar/master/src/posts/boston-marathon-qualifying.md)
- [Data fetching script](https://github.com/lokesh/lokesh-dhakar/blob/master/refresh-data.js#L8)
- [Processed data as JSON](https://github.com/lokesh/lokesh-dhakar/blob/master/src/data/strava-activities-edited-runs.json)



<style>
.slide-start {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-end {
  opacity: 1;
  transform: translateX(0);
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
  border-radius: 2px;
}

.runs {
  position: relative;
  min-height: 1200px;
  padding-top: 20px;
  margin-bottom: 36px;
  border-right: 2px solid #000;
}

.distance-goal {
  position: absolute;
  top: -18px;
  right: -2px;
  padding: 2px 0;
  width: 54px;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 800;
  background-color: #000;
  border-radius: 4px 0 0 4px;
}

.comment {
  display: flex;
  padding: 8px 8px 20px 8px;
  max-width: 32em;
}

.comment-icon {
  font-size: 24px;
  margin-right: 8px;
}

.comment-text {
  font-size: 13px;
  font-weight: 500;  
}

.comment-text em {
  font-style: normal;
  font-weight: 700;
}

.comment-text em::after {
  content: ' -';
}

.run {
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #EDEDED;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
  border-radius: 2px;
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
  border-radius: 2px 0 0 2px;
}
</style>

<script src="/js/axios.min.js"></script>
<script src="/js/vue.min.js"></script>

<script>

// ------
// CONFIG
// ------

// Hide any steep runs with avg elevation gain more than X ft per mile.
let MAX_ELEVATION_PER_MILE = 75;

// --------
// COMMENTS
// --------

var app = new Vue({
  el: '#runs',
  
  data() {
    return {
      runs: [],
      comments: {
        1830959635: `<em>Sep 21</em> Having some pain on the back of my left ankle. This
        started the day after a hard effort up a steep hill. The ankle pain goes in and out but 
        has been around for over a week now. I don't want to take any chances so I'll be pausing
        my running.`,
        1735738378: `<em>July 29</em> I attemped my first half-marathon, the SF Half. Unfortunately I had knee pain
          that started just a mile in. The likelihood of me finishing was slim, and injury high, 
          so I cut my losses after finishing five miles.
          <br><br>
          Over the next couple weeks I focused on strenghtening the muscles around 
          the IT Band. It seems to have worked as the knee pains have not come back.
          `
      }
    };
  },
  
  computed: {
    flatRuns() {
      return this.runs.filter(run => {
        return (run.elevation / run.distance) < MAX_ELEVATION_PER_MILE;
      })
    },
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
    getTransition(index) {
      return (index < 40) ? `transition: all 0.5s ${index * 0.05}s`: '';
    },
    hasComment(id) {
      return this.comments.hasOwnProperty(id);
    }
  }
});
</script>

