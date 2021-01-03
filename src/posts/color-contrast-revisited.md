---
title: "WCAG color contrast revisited"
date: 2020-11-23
layout: post.njk
pageWidth: "full"
draft: true
---

<!--
WCAG AA & AAA
APCA - Ratings 4, 3, 2, 1, 0

Essentially there are five levels, including 0 (fail) with level four being the best outcome. In the scoring model, the scores for different aspects of a site get aggregated and averaged to determine overall site score.

- Rating 4  All reading text meets or exceeds the values on the APCA lookup table
- Rating 3  The lowest APCA value is 1-4% below the values on the APCA lookup table
- Rating 2  The lowest APCA value is 5-9% below the values on the APCA lookup table
- Rating 1  The lowest APCA value is 10-15% below the values on the APCA lookup table
- Rating 0  Any failures on the Advanced Perceptual Contrast Algorithm (APCA) lookup table or the lowest APCA value is more than 15% below the values on the APCA lookup table

WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and user interface components (such as form input borders). WCAG Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.


"APCA 80 is similar to WCAG 4.5:1 for a site using light or white backgrounds with dark text.
However, APCA provides more granular guidance on the critical properties of font weight and size, which are inseparable from luminance contrast as part of the overall contrast perception and readability factors." - https://github.com/Myndex/SAPC-APCA/issues/3#issuecomment-711072379
-->

<template id="preview">
  <div
    class="preview"
    :style="cellStyles"
  >
    <div
      class="preview-sample"
      :style="styles"
    >
      Aa
    </div>
    <div class="preview-contrast">
      <div
        class="contrast-label"
        :style="apcaStyles"
      >
        APCA {{ apcaRating }}
      </div>
      <div
        class="contrast-label"
        :class="{'pass': wcagRating.startsWith('A')}"
      >
        WCAG {{ wcagRating }}
      </div>

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

    <h3>WCAG: {{ wcag }}<br />
    APCA: {{ apca }} L<sup>c</sup></h3>

    <color-picker
      v-model="color"
    ></color-picker>
    <color-picker
      v-model="backgroundColor"
    ></color-picker>

    <div class="table-wrapper">
      <table class="contrast-table left-align top-align separated-cells">
        <thead v-if="false">
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
            <td v-if="false">{{ fontSize }}px</td>
            <td
              v-for="(weightMin, i) in contrastMinsByWeights"
              class="table-preview-cell"
            >
              <preview
                :color="color"
                :background-color="backgroundColor"
                :font-size="fontSize"
                :font-weight="weightFromIndex(i)"
                :wcag="wcag"
                :apca-min="weightMin"
                :apca-rating="apcaRating(weightMin)"
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
.contrast-table td {
  border-radius: var(--radius-lg);
}

.t-col-head {
  /*background: yellow;*/
}

.table-preview-cell {
  padding: 0;
}

/*td, {
  max-width: 64px;
  overflow: hidden;
}
*/
.preview {
  padding: var(--gutter);
  border-radius: var(--radius-lg);
}

.preview-sample {
  margin-bottom: var(--gutter);
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: auto;
}

.contrast-label {
  display: inline-block;
  padding: 2px 4px;
  background: var(--orange);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-family: var(--monospace);
  font-weight: bold;
  margin-bottom: 4px;
}

.contrast-label.pass {
  background: var(--green);
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
import { MODE_WCAG, MODE_APCA, getContrast } from '/js/utils/color.js';
import Vue from '/js/vue.esm.browser.js';

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

let APCA_TABLE = {
  16: [null, null, 130, 120, 100, 80, 75, 70, 70],
  24: [null, 120, 100, 80, 75, 70, 60, 58, 55],
  36: [null, 100, 80, 70, 60, 58, 55, 50, 45],
  72: [100, 75, 60, 55, 50, 45, 40, 40, 40],
}

let WCAG_TABLE_AA = {
  16: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 3, 3, 3],
  24: [3, 3, 3, 3, 3, 3, 3, 3, 3],
  36: [3, 3, 3, 3, 3, 3, 3, 3, 3],
  72: [3, 3, 3, 3, 3, 3, 3, 3, 3],
}

let WCAG_TABLE_AAA = {
  16: [7, 7, 7, 7, 7, 7, 4.5, 4.5, 4.5],
  24: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
  36: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
  72: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
}

function editTable(table) {
  let newObj = {};
  for (const [key, value] of Object.entries(table)) {
    value.forEach((val, i) => {
      if (i === 0){
         newObj[key] = [];
      } 
      if (i % 2 === 0) {
         newObj[key].push(val);
      }
    })
  }
  return newObj;
}

APCA_TABLE = editTable(APCA_TABLE);
WCAG_TABLE_AA = editTable(WCAG_TABLE_AA);
WCAG_TABLE_AAA = editTable(WCAG_TABLE_AAA);

Vue.component('preview', {
  template: '#preview',
  props: {
    color: String,
    backgroundColor: String,
    fontSize: [String, Number],
    fontWeight: Number,
    wcag: Number,
    apcaMin: Number,
    apcaRating: Number,
  },

  data() {
    return {
      APCA_TABLE,
      WCAG_TABLE_AA,
      WCAG_TABLE_AAA,
    };
  },

  computed: {
    styles() {
      return {
        color: this.color,
        fontSize: `${this.fontSize}px`,
        fontWeight: this.fontWeight,
      };
    },

    cellStyles() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },

    apcaStyles() {
      let bg;
      if (this.apcaRating === 4) {
        bg = 'var(--green)';
      } else if (this.apcaRating >= 1) {
        bg = 'var(--yellow)';
      } else {
        bg = 'var(--orange)';
      }
      return {
        backgroundColor: bg,
      };
    },

    wcagRating() {
      const aaaMin = WCAG_TABLE_AAA[this.fontSize][this.fontWeight / 100 - 1];
      const aaMin = WCAG_TABLE_AA[this.fontSize][this.fontWeight / 100 - 1];
      if (this.wcag >= aaaMin) {
        return 'AAA';
      } else if (this.wcag >= aaMin) {
        return 'AA';
      }
      return '✘'
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
      WCAG_TABLE_AA,
      WCAG_TABLE_AAA,
      color: '#333333', //'#ffffff',
      backgroundColor: '#f3f3f3', // '#319EFA',
    };
  },

  computed: {
    wcag() {
      return getContrast(this.color, this.backgroundColor, MODE_WCAG);
    },
    apca() {
      return getContrast(this.color, this.backgroundColor, MODE_APCA);
    },
  },

  methods: {
    /* Using an `*` to do inline math was causing the Markdown parser to think
    the Vue template was trying to add emphasis to text with * and it parsed 
    that block. */
    weightFromIndex(i) {
      return (i + 1) * 100;
    },

    apcaRating(weightMin) {
      const contrastPercentage = this.apca / weightMin;
      if (!weightMin) {
        return '✘';
      } else if (contrastPercentage >= 1) {
        return 4;
      } else if (contrastPercentage >= 0.96) {
        return 3;
      } else if (contrastPercentage >= 0.91) {
        return 2;
      } else if (contrastPercentage >= 0.85) {
        return 1;
      }
      return '✘';
    },
  },

  mounted() {

  },
})   
</script>
