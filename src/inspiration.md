---
title: "Inspiration"
date: 2018-10-03
layout: page.njk
pageWidth: "full"
---

<h1 class="page-title">Inspiration</h1>

Videos of creatives at work. With a focus on process, not backstory. Simple shooting and editing preferred.


<section id="videos">
    <div class="sort-options">
      Sort by:
      <button
        class="sort-option first"
        :class="{'active': sortedBy === 'date'}"
        @click="sortBy('date')"
      >
        Date added
      </button><!-- Keep comments here to remove space between buttons.
      --><button
        class="sort-option last"
        :class="{'active': sortedBy === 'duration'}"
        @click="sortBy('duration')"
      >
        Duration
      </button>
    </div>

    <div class="videos">
      <vid
        v-for="(video, index) in videos"
        :video="video"
      />
    </div>
</section>

<script type="text/x-template" id="tpl-vid">
  <article class="vid">
    <a :href="`https://www.youtube.com/watch?v=${video.id}`">
      <div
        ref="thumb"
        class="thumb"
        :style="`background-image: url(/media/inspiration/${this.video.filename}.jpg)`""
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
        @mousemove="onMousemove"
      >
        <div class="duration">{{ video.duration }}</div>
        <div
          v-if="isScrubbing"
          class="thumb-preview"
          :style="`
            background-image: url(/media/inspiration/${this.video.filename}-sprite.jpg);
            background-position: ${imgNum * 300}px 0;
          `"
        />
      </div>
    </a>
    <div class="details">
      <a :href="`https://www.youtube.com/watch?v=${video.id}`">
        <div class="title">
          {{ video.customTitle }}
        </div>
      </a>
    </div>
  </article>
</script>

<style>

:root {
  --vid-width: 300px;
  --vid-height: 168.75px;
}

.intro {
  margin-bottom: 16px;
}

.vid {
  margin-bottom: 32px;
}

.thumb {
  position: relative;
  display: block;
  height: 300px;
  margin-bottom: 8px;
  margin-left: calc(var(--gutter) * -1);
  margin-right: calc(var(--gutter) * -1);
  background-size: cover;
}

/* Hide scurbbable previews on mobile */
.thumb-preview {
  display: none;
  width: var(--vid-width);
  height: var(--vid-height);
  border-radius: var(--radius-lg);
  background-size: cover;
}

@media (min-width: 800px) {
  .thumb-preview {
    display: block;
  }
}

.details a {
  color: var(--color);
}

.duration {
  position: absolute;
  right: 4px;
  bottom: 4px;
  padding: 1px 4px 2px;
  color: white;
  background-color: #000;
  border-radius: var(--radius);
}

.title {
  margin: 0;
  text-transform: none;
}

.sort-options {
  margin-bottom: var(--block-bottom);
}

.sort-option {
  padding: 0.2em 0.6em 0.3em;
  margin: 0;
  border: 1px solid var(--color);
  border-radius: var(--radius);
  background-color: transparent;
  text-decoration: none; /* Removes underlines on <a> buttons */
  cursor: pointer;
  appearance: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.sort-option.first {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.sort-option.last {
  position: relative;
  left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.sort-option:hover,
.sort-option:focus {
  background-color: var(--hover-bg-color);
}

.sort-option:active {
  color: white;
  background-color: var(--color);
}

.sort-option.active,
.sort-option.active:focus {
  color: white;
  background-color: var(--color);
}


@media (min-width: 800px) {
  .intro {
    margin-bottom: 0;
  }

  .page-desc {
    margin-top: 0;
  }

  .sort-option {
    padding: 4px 8px;
  }

  .videos {
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--vid-width));
    grid-column-gap: 24px;
    grid-row-gap: 24px;
  }

  .vid {
    margin-bottom: 16px;
  }

  .thumb {
    width: var(--vid-width);
    height: var(--vid-height);
    border-radius: var(--radius-lg);
    margin-left: 0;
    margin-right: 0;
  }
}
</style>

<script src="/js/vue.min.js"></script>

<script>
const previewFrameCount = 20;

Vue.component('vid', {
  template: '#tpl-vid',

  props: {
    video: Object,
  },

  data() {
    return {
      frameQueued: false,

      isScrubbing: false,
      thumbX: null,
      thumbWidth: null,
      mouseX: null,
      mouseThumbX: null,
    };
  },

  computed: {
    imgNum() {
      if (this.isScrubbing) {
        let scrubPercent = (this.mouseX - this.thumbX) / this.thumbWidth;
        return (Math.floor(
          (scrubPercent * 100) /
          (100 / previewFrameCount) + 1)
        );
      } else {
        return 1;
      }
    },
  },

  mounted() {
    this.saveThumbDims();
  },

  methods: {
    // Save thumbnail x position and width to data obj
    saveThumbDims() {
      const domRect = this.$refs.thumb.getBoundingClientRect();
      this.thumbX = domRect.x;
      this.thumbWidth = domRect.width;
    },
    onMouseenter(e) {
      this.saveThumbDims();
      this.mouseX = e.pageX;
      this.isScrubbing = true;
    },
    onMouseleave(e) {
      this.isScrubbing = false;
    },
    onMousemove(e) {
      if (!this.frameQueued) {
        this.frameQueued = true;
        requestAnimationFrame(this.updateMouseX.bind(this,e))
      }
    },
    updateMouseX(e) {
      this.frameQueued = false;
      this.mouseX = e.pageX;
    }
  },

});

function strToSeconds(str) {
  let seconds = 0;
  const splits = str.split(':');
  const splitsLen = splits.length;
  seconds = parseInt(splits[splitsLen - 1]);
  // Minutes
  if (splitsLen >= 2) {
    seconds += parseInt(splits[splitsLen - 2], 10) * 60;
  }
  // Hours
  if (splitsLen >= 3) {
    seconds += parseInt(splits[splitsLen - 3], 10) * 3600;
  }
  return seconds;
}

new Vue({
  el: '#videos',

  data() {
    return {
      videos: [],
      sortedBy: 'date',
    };
  },

  watch: {
    sortedBy(newVal) {
      if (newVal === 'date') {
        this.videos.sort((a, b) => {
          return (new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime() ? -1 : 1);
        })
      } else if (newVal === 'duration') {
        this.videos.sort((a, b) => {
          return (strToSeconds(b.duration) > strToSeconds(a.duration) ? -1 : 1);
        })
      }
    },
  },

  mounted() {
    fetch('/data/inspiration-videos.json')
      .then(res => res.json())
      .then(data => {
        this.videos = data;
      })
      .catch((error) => {
        console.log(error);
      })
  },

  methods: {
    sortBy(field) {
      this.sortedBy = field;
    },
  }
});
</script>
