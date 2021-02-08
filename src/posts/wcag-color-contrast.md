---
title: "WCAG color contrast"
date: 2020-11-23
layout: post.njk
draft: true
---

(Article needs a hook. I could tease the 3.0 changes, have something interactive up here, or summarize what the post covers.)

-- IMG: examples of different levels of contrast --

## WCAG

**Web Content Accessibility Guidelines ([WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/))** are a set of recommendations for making web content accessible. The guidelines primarly focus on people with disabilities, but following these guidelines almost always makes the experience better for everyone.


**Who's behind WCAG?** The guidelines are published by the Web Accessibility Initiative ([WAI](https://www.w3.org/WAI/)) which is part of World Wide Web Consortium ([W3C](https://www.w3.org/)). 

**WCAG versions.** In this post, we'll look at the latest published version, 2.1, as well as the draft of 3.0 which brings big changes for color contrast.

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/) - Published Dec 2008
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/) - Published June 2018.
- [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/) - A work in progress, but the first public draft for 3.0 was shared Jan 2021.


## Contrast ratio

WCAG provides [step-by-step instructions](https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests) on how to calculate the contrast ratio from the text and background colors.

<details>
  <summary>See JS code</summary>
<pre><code class="prism language-js line-numbers">function luminance(color) {
  const { r, g, b } = color;
  const rgb = [r, g, b].map(val => {
    val = val / 255;
    return (val <= 0.03928)
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/**
 * @param  {Object} text color as {r, g, b}
 * @param  {Object} bg color as {r, g, b}
 * @return {Number} WCAG 2.1 contrast ratio
 */
function wcagContrast(textColor, bgColor) {
    const textLumi = luminance(textColor);
    const bgLumi = luminance(bgColor);
    const ratio = textLumi > bgLumi
      ? ((textLumi + 0.05) / (bgLumi + 0.05))
      : ((bgLumi + 0.05) / (textLumi + 0.05));
    return ratio.toFixed(2);
}
</code></pre>
</details>


-- DEMO - WCAG num Text and background color --




<!--

### WCAG compliance

- A - Basic compliance
- AA - Recommended level of compliance.
- AA - Highest level compliance. Useful for certain audiences.



- 2.1 rules
foreshadowing: new rules are coming
Basics of AA, AAA
code

Issues

- 3.0 rules
WIP
Focus is what?
examples

- Summary
how strict is it
how should I test it


How to follow progress for updates



- W3C Silver: https://w3c.github.io/silver/guidelines/#visual-contrast-of-text

- Demo: https://www.myndex.com/APCA/
- Github: https://github.com/Myndex/SAPC-APCA
- JS README: https://github.com/Myndex/SAPC-APCA/blob/master/JS/ReadMe.md

> Should the standard be relaxed for spot-reading such as for one or two words on a button?

> And legibility does not equal readability. Legibility means you can "make out what it is" letter by letter. Readability means that the VWFA can process whole words. There is an enormous difference. The Visual Contrast standard for Silver and the APCA is focused on readability not legibility.

Color combos to highlight in article
- https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/
-->
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
      <table class="contrast-table left-align top-align">
        <thead>
          <tr v-if="showTableLabels">
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
            <td v-if="showTableLabels">{{ fontSize }}px</td>
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


<link rel="stylesheet" href="/css/prism-syntax-highlighting.css">

<script src="/js/prism.min.js"></script>
<link rel="stylesheet" href="/css/table.css" />
<link rel="stylesheet" href="/css/forms.css" />

<style>
.contrast-table td {
  border: 0;
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
}

.preview-sample {
  margin-bottom: var(--gutter);
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;

.contrast-label {
  display: inline-block;
  padding: 2px 4px;
  background: var(--orange);
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-family: var(--monospace);
  font-weight: bold;
  margin-bottom: 4px;
}

.contrast-label.pass {
  display: none;
  background: transparent;
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

const METRICS = {
  16: {
    100: {
      apca: 'null',
      aa: '4.5',
      aaa: '7',
    },
  },
}


let APCA_TABLE = {
  16: [null, null, 100, 90, 90, 60, 55, 50, 50],
  24: [null, 100, 80, 60, 55, 50, 40, 38, 35],
  36: [100, 70, 55, 40, 38, 35, 30, 25, 20],
  72: [70, 50, 35, 25, 20, 20, 20, 20, 20],
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







/**
 * Removes every other data column.
 * @param  {Object} table
 * @return {Object}
 */
function trimColumns(table) {
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
  console.log(newObj);
  return newObj;
}

APCA_TABLE = trimColumns(APCA_TABLE);
WCAG_TABLE_AA = trimColumns(WCAG_TABLE_AA);
WCAG_TABLE_AAA = trimColumns(WCAG_TABLE_AAA);

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
      let display = 'inline-block';
      if (this.apcaRating === 4) {
        bg = 'transparent';
        display = 'none';
      } else if (this.apcaRating >= 1) {
        bg = 'var(--yellow)';
        display = 'none';
      } else {
        bg = 'var(--orange)';
      }
      return {
        backgroundColor: bg,
        display,
      };
    },

    wcagRating() {
      const weightArrayIndex = (this.fontWeight - 100) / 200;
      const aaaMin = WCAG_TABLE_AAA[this.fontSize][weightArrayIndex];
      const aaMin = WCAG_TABLE_AA[this.fontSize][weightArrayIndex];

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
      showTableLabels: false,

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
      return (i * 200) + 100;
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
