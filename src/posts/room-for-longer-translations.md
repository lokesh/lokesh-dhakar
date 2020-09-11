---
title: "Room for translations"
date: 2020-05-11
layout: post.njk
---

<template id="demo-shrink-expand">
  <div class="demo-shrink-expand">
    <input @input="onInput" type="range" min="0" max="9" value="4">
    <div class="stage">
      <div class="word">
        {{ translation }}
      </div>
      <div class="language">
        {{ language }}
      </div>
    </div>
  </div>
</template>


<template id="demo-fluid">
  <div class="demo-fluid">
    <input @input="onInput" type="range" min="0" max="9" value="4">
    <div class="stage">
      <div class="demo-cards">
        <div
          v-for="t in displayTranslations"
          class="demo-card"
          :class="{'rtl': language === 'Arabic' }"
        >
          <div class="demo-card-text">
            {{ t }}
          </div>
        </div>
      </div>
      <div class="language">
        {{ language }}
      </div>
    </div>
  </div>
</template>


<template id="demo-fixed">
  <div class="demo-fixed">
    <input @input="onInput" type="range" min="0" max="9" value="4">
    <div class="stage">
      <div
        class="demo-alert"
        :class="{'rtl': language === 'Arabic'}"
      >
        <div class="demo-alert-title">{{ t[2] }}</div>
        <p>{{ t[3] }}</p>
        <div
          class="demo-alert-footer"
        >
          <div class="demo-alert-button">
            {{ t[0]}}
          </div>
          <div
            class="demo-alert-button demo-alert-button-primary"
            :class="{'ellipsis': ellipsis}">
            {{ t[1] }}
          </div>
        </div>
      </div>
      <div class="language">
        {{ language }}
      </div>
    </div>
    <br />
    <label class="checkbox-label">
      <input type="checkbox" v-model="ellipsis" class="checkbox" />
      <span>Use an ellipsis&hellip;</span>
    </label>
  </div>
</template>


<template id="demo-stacked">
  <div class="demo-stacked">
    <input @input="onInput" type="range" min="0" max="9" value="4">
    <div class="stage">
      <div class="demo-alert" :class="{'rtl': language === 'Arabic'}">
        <div class="demo-alert-title">{{ t[2] }}</div>
        <p>{{ t[0] }}</p>
        <div
          class="demo-alert-footer"
        >
          <div class="demo-alert-button">
            {{ t[1]}}
          </div>
          <div class="demo-alert-button demo-alert-button-primary">
            {{ t[3] }}
          </div>
        </div>
      </div>
      <div class="language">
        {{ language }}
      </div>
    </div>
  </div>
</template>

<template id="good-luck">
  <div class="good-luck">
    <input @input="onInput" type="range" min="0" max="9" value="4">
    <div class="stage">
      <div class="word" v-for="n in 7">
        {{ translation }}
      </div>
    </div>
  </div>
</template>





<div id="app">
  <h2 class="subtitle">When you're designing a product that will be translated into multiple languages, there are a few things to consider...</h2>
  
  <h2>Translations shrink and expand</h2>
  <p>The number of words and characters will change, as well as the width of the individual characters. Use the slider to see the same word translated between 10 different languages.</p>
  <demo-shrink-expand
    v-if="loaded"
    class="demo"
    :translations="sorted"
  ></demo-shrink-expand>

  <h2>Stay flexible, let them wrap</h2>
  <p>The best way to handle this variability is to accomodate text wrapping to multiple lines. Do this smartly, and you can preserve much of the aesthetics and symmetry you intended with your original design. In the following design, we keep the card heights the same.</p>
  <demo-fluid
    v-if="loaded"
    class="demo"
    :translations="sorted"
  ></demo-fluid>

  <h2>But in some UI, you might want to avoid text wrapping</h2>
  
  <p>In this case, we want to keep our button labels uniform and on a single line. Unfortunately, our primary button in yellow wraps to two lines in a few languages.</p>

  <demo-fixed
    v-if="loaded"
    class="demo"
    :translations="sorted"
  ></demo-fixed>

  <p>An ellpsis to keep things tidy and on one line is tempting – but don't do it. This can cut-off the copy early and obscure the meaning.</p>

  <h2>Instead, rethink the UI</h2>

  <demo-stacked
    v-if="loaded"
    class="demo"
    :translations="sorted"
  ></demo-stacked>


  <h2>But how do you know that you might have a space issue in the first place?</h2>

  <p>If you're designing a UI that is rigid and you want to avoid any wrapping (e.g. a horizontal main navigation), your best bet is to do the following:</p>
  <ul>
    <li><strong>Leave about 100% extra space.</strong> This seems like a lot, and it's much more than the rule of thumb you might have heard in the past that mentions '50% extra space', but this is closer to what I saw in my test data (see Appendix below).</li>
    <li><strong>Test in Russian and German early.</strong> Russian and German translations run long, and also include lengthy words that might require hyphenating in tight spaces. Use <a href="https://translate.google.com/">Google Translate</a> or find a plugin for your design application that will let you preview your design in a different language.</li>
  </ul>

  <p>Use these as a starting point when you're designing your UI. But remember that translation lengths vary wildly. You need to work with your translators to communicate space constraints up front, and then once the translations are in place, there is no substitute for testing.</p>

  <good-luck
    v-if="loaded"
    class="demo"
    :translations="sorted"
  >
  </good-luck> 


<hr />

<h2 id="appendix">Appendix</h2>


  <div class="table-wrapper">
      <table class="left-align top-align no-wrap">
        <tr>
          <th v-for="word in tableWords">
            {{ word }}
          </th>
        </tr>
        <tr>
          <td v-for="word in tableWords">
            <div
              v-for="(translation, i) in getTranslations(word)"
              class="word-wrap"
              :class="{ 'word-wrap-base': translation.language === sourceLanguage }"
            >
              <div
                v-if="translation.language === sourceLanguage && percentageVisible(word)"
                class="word-percent-diff"
              >
                {{ getLongestTranslationPercentage(word) - 100 }}%
              </div>
              <div
                class="word"
                :class="{ 'word-base': translation.language === sourceLanguage }"
              >
                {{ translation.translation}}
              </div>
            </div>
          </td>
        </tr>
      </table>
  </div>

<p>This table collects a sampling of words and phrases I found repeated across popular sites. In each column of the table below, we take the word and translate it in to ten different languages. These are then sorted from shortest to longest.

<p>The color bar shows the difference between the length of the English translation and the longest translation. The percentage is measured in pixels. Other discussions usually draw conclusions using character counts, but that doesn't take into the character widths and letter-spacing that affect the final rendering.</p>

<!--

### Appendix


#### 1. Which languages did you use in the table? 

English, Chinese, Spanish, Arabic, Indonesian / Malaysian, Portugese, French, Japanese, Russian, and German. These are the 'Top Ten Languages Used in the Web' as noted by [Internet World Stats](https://www.internetworldstats.com/stats7.htm).


#### 2. How did you pick the words to translate in the table?

I picked twenty sites, mostly big ones (e.g. wikipedia, google.com/about), but also a few smallers ones (e.g. kottke.org), and scraped their text. I then plucked out the repeating phrases and words, and that is what you see in the table.
-->

</div>

<link rel="stylesheet" href="/css/forms.css" />
<link rel="stylesheet" href="/css/table.css" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">

<style>
.demo {
  margin-bottom: var(--block-bottom);
}

.stage {
  padding: var(--gutter);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color-light);
  margin-top: 8px;
}

.rtl {
  direction: rtl;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ----------------------- */
/* Demo: Shrink and Expand */
/* ----------------------- */

.demo-shrink-expand .word {
  margin-bottom: 4px;  
  font-size: 1.8rem;
  line-height: 1.5em;  
  background: var(--yellow);
  border-radius: var(--radius-xl);
}

@media (min-width: 800px) {
  .demo-shrink-expand .word {
    font-size: 3.5rem;
  }
}

/* ----------- */
/* Demo: Fluid */
/* ----------- */

.demo-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(3rem, 11rem));
  grid-template-rows: 10rem;
  grid-gap: var(--gutter);
  margin-bottom: 8px;
}

.demo-card {
  display: flex;
  flex-direction: column-reverse;
  border: 1px solid var(--border-color-light);
  border-radius: var(--radius-xl);
  background: var(--recessed-bg-color);
  background: repeating-linear-gradient(
    45deg,
    #ec5,
    #ec5 3px,
    var(--yellow) 3px,
    var(--yellow) 6px
  );
}

.demo-card-text {
  padding: var(--gutter);
  background: white;
  font-weight: var(--weight-bold);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}


/* ----------------------- */
/* Demo: Fixed and Stacked */
/* ----------------------- */

.demo-fixed {
  margin-bottom: 12px;  
}

.demo-fixed .stage,
.demo-stacked .stage {
  background: var(--recessed-bg-color);
}

.demo-alert {
  width: 280px;
  text-align: center;
  background: white;
  border: 1px solid var(--border-color-light);
  border-radius: var(--radius-xl);
  margin-bottom: var(--gutter);
}

.demo-alert-title {
  padding: var(--gutter);
  font-size: 1.125rem;
  font-weight: var(--weight-bold);
}

.demo-alert p {
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

.demo-alert-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 var(--gutter) var(--gutter) var(--gutter);
  grid-gap: 4px;
}

.demo-stacked .demo-alert-footer {
  grid-template-columns: 1fr;
}


.demo-alert-button {
  padding: 12px 8px;
  line-height: 1em;
  font-size: 0.875rem;
  font-weight: 600;
  background: #F0F0F0;
  border-radius: var(--radius);
}

.demo-alert-button-primary {
  background: var(--yellow);
}


/* --------- */
/* Good luck */
/* --------- */

.good-luck .word {
  display: block;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1em;
  color: white;
  text-transform: uppercase;
  -webkit-text-stroke: 1px var(--color);
}

.good-luck .word:nth-child(4) {
  color: var(--color); 
}






/* ----- */
/* Table */
/* -----*/


.table-wrapper {
  overflow-x: scroll;
  margin-left: calc(var(--gutter) * -1);
  margin-right: calc(var(--gutter) * -1);
}

@media (min-width: 800px) {
  .table-wrapper {
    margin-left: 0;
    margin-right: 0;
  }
}

.word-wrap {
  margin-bottom: 2px;
}

.word-wrap-base {
  background: #eee;
  background: repeating-linear-gradient(
    45deg,
    #ddd,
    #ddd 3px,
    #bbb 3px,
    #bbb 6px
  );
  background: var(--yellow);
}

.word {
  display: inline-block;
}

.word-base {
  background: #eee;
}

.word-percent-diff {
  position: relative;
  top: 3px;
  float: right;
  font-size: 0.6875rem;
}
  </style>



<script src="/js/vue.min.js"></script>
<script>

const LANGUAGE_CODES = {
  'en': 'English',
  'zh-CN': 'Chinese',
  'es': 'Spanish',
  'ar': 'Arabic',
  'id': 'Indoseian',
  'pt': 'Portugese',
  'fr': 'French',
  'ja': 'Japnese',
  'ru': 'Russian',
  'de': 'German',
}

/* ------------------ */
/* demo-shrink-expand */
/* ------------------ */
Vue.component('demo-shrink-expand', {
  template: '#demo-shrink-expand',
  
  props: {
    translations: Array,
  },

  data() {
    return {
      index: this.translations['support'].findIndex(t => t.language === 'en'),
    };
  },

  computed: {
    language() {
      return LANGUAGE_CODES[this.translations['support'][this.index].language];
    },
    translation() {
      return this.translations['support'][this.index].translation;
    },
  },

  methods: {
    onInput(e) {
      this.index = e.target.value;
    },
  },
});


/* ---------- */
/* demo-fluid */
/* ---------- */

Vue.component('demo-fluid', {
  template: '#demo-fluid',
  props: {
    translations: Array,
  },
  data() {
    return {
      index: this.translations['In a horizontal grid'].findIndex(t => t.language === 'en'),
    };
  },
  computed: {
    language() {
      return LANGUAGE_CODES[this.translations['In a horizontal grid'][this.index].language];
    },
    displayTranslations() {
      let display = [];
      
      let gridStrObj = this.translations['In a horizontal grid'][this.index];
      let language = gridStrObj.language;
      let twoCardsStr = this.translations['Two cards'].find(t => t.language === language).translation;

      display.push(twoCardsStr);
      display.push(gridStrObj.translation);
      
      return display;
    },
  },
  methods: {
    onInput(e) {
      this.index = e.target.value;
    },
  },
});


/* ---------- */
/* demo-fixed */
/* ---------- */

Vue.component('demo-fixed', {
  template: '#demo-fixed',
  props: {
    translations: Array,
  },
  data() {
    return {
      ellipsis: false,
      index: this.translations['Save document'].findIndex(t => t.language === 'en'),
    };
  },
  computed: {
    language() {
      return LANGUAGE_CODES[this.translations['Save document'][this.index].language];
    },
    t() {
      let display = [];
      
      let btn2Obj = this.translations['Save document'][this.index];
      let language = btn2Obj.language;
      let btn1 = this.translations['Cancel'].find(t => t.language === language).translation;
      let t2 = this.translations['Alert component'].find(t => t.language === language).translation;
      let t3 = this.translations['This modal component has a fixed width of 280px.'].find(t => t.language === language).translation;
      display.push(btn1);
      display.push(btn2Obj.translation);
      display.push(t2);
      display.push(t3);
      
      return display;
    },
  },
  methods: {
    onInput(e) {
      this.index = e.target.value;
    },
  },
})


/* ------------ */
/* demo-stacked */
/* ------------ */

Vue.component('demo-stacked', {
  template: '#demo-stacked',
  props: {
    translations: Array,
  },
  data() {
    return {
      index: this.translations['This time we stack the buttons to give the labels plenty of room.'].findIndex(t => t.language === 'en'),
    };
  },
  computed: {
    language() {
      return LANGUAGE_CODES[this.translations['This time we stack the buttons to give the labels plenty of room.'][this.index].language];
    },
    t() {
      let display = [];
      
      // console.log(this.translations);
      let t0obj = this.translations['This time we stack the buttons to give the labels plenty of room.'][this.index];
      
      let language = t0obj.language;
      let t1 = this.translations['Cancel'].find(t => t.language === language).translation;
      let t2 = this.translations['Alert component'].find(t => t.language === language).translation;
      let t3 = this.translations['Save document'].find(t => t.language === language).translation;
      display.push(t0obj.translation, t1, t2, t3);
      
      return display;
    },
  },
  methods: {
    onInput(e) {
      this.index = e.target.value;
    },
  },
})


/* --------- */
/* good-luck */
/* --------- */

Vue.component('good-luck', {
  template: '#good-luck',
  
  props: {
    translations: Array,
  },

  data() {
    return {
      index: this.translations['Good luck'].findIndex(t => t.language === 'en'),
    };
  },

  computed: {
    translation() {
      return this.translations['Good luck'][this.index].translation;
    },
  },

  methods: {
    onInput(e) {
      this.index = e.target.value;
    },
  },
})







const ENGLISH = 'en';

new Vue({
  el: '#app',

  data() {
    return { 
        json: null,
        languages: [],
        loaded: false,
        sourceLanguage: ENGLISH,
        words: [],
    };
  },
  
  async created() {
    const res = await fetch('/data/translations.json')
    const { data } = await res.json();

    // Extract langs and words    
    this.json = data;
    this.words = Object.keys(data);
    this.languages = Object.keys(data[this.words[0]]);

    this.loaded = true;
  },

  computed: {
    tableWords() {
      return this.words.filter(word => {
        return ![
          'Alert component',
          'This modal component has a fixed width of 280px.',
          'This time we stack the buttons to give the labels plenty of room.',
          'Cancel',
          'In a horizontal grid',
          'Save document',
          'Good luck',
        ].includes(word)
      })
    },
    sorted() {      
      let sorted = {};

      this.words.forEach(word => {
        let wordObj = this.json[word]
        let wordArr = [];

        Object.keys(wordObj).forEach(language => {
          let transObj = Object.assign({}, wordObj[language]);
          transObj.language = language;
          wordArr.push(transObj);
        })

        // Sort by pixelWidth asc
        wordArr = wordArr.sort((a, b) => {
          if (a.pixelWidth < b.pixelWidth) {
            return -1;
          } else if (a.pixelWidth > b.pixelWidth) {
            return 1;
          }
          return 0;
        });

        let { pixelWidth: basePixelWidth} = wordArr.find(word => {
          return word.language === ENGLISH
        })
        
        wordArr = wordArr.map(word => {
          word.percentageOfBase = ((word.pixelWidth / basePixelWidth) * 100).toFixed(0)
          return word;
        });
        sorted[word] = wordArr;
      })
      // console.log(sorted);
      return sorted;
    },
    unsorted() {
      let unsorted = {};
      
      this.words.forEach(word => {
        let wordObj = this.json[word]
        let wordArr = [];
      
        Object.keys(wordObj).forEach(language => {
          wordArr.push(wordObj[language].translation);
        })

        unsorted[word] = wordArr;
      });
      return unsorted;
    },
  },

  methods: {
    getTranslations(word) {
      return this.sorted[word];
    },
    getLongestTranslationPercentage(word) {
      let translations = this.sorted[word];
      return translations[translations.length - 1].percentageOfBase;
    },
    percentageVisible(word) {
      let translations = this.sorted[word];
      const obj = translations[translations.length - 1];
      const englishPixels = obj.pixelWidth / (obj.percentageOfBase * 0.01);
      const barWidth = obj.pixelWidth - englishPixels;
      return barWidth > 24;
    },    
  }
})   
</script>
