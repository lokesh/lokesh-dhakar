---
date: 2018-10-03
layout: page.njk
---


<section id="videos" class="videos">
    <vid
      v-for="(video, index) in videos"
      :video="video"
    />
</section>


<script type="text/x-template" id="tpl-vid">
  <article class="vid">
    <a :href="`https://www.youtube.com/watch?v=${video.id}`">
      <div
        ref="thumb"
        class="thumb"
        :style="`
          background-image: url(/media/inspiration/${filename});
          background-size: cover;
          background-position: ${imgNum * 240}px 0;
        `"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
        @mousemove="onMousemove"
      />
    </a>
    <div class="details">
      <div class="duration">{{ video.duration }}</div>
      <a :href="`https://www.youtube.com/watch?v=${video.id}`">
        <h2 class="title">
          {{ video.customTitle }}
        </h2>
      </a>
    </div>
  </article>
</script>

<style>

:root {
  --vid-width: 240px;
  --vid-height: 135px;
}

.videos {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--vid-width));
  grid-column-gap: 24px;
  grid-row-gap: 24px;
}

.vid {
  width: var(--vid-width);
}

.thumb {
  display: block;
  width: var(--vid-width);
  height: var(--vid-height);
  margin-bottom: 4px;
  border-radius: var(--border-radius);
}

.duration {
  float: right;
  margin-left: 4px;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 14px;
}

.title {
  margin: 0;
  color: var(--color);
  font-size: 14px;
}

.author {
  margin: 0;
  color: var(--muted-color);
  font-size: 14px;    
}
</style>

<script src="/js/axios.min.js"></script>
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
    filename() {
      return (this.isScrubbing) ? `${this.video.filename}-sprite.jpg` : `${this.video.filename}.jpg`;
    },
    imgNum() {
      if (this.isScrubbing) {
        let scrubPercent = (this.mouseX - this.thumbX) / this.thumbWidth;
        return (Math.floor(
          (scrubPercent * 100) /
          (100 / previewFrameCount) + 1)
        );
      } else {
        return 0;
      }
    },
    imgCount() {
      return previewFrameCount;
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

new Vue({
  el: '#videos',
  
  data() {
    return {
      videos: [],
    };
  },
  
  created() {
    axios.get('/data/inspiration-videos.json')
    .then((response) => {
      this.videos = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  },
});
</script>
