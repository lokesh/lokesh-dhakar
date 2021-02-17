---
title: "WCAG color contrast"
date: 2020-11-23
layout: post.njk
draft: true
---

<h2 class="subtitle">A short, practical guide for those who find the specs a little dry.</h2>

<div id="hero">
  <div>
    <figure>
      <div class="html-figure hero">
        <div class="hero-grid" :style="gridStyles">
          <div
            v-for="i in (colCount * rowCount)"
            class="hero-item"
            :style="`
              color: ${cells[i - 1].color};
              background: ${cells[i - 1].background};
              line-height: ${rowHeight}`"
            @click="updateCell(i - 1)"
            @mouseover="updateCell(i - 1)"
          >
            Aa
          </div>
        </div>
      </div>
    </figure>
  </div>
</div>

<style>
.hero {
  padding: 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 8rem 8rem 8rem;
}

.hero-item {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  background: var(--recessed-bg-color);
  transition: transform 0.2s;
  user-select: none;
}

.hero-item:active {
  transform: scale(0.9);
}
</style>

Before we jump into color contrast, a little background on WCAG.

**Web Content Accessibility Guidelines ([WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/))** are a set of recommendations for making web content accessible. The guidelines primarly focus on people with disabilities (e.g. low vision), but following these guidelines often makes the experience better for everyone.


**Who's behind WCAG?** The guidelines are published by the Web Accessibility Initiative ([WAI](https://www.w3.org/WAI/)) which is part of World Wide Web Consortium ([W3C](https://www.w3.org/)). 

**WCAG versions.** In this post, we'll look at the latest published version, 2.1, as well as the draft of 3.0 which brings big changes to contrast guidelines.

- [WCAG 2.0](https://www.w3.org/TR/WCAG20/) - Published Dec 2008
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/) - Published June 2018.
- [WCAG 3.0 Working Draft](https://www.w3.org/TR/wcag-3.0/) - A work in progress. The first public draft for 3.0 was shared Jan 2021.


## WCAG 2.1 contrast


So now we know a bit about WCAG. Let's look at the guidelines ([1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) & [1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast)) on color contrast. At the core is a _contrast ratio_. This is derived by comparing the luminance of the foreground color against the luminance of the background. The values go from 21 (black on white, or vice versa) to 0 (foreground and background are the same color).


<figure class="border">
  <div class="html-figure">
    <div class="demo-ratio-examples">
      <div class="ratio-example">
        <div class="ratio-example-render">
          Text
        </div>
        10.79
      </div>
      <div class="ratio-example">
        <div class="ratio-example-render" style="color: #4d4d4d">
          Text
        </div>
        7.22
      </div>
      <div class="ratio-example">
        <div class="ratio-example-render"  style="color: #999999">
          Text
        </div>
        2.43
      </div>
      <div class="ratio-example">
        <div class="ratio-example-render" style="color: #e6e6e6">
          Text
        </div>
        1.07
      </div>
    </div>
  </div>
</figure>

<style>
.demo-ratio-examples {
  display: grid;
  gap: var(--gutter);
  grid-template-columns: repeat(4, 1fr);
}

.ratio-example {
  text-align: center;
}

.ratio-example-render {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--gutter);
  margin-bottom: calc(var(--gutter) / 2);
  height: 4em;
  background: #eee;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>

WCAG provides [step-by-step instructions](https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests) on how to calculate the contrast ratio and I include a Javascript implementation below.

<details>
  <summary>See JS implementation of contrast ratio</summary>
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

This ratio is the key to checking our compliance with WCAG. Many design and development tools (including Chrome's devtools) have a built-in WCAG constrast validator so it's unlikely you'll need to reimplement the algorithm. You can also use a tool like [WAVE](https://wave.webaim.org/) to check your site for constrast issues.

### Constrast ratio minimiums

WCAG sets minimum values for the ratio depending on the type of content. For example, titles, since they are bigger and bolder, often fall into the _Large text_ category, which has a lower contrast ratio minimum than body text.

<figure class="border">
  <div class="html-figure" style="padding-top: 32px; padding-bottom: 32px;">
    <div class="demo-categories">
      <div class="cat-label">
        <div>
          <div class="cat-name">Large text</div>
          <div class="cat-data">Min 3.0</div>
        </div>
        <div>⇢</div>
      </div>
      <h2 class="cat-title">Title ipsum</h2>
      <div class="cat-label">
        <div>
          <div class="cat-name">Text</div>
          <div class="cat-data">Min 4.5</div>
        </div>
        <div>⇢</div>
      </div>
      <div class="cat-text">Lorem ipsum in visual perception is the difference in appearance of two or more parts of a field seen simultaneously or successively (hence: brightness contrast, lightness contrast, color contrast, simultaneous contrast, successive contrast, etc.).</div>
      <div class="cat-label">
        <div>
          <div class="cat-name">Text</div>
          <div class="cat-data">Min 4.5</div>
        </div>
        <div>⇢</div>
      </div>
      <div><button>Button</button></div>
      <div class="cat-label">
        <div>
          <div class="cat-name">Incidental</div>
          <div class="cat-data">No min</div>
        </div>
        <div>⇢</div>
      </div>
      <div><button disabled>Disabled button</button></div>
    </div>
  </div>
</figure>
<style>
.demo-categories {
  display: grid;
  gap: calc(var(--gutter) * 2);
  align-items: center;
  grid-template-columns: 7em auto;
}

.cat-label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  font-size: 0.8125rem;
  gap: 4px;
  background: white;
  border-radius: var(--radius-sm);
}

.cat-name {
  font-weight: var(--weight-bold);
}

.cat-data {
  font-size: 0.75rem;
  font-family: var(--font-mono);
}

.cat-title {
  margin: 0;
  color: #DE7558;
}

.cat-text {
  font-size: 16px;
}

</style>

<table class="left-align">
  <thead>
    <tr>
      <th style="width: 5em">Min</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>4.5</td>
      <td>**Text**</td>
    </tr>
    <tr>
      <td>3.0</td>
      <td>**Large text**<br />Text that is at least 18pt, or bold and at least 14pt.</td>
    </tr>
    <tr>
      <td>3.0</td>
      <td>**UI and icons**<br />For controls (e.g. buttons), this includes their borders and interaction states. The button label still fall under the Text category.</td>
    </tr>
    <tr>
      <td>No min</td>
      <td><strong>Incidental</strong><br />This refers to decorative content that provides no information and disabled UI elements.</td>
    </tr>
    <tr>
      <td>No min</td>
      <td>**Logo**</td>
    </tr>
  </tbody>   
</table>

<!--
† Since disabled UI controls do often provide information to the user about the current state they are in, there is debate around whether these UI elements should have a minimum contrast ratio. Check out the [Github Issue](https://github.com/w3c/wcag21/issues/805).
-->

### Compliance levels

[Img?]

The minimum contrast ratios noted in the previous section are for *AA* level compliance. When compliance is discussed, it normally refers to AA – though WCAG does provide three tiers of compliance:

- <u>A</u> - Basic compliance
- <u>AA</u> - Recommended level of compliance
- <u>AAA</u> - Highest level compliance. Useful for certain audiences.

To meet any of these compliance levels, you must meet _all_ of the guidelines for that level. This doesn't mean partial compliance isn't beneficial for users, but if you're looking to meet a legal requirement, this detail is worth noting.

### WCAG 2.1 recap

We've covered quite a bit quickly, so let's do a recap of the bigger points:

- [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) are a set of guidelines to make sure content is accessible to a broad range of users, including those with low vision.
- In the guidelines we have two sections ([1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) & [1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast)) devoted to color contrast between foreground and the background content.
- The minimum contrast ratios vary by category of content (text, title, icon, disabled UI, et al).

Here is an interactive demo where you can change the title, text, and background colors. Play with the color values to get a feel for what combinations pass AA and which ones don't.

<div id="compliance-demo">
  <div>
    <figure class="border compliance-demo-figure">
      <div class="html-figure" :style="`padding-top: 32px; padding-bottom: 32px; background: ${bgColor}`">
        <div class="demo-categories">
          <div class="cat-label" style="background: white">
            <div>
              <div class="cat-data">
                Ratio {{ titleRatio }}<br />
                Min 3.0
              </div>
              <span v-if="titleRatio >= 3" class="cat-status cat-pass" aria-label="AA pass">✔️</span>
              <span v-else class="cat-status cat-fail" aria-label="AA fail">✘</span>
            </div>
            <div>⇢</div>
          </div>
          <h2 class="cat-title" :style="`color: ${titleColor}`">Title ipsum</h2>
          <div class="cat-label">
            <div>
              <div class="cat-data">
                Ratio {{ textRatio }}<br />
                Min 4.5
              </div>
              <span v-if="textRatio >= 4.5" class="cat-status cat-pass" aria-label="AA pass">✔️</span>
              <span v-else class="cat-status cat-fail" aria-label="AA fail">✘</span>
            </div>
            <div>⇢</div>
          </div>
          <div class="cat-text" :style="`color: ${textColor}`">Lorem ipsum in visual perception is the difference in appearance of two or more parts of a field seen simultaneously or successively (hence: brightness contrast, lightness contrast, color contrast, simultaneous contrast, successive contrast, etc.).</div>
      </div>
    </figure>
    <div class="color-pickers-row">
      <div>
        <color-picker class="color-picker" v-model="titleColor" aria-label="Title color"></color-picker>
        <div class="picker-label">Title</div>
      </div>
      <div>
        <color-picker class="color-picker" v-model="textColor" aria-label="Text color"></color-picker>
        <div class="picker-label">Text</div>
      </div>
      <div>
        <color-picker class="color-picker" v-model="bgColor" aria-label="Background color"></color-picker>
        <div class="picker-label">Background</div>
      </div>
    </div>
  </div>
</div>

<style>
.compliance-demo-figure {
  margin-bottom: calc(var(--block-bottom) / 2);
}

.cat-status {
  display: inline-flex;
  align-content: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin: 4px 0;
  line-height: 16px;
  border-radius: var(--radius-sm);
  font-size: 10px;
}

.cat-pass {
  background: var(--green);
}

.cat-fail {
  color: white;
  background: var(--red);
}

.color-pickers-row {
  display: flex;
}

.color-pickers-row > div {
  margin-right: calc(var(--gutter) * 2);
}

.color-pickers-row .color-picker {
  margin-bottom: 4px;
}

.color-picker {
  font-size: 16px;
}

</style>

## Applying the guidelines to your own work

Should you go update all your designs to meet WCAG 2.1 AA guidelines?

I'd say, yes, in most, but not all cases. Use them as guidelines, but not as hard rules. They are crude in some ways. Couple of examples:

### Criticisms, guidlines not rules?

- They don't account for the large breadth in font sizes and weights.
- They don't account for how different fonts might render.
- They focus on readability, not legibility. This means all-caps content, which is legible, might not pass. This also means that spot-reading, such as one or two words button labels are required to meet the same standards as a multi-paragraph piece of text.

> And legibility does not equal readability. Legibility means you can "make out what it is" letter by letter. Readability means that the VWFA can process whole words. There is an enormous difference. The Visual Contrast standard for Silver and the APCA is focused on readability not legibility.

Odd results at times, orange and black.

Should the standard be relaxed for spot-reading such as for one or two words on a button?

Some good news. The WCAG 3.0 working draft introduces updates to color contrast guidelines that address some of these issues.

### WCAG 3.0 preview


See it in action.


<!--

- W3C Silver: https://w3c.github.io/silver/guidelines/#visual-contrast-of-text

- Demo: https://www.myndex.com/APCA/
- Github: https://github.com/Myndex/SAPC-APCA
- JS README: https://github.com/Myndex/SAPC-APCA/blob/master/JS/ReadMe.md

Color combos to highlight in article
- https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/
WCAG AA & AAA
APCA - Ratings 4, 3, 2, 1, 0

Essentially there are five levels, including 0 (fail) with level four being the best outcome. In the scoring model, the scores for different aspects of a site get aggregated and averaged to determine overall site score.

- Rating 4  All reading text meets or exceeds the values on the APCA lookup table
- Rating 3  The lowest APCA value is 1-4% below the values on the APCA lookup table
- Rating 2  The lowest APCA value is 5-9% below the values on the APCA lookup table
- Rating 1  The lowest APCA value is 10-15% below the values on the APCA lookup table
- Rating 0  Any failures on the Advanced Perceptual Contrast Algorithm (APCA) lookup table or the lowest APCA value is more than 15% below the values on the APCA lookup table



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
  <input
    type="color"
    class="color-picker"
    :value="value"
    @input="$emit('input', $event.target.value)"
  >
</template>


<div id="app">
  <div>
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
  // console.log(newObj);
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
    ariaLabel: String,
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
});

new Vue({
  el: '#compliance-demo',

  data() {
    return {
      titleColor: '#DE7558',
      textColor: '#999999',
      bgColor: '#ffffff',
    };
  },

  computed: {
    textRatio() {
      return getContrast(this.textColor, this.bgColor, MODE_WCAG);
    },
    titleRatio() {
      return getContrast(this.titleColor, this.bgColor, MODE_WCAG);
    },
  },
});

new Vue({
  el: '#hero',

  data() {
    return {
      colCount: 6,
      rowCount: 3,
      rowHeight: '6rem',
      cells: [],
      hue: this.rand(255),
      sat: this.rand(100),
      lum: this.rand(100),
      bgInit: [

        [30, 2, 65],
        [30, 5, 70],
        [35, 9, 75],
        [40, 9, 80],
        [40, 9, 85],
        [40, 9, 90],

        [15, 70, 60],
        [20, 70, 60],
        [20, 70, 60],
        [20, 75, 65],
        [30, 80, 70],
        [30, 85, 75],

        [65, 15, 5],
        [65, 20, 10],
        [65, 25, 10],
        [70, 25, 15],
        [70, 30, 15],
        [75, 30, 20],

      ]
    };
  },

  created() {
    for (let i = 0; i < this.colCount * this.rowCount; i++) {
      this.cells.push({
        color: `hsl(0 0% ${this.rand(100)}%)`,
        background: `hsl(${this.bgInit[i][0]} ${this.bgInit[i][1]}% ${this.bgInit[i][2]}%)`,
      });
    }
  },

  computed: {
    gridStyles() {
      return {
        gridTemplateColumns: `repeat(${this.colCount}, 1fr)`,
        gridTemplateRows: `repeat(${this.rowCount}, ${this.rowHeight})`
      }
    },
  },

  methods: {
    updateCell(i) {
      this.updateHSL();
      this.cells[i].color = `hsl(0 0% ${this.rand(100)}%)`;
      this.cells[i].background = `hsl(${this.hue} ${this.sat}% ${this.lum}%)`;
    },
    rand(max) {
      return Math.floor(Math.random() * max);
    },

    updateHue() {
      this.hue += 3;
      this.hue = this.hue % 255;
    },

    updateSat() {
      this.sat += 3;
      this.sat = this.sat % 100;
    },
    updateLum() {
      this.lum += 3;
      this.lum = this.lum % 100;
    },

    updateHSL() {
      this.updateHue();
      this.updateSat();
      this.updateLum();
    },
  },
});



</script>
