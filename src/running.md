---
title: "Running"
date: 2018-09-03
layout: page.njk
---

<div class="page-tag">Running</div>

<h1 class="page-title">Boston Marathon qualifying</h1>

<h2 class="page-subtitle">Tracking my progress</h2>

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

<div id="runs" class="runs">
  <div class="distance-goal">26.2mi</div>
  <div v-for="(run, index) in flatRuns">
    <transition
      appear
      appear-class="slide-start"
      appear-to-class="slide-end"
    >
      <div class="row" :style="getTransition(index)">
        <h3
          v-if="index === 0 || (index > 0 && run.year !== flatRuns[index - 1].year)"
          class="year"
        >
          {{ run.year }}
        </h3>
        <div
          v-if="hasComment(run.id)"
          class="comment"
          :class="`comment-${comments[run.id].type}`"
        >
          <div class="comment-icon"></div>
          <div class="comment-text" v-html="comments[run.id].text"></div>
        </div>
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
    </transition>
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

## Behind the scenes

The data for my runs in this post are pulled from [Strava](//strava.com). I run a script manually thats hits the API, does some processing, and then saves the parsed data as JSON in a file.

- [Blog post source code](https://raw.githubusercontent.com/lokesh/lokesh-dhakar/master/src/running.md)
- [Data fetching script](https://github.com/lokesh/lokesh-dhakar/blob/master/refresh-data.js#L8)
- [Processed data as JSON](https://github.com/lokesh/lokesh-dhakar/blob/master/src/data/strava-activities-edited-runs.json)



<style>
.page-title {
  margin-bottom: 4px;
}

.slide-start.row {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-end.row {
  opacity: 1;
  transform: translateX(0);
}

.color-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.swatch {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: var(--border-radius);
}

.runs {
  position: relative;
  min-height: 1200px;
  margin-bottom: 36px;
  border-right: 2px solid #000;
}

.distance-goal {
  position: absolute;
  top: -18px;
  right: -2px;
  padding: 2px 0;
  width: 5em;
  text-align: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  background-color: #000;
  border-radius: 4px 0 0 4px;
}

.comment {
  display: flex;
  padding: 8px 8px 20px 8px;
  max-width: 32em;
  text-align: center;
}

.comment-icon {
  font-size: 2rem;
  margin-right: 8px;
}

.comment-text {
  font-size: 0.8125rem;
  line-height: 1.4em;
}

.comment-text em {
  font-style: normal;
  font-weight: 600;
}

.comment-text em::after {
  content: ' -';
}

.comment-injury .comment-icon::after {
  content: '🤕';
}

.comment-injury  .comment-text {
  text-align: left;
}

.comment.comment-achievement,
.comment.comment-race {
  align-items: center;
  padding-top: 4px;
  padding-bottom: 12px;
}
.comment-achievement .comment-text,
.comment-race .comment-text {
  position: relative;
  top: -1px;
  font-weight: 600;
  font-size: 0.875rem;
}

.comment-achievement .comment-icon::after {
  content: '🏆';
}

.comment-race .comment-icon::after {
  content: '🏁';
}

.run {
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #EDEDED;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 12px;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.run a {
  color: #000;
}

.run-name {
  z-index: 1;
  opacity: 0.8;
  padding: 8px;
  line-height: 1.1em;
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
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}
</style>

<script src="/js/axios.min.js"></script>
<script src="/js/vue.min.js"></script>

<script>

// ------
// CONFIG
// ------

// Hide any steep runs with avg elevation gain more than X ft per mile.
let MAX_ELEVATION_PER_MILE = 100;

// --------
// COMMENTS
// --------

var app = new Vue({
  el: '#runs',

  data() {
    return {
      runs: [],
      comments: {
        1774076006: {
          type: 'achievement',
          text: 'First mile under 5:30'
        },
        1584701112: {
          type: 'race',
          text: 'Race • 2018 Bay to Breakers',
        },
        1798971397:{
          type: 'race',
          text: 'Race • 2018 Bridge to Bridge 5k'
        },
        1173566338: {
          type: 'race',
          text: 'Race • 2017 JP Morgan Corporate Challenge 5k'
        },
        657497518: {
          type: 'achievement',
          text: 'First mile under 6 minutes'
        },
        1830959635: {
          type: 'injury',
          text: `I'm having some pain in my left ankle which,
           started the day after a hard effort up a steep hill. The ankle pain goes in and out,
          but has lingered for over a week now. I'm pausing my running for a couple of weeks to
          recover.`,
        },
        1830959635: {
          type: 'achievement',
          text: `10 miles at 7:15/mi pace`,
        },
        1735738378: {
          type: 'injury',
          text: `I attemped my first half-marathon, the SF Half. Unfortunately I had knee pain
          that started just a mile in. The likelihood of me finishing was slim, and injury high,
          so I cut my losses after finishing five miles.`
        },
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
      } else if (pace > 7.27) {
        paceColor = '#F6DC58';
      } else {
        paceColor = '#58DF82';
      }
      return paceColor;
    },
    getTransition(index) {
      return (index < 40) ? `transition: all 0.5s ${(index + 5) * 0.05}s`: '';
    },
    hasComment(id) {
      return this.comments.hasOwnProperty(id);
    }
  }
});
</script>

