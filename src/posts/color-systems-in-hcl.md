---
title: "Design Systems: Exploring HCL color space"
date: 2019-03-09
layout: post.njk
---

<b>This post is a work-in-progress.</b>

<!-- However, their luminance variation does not match the way humans perceive color.
      Perceptually uniform color spaces outperform RFB in cases such as high noise environments. The
      Lab color space does correspond to the three channels of human perceptions, but it has poor
      hue constancy, especially in the blue range. hcl -->

<div
  id="app"
  :class="{'hide-labels': !showLabels}"
>


  <section class="app-controls">
    Hues (Columns): <input type="range" min="1" max="20" step="1" v-model.number="hues">{{ hues }}<br>
    Steps (Rows): <input type="range" min="1" max="20" step="1" v-model.number="steps">{{ steps }}<br>
    Start Chroma: <input type="range" min="1" max="150" v-model.number="startChroma">{{ startChroma }}<br>
    End Chroma: <input type="range" min="1" max="150" v-model.number="endChroma">{{ endChroma }}<br>
    Start luminance: <input type="range" min="1" max="150" v-model.number="startLuma"> {{ startLuma }} <br>
    End luminance: <input type="range" min="1" max="150" v-model.number="endLuma">{{ endLuma }}<br>
    <label class="checkbox-label">
      Show swatch labels: <input type="checkbox" v-model="showLabels" class="checkbox" /><br>
    </label>
    <label class="checkbox-label">
      Dark mode: <input type="checkbox" v-model="darkMode" class="checkbox" /><br>
    </label>
  </section>
  <br>

  <section>
    <div class="palettes">
      <palette
        class="palette"
        :steps="steps"
        :start-chroma="0"
        :end-chroma="0"
        :start-luma="startLuma"
        :end-luma="endLuma"
      >
      </palette>

      <palette
        v-for="n in hues"
        class="palette"
        :hue="((n - 1) / hues) * 360"
        :steps="steps"
        :start-chroma="startChroma"
        :end-chroma="endChroma"
        :start-luma="startLuma"
        :end-luma="endLuma"
      >
      </palette>
    </div>
  </section>


  <h2>HSL</h2>

  <section class="notices">

    <notice
      v-for="n in 8"
      :style="`background: hsl(${(n - 1) * 40}, 100%, 90%)`"
    >
      HCL is designed to have characteristics of oth culinrical transslations of the
      RGB color space, asuch as HSL and HSC, and the Lab color space. hsl

    </notice>
  </section>

  <h2>HCL</h2>

  <section class="notices">
    <notice
      v-for="n in 8"
      :style="`background: ${getHCL(n)}`"
    >
      The HSL and HSC color spaces ar emore intuitive translations of the RGB color space, because
      they provide a single hue number. hcl
    </notice>
  </section>

  <p>HSL vs HCL. Hue adjustments maintain more consistent perceptual lightness with HCL.</p>
</div>


<script type="text/x-template" id="tpl-swatch">
  <div
    class="swatch"
    :class="{
      'clipped': clipped,
      'not-compliant': !aaCompliant
    }"
    :style="`
      background: ${backgroundColor};
      color: ${color}
    `"
  >
    <div class="swatch-label">{{ name }}</div>
    <div class="swatch-wcag" v-if="!aaCompliant">
      WCAG {{ Math.round(wcag * 100) / 100 }}
    </div>
  </div>
</script>

<script type="text/x-template" id="tpl-palette">
  <div>
    <swatch
      v-for="step in steps"
      :h="hue"
      :c="startChroma + ((endChroma - startChroma)  * ((step - 1) / (steps - 1)))"
      :l="startLuma + ((endLuma - startLuma) * ((step - 1) / (steps - 1)))"
    >
    </swatch>
  </div>
</script>


<script type="text/x-template" id="tpl-notice">
  <div class="notice">
    <slot />
  </div>
</script>


<script src="/js/vue.min.js"></script>
<script src="/js/chroma.min.js"></script>

<script>
Vue.component('notice', {
  template: '#tpl-notice',
});


Vue.component('swatch', {
  template: '#tpl-swatch',
  props: {
    h: { type: Number, required: true },
    c: { type: Number, required: true },
    l: { type: Number, required: true },
  },
  data() {
    return {
      chromaVal: null,
      clipped: false,
    };
  },
  computed: {
    color() {
      return (this.l < 50) ? '#ffffff' : '#000000';
    },
    backgroundColor() {
      let c = chroma.hcl(this.h, this.c, this.l);
      // this.superClipped = c._rgb._unclipped.some((val) => val > 500 || val < -500);
      this.clipped =  c.clipped();
      return c;
    },
    name() {
      return `C:${Math.round(this.c)} L:${Math.round(this.l)}`;
    },
    wcag() {
        return chroma.contrast(this.color, this.backgroundColor);
    },
    aaCompliant() {
      return this.wcag >= 4.51;
    }

  },

});

Vue.component('palette', {
  template: '#tpl-palette',
  props: {
    steps: { type: Number, default: 10 },
    hue: { type: Number, default: 0 },
    startChroma: { type: Number, default: 60 },
    endChroma: { type: Number, default: 60 },
    startLuma: { type: Number, default: 20 },
    endLuma: { type: Number,  default: 120 },
  },
});

new Vue({
  el: '#app',
  data() {
    return {
      darkMode: false,
      showLabels: false,

      hues: 6,
      steps: 10,
      startChroma: 30,
      endChroma: 120,
      startLuma: 90,
      endLuma: 20,
    };
  },

  methods: {
    getHCL(n) {
      let c = chroma.hcl(((n - 1) * 40), 20, 90);
      return c;
    },
  }
});
</script>

<link rel="stylesheet" href="/css/forms.css">

<style>
.app-controls {
  font-family: var(--monospace);
  font-size: 13px;
}

.palettes {
  display: flex;
  flex-wrap: wrap;
  /* background: black;
  padding: 16px; */
}

.palette {
  margin: 0 16px 16px 0;
}

.swatch {
  position: relative;
  width: 6rem;
  height: 2rem;
  padding: 8px;
  border-radius: var(--border-radius);
  font-size: 11px;
  font-family: var(--monospace);
}

.hide-labels .swatch-label,
.hide-labels .swatch-wcag {
  display: none;
}

.not-compliant::after {
  position: absolute;
  content: 'AA';
  right: 8px;
  top: calc(50% - 5px);
  opacity: 0.85;
  padding: 0 2px;
  color: black;
  background: #fff;
  border-radius: 2px;
  text-decoration: line-through;
}
/* .clipped {
  opacity: 0.2;
} */

.notices {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.notice {
  width: 18rem;
  font-size: 0.75rem;
  padding: 16px;
  margin: 0 16px 16px 0;
  border-radius: 4px;
}
</style>
