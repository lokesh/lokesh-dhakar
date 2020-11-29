---
title: "WCAG color contrast revisisted"
date: 2020-11-23
layout: post.njk
pageWidth: "full"
---

<h2>Test</h2>



<template id="preview">
  <div
    class="preview"
  >
    <div :style="styles">
      Aa
    </div>
    <div class="preview-contrast">
      120.1 APCA<br />
      0.8
    </div>
  </div>
</template>

<template id="color-picker">
  <div class="color-picker-wrapper">
    <input
      type="color"
      class="color-picker"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    {{ value }}
  </div>
</template>


<div id="app">
  <div>
    <!-- <input type="color" id="head" name="head" value="#e66465" /> -->
    <color-picker
      v-model="color"
    ></color-picker>
    <color-picker
      v-model="backgroundColor"
    ></color-picker>

    <div class="table-wrapper">
      <table class="left-align top-align">
        <thead>
          <tr>
            <th></th>
            <th 
              v-for="(contrastMinsByWeights, i) in APCA_TABLE[16]"
              class="t-col-head"
            >
              {{ (i + 1) * 100 }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contrastMinsByWeights, fontSize) in APCA_TABLE">
            <td>{{ fontSize }}px</td>
            <td v-for="(weightMin, i) in contrastMinsByWeights">
              <preview
                :color="color"
                :background-color="backgroundColor"
                :font-size="fontSize"
                :font-weight="weightFromIndex(i)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<link rel="stylesheet" href="/css/table.css" />
<link rel="stylesheet" href="/css/forms.css" />

<style>
.t-col-head {
  /*background: yellow;*/
}

/*td, {
  max-width: 64px;
  overflow: hidden;
}
*/
.preview {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
}

.preview-contrast {
  font-size: 11px;
  font-weight: 600;
} 

/* COLOR PICKER ------------------------------------------------------------- */

input[type="color"] {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: var(--form-control-height);
  height: var(--form-control-height);
  border: 1px solid var(--border-color-light);
  background: none;
  cursor: pointer;
}
</style>


<script type="module">
import { getContrast } from '/js/utils/color.js';
import Vue from '/js/vue.esm.browser.js';
// import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

// import { getContrast } from '/js/color.js';
  // console.log(getContrast);

/**
 * Keys are font sizes in pixels. Values are arrays with 9 values representing 
 * the recommending minimum contrast percentage across font weights spanning 
 * from 100 to 900.
 *
 * ex. 48: [120, 90, 75, ...]
 * 
 * Text rendered at 48px with a...
 * - font weight of 100 should have a contrast % of 120%
 * - font weight of 200 should have a contrast % of 90%
 * - and so on
 */

const APCA_TABLE = {
  16: [null, null, 130, 120, 100, 80, 75, 70, 70],
  24: [null, 120, 100, 80, 75, 70, 60, 58, 55],
  36: [null, 100, 80, 70, 60, 58, 55, 50, 45],
  72: [100, 75, 60, 55, 50, 45, 40, 40, 40],
}


Vue.component('preview', {
  template: '#preview',
  props: {
    color: String,
    backgroundColor: String,
    fontSize: [String, Number],
    fontWeight: Number,
  },

  computed: {
    styles() {
      return {
        color: this.color,
        backgroundColor: this.backgroundColor,
        fontSize: `${this.fontSize}px`,
        fontWeight: this.fontWeight,
      };
    },
  },
});


Vue.component('color-picker', {
  template: '#color-picker',  
  props: {
    value: String,
  },
});


new Vue({
  el: '#app',

  data() {
    return {
      APCA_TABLE,
      color: '#123456',
      backgroundColor: '#eeeeee',
    };
  },

  methods: {
    /* Using an `*` to do inline math was causing the Markdown parser to think
    the Vue tempalte was trying to add emphasis to text with * and it parsed 
    that block. */
    weightFromIndex(i) {
      return (i + 1) * 100;
    },
  },

  mounted() {

  },
})   
</script>
