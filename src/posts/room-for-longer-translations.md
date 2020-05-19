---
title: "Room for translations"
date: 2020-05-11
layout: post.njk
---

<h2 class="subtitle">A rule of thumb for product designers.</h2>

-- Image: Same layout, multiple languages. Sketch style --

When you're designing a product that will be translated into multiple languages, how do you think about the copy, and how it lays out in the UI?

<!-- The copy won't render the same size in each language. It'll expand and contract, the width of the characters will change, and the number of words and characters will depend on the translation.-->

If your UI is flexible – the text can then flow and wrap as needed. But sometimes your design requires a fixed layout, where there is little to no give for the layout to grow and shrink. How do you decide how much space to give for your translations?

-- Example image - breaking layout, sketch --

The rule of thumb I've heard says: _"leave about 50% extra space"_. The other two things I often hear: _"Russian translations run long"_ and _"German words push the character limit"_.

Two out of three points hold up. Russian translations do run long, and so do German words. But leaving 50% extra space – probably isn't enough.


### Testing the 50% idea

In each column of this table, we take a word, and translate it in to ten different languages. These translations are then sorted from shortest to longest. The green bar shows the difference between the length of the English translation and the longest translation.


<div id="app">
  <div class="table-wrapper">
      <table class="left-align top-align no-wrap">
        <tr>
          <th v-for="word in words">
            {{ word }}
          </th>
        </tr>
        <tr>
          <td v-for="word in words">
            <div
              v-for="(translation, i) in getTranslations(word)"
              class="word-wrap"
              :class="{ 'word-wrap-base': translation.language === sourceLanguage }"
            >
              <div
                v-if="translation.language === sourceLanguage && percentageVisible(word)"
                style="float: right; font-size: 11px;"
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
</div>

If you skim the table, you'll see that in most cases, the amount of space required is well over over 50%. A better rule of thumb would be to assume that your copy could _double in size, a full 100%_.

In the end, this is just a rule of thumb. Use it as a starting point when your designing your UI. But as you see in the table, the translation lengths vary wildly. There is no way around it. You need to work with your translators to communicate space constraints up front, and then once the translation are in place, test them and work your translators to finesee the word choices. Viel Glück!

---

### Appendix


#### 1. Which languages did you use in the table? 

English, Chinese, Spanish, Arabic, Indonesian / Malaysian, Portugese, French, Japanese, Russian, and German. These are the 'Top Ten Languages Used in the Web' as noted by [Internet World Stats](https://www.internetworldstats.com/stats7.htm).


#### 2. How did you pick the words to translate in the table?

I picked twenty sites, mostly big ones (e.g. wikipedia, google.com/about), but also a few smallers ones (e.g. kottke.org), and scraped their text. I then plucked out the repeating phrases and words, and that is what you see in the table.

<link rel="stylesheet" href="/css/table.css" />

<style>

.table-wrapper {
  overflow-x: scroll;
  margin-left: calc(var(--gutter) * -1);
  margin-right: calc(var(--gutter) * -1);
  /*width: calc(100vw - var(--nav-width) - 100px);*/
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
  background: var(--green);
}
/*
.word-wrap:last-of-type,
.word-wrap:last-of-type .word {
  background: var(--yellow);
}
*/
.word {
  display: inline-block;
/*  background: #eee;*/
}
.word-base {
  background: #eee;
}

.word-tag {
  display: inline-block;
/*  font-size: 12px;*/
/*  font-weight: var(--weight-bold);*/
  margin-left: 2px;
 /* border-radius: var(--radius-sm);*/

}

.word-tag-min {
  background: var(--yellow);
}

.word-tag-max {
  background: var(--yellow); 
}
</style>



<script src="/js/vue.min.js"></script>
<script>

/*
{
  about: {
    de: {
      translation: 'Über',
      chars: 4
      pixelWidth: 36,
    }
  }
}
*/

const ENGLISH = 'en';

new Vue({
  el: '#app',

  data() {
    return { 
        sourceLanguage: ENGLISH,
        json: null,
        words: [],
        languages: [],
    };
  },
  
  async created() {
    const res = await fetch('/data/translations.json')
    console.log(res);
    const { data } = await res.json();
    console.log(data);

    // Extract langs and words    
    this.json = data;
    this.words = Object.keys(data);
    this.languages = Object.keys(data[this.words[0]]);
  },

  computed: {
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

      return sorted;
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
      let percent = this.getLongestTranslationPercentage(word);
      return (percent > 150);
    },    
  }
})   
</script>
