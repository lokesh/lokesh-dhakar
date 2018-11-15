---
date: 2018-10-03
layout: page.njk
---


<section id="videos">
    <vid
      v-for="(video, index) in videos"
      :video="video"
    />
</section>


<script type="text/x-template" id="tpl-vid">
  <article class="vid">
    <img
       ref="thumb"
       :href="`https://www.youtube.com/watch?v=${video.id}`"
       class="thumb"
       :src="`/media/inspiration/videos/${img}`"
       @mouseenter="onMouseenter"
       @mouseleave="onMouseleave"
       @mousemove="onMousemove"
    >
    </a>
    <div class="details">
      <div class="length">{{ video.length }}min</div>
      <h2 class="title">{{ video.customName }}</h2>

      <div v-if="debug">
        img: {{ img }}<br>
        isScrubbing: {{ isScrubbing }}<br>
        thumbX: {{ thumbX }}<br>
        thumbWidth: {{ thumbWidth }}<br>
        mouseX: {{ mouseX }}<br>
        mouseThumbX: {{ mouseThumbX }}<br>
      </div>
    </div>
  </article>
</script>

<style>

:root {
  /*
   320 x 200
   240 x 180
  */
  --vid-aspect-ratio: 1.75;
  --vid-width: 240px;
  --vid-height: calc( var(--vid-width) / var(--vid-aspect-ratio));
}

.vid {
  width: var(--vid-width);
  margin-bottom: 32px;
}

.thumb {
  display: block;
  width: var(--vid-width);
  height: var(--vid-height);
  margin-bottom: 4px;
  background-size: cover;
  border-radius: var(--border-radius);
}

.length {
  float: right;
  margin-left: 4px;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 14px;
}

.title {
  margin: 0;
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
      debug: false,
      isScrubbing: false,
      thumbX: null,
      thumbWidth: null,
      mouseX: null,
      mouseThumbX: null,
    };
  },

  //:style="`background-image: url(/media/inspiration/videos/${video.filename}.jpg)`"
  computed: {
    img() {
      if (this.isScrubbing) {
        let scrubPercent = (this.mouseX - this.thumbX) / this.thumbWidth;
        // 5 assumes we want to display 100 frames
        return this.video.filename + '-' + (Math.floor(
          (scrubPercent * 100) /
          (100 / previewFrameCount) + 1)) + '.jpg';
      } else {
        return this.video.filename + '.jpg';  
      }
    },
    imgCount() {
      return  previewFrameCount;
    },
  },

  mounted() {
    this.saveThumbDims();
    this.preloadPreviewImages();
  },
  
  methods: {
    preloadPreviewImages() {
      for (let i = 1; i <= 20; i++) {
        let foo = new Image();
        foo.src = `/media/inspiration/videos/${this.video.filename}-${i}.jpg`;
      }
    },

    // Save thumbnail x position and width to data obj
    saveThumbDims() {
      const domRect = this.$refs.thumb.getBoundingClientRect();
      this.thumbX = domRect.x;
      this.thumbWidth = domRect.width;
    },
    onMouseenter(e) {
      this.mouseX = e.pageX;
      this.isScrubbing = true;
    },
    onMouseleave(e) {
      this.isScrubbing = false;
    },
    onMousemove(e) {
      this.mouseX = e.pageX;
      this.saveThumbDims();
    },
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
