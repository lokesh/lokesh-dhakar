---
title: "How much room to leave for translations?"
date: 2020-05-11
layout: post.njk
pageWidth: "full"
---

<h2 class="subtitle">A rule of thumb for product designers.</h2>

### If English is you base language, you should leave about 100% extra space.

<div id="app">
  <div>
      <table class="left-align ftop-align no-wrap">
        <tr>
          <th v-for="word in words">
            {{ word }}
          </th>
        </tr>
        <tr>
          <td v-for="word in words">
            <div v-for="(translation, i) in getTranslations(word)">
              <div
                class="word"
                :class="{ base: translation.language === sourceLanguage }"
              >
                {{ translation.translation}}
                <span v-if="i === 0">
                  {{ translation.percentageOfBase }}%
                </span>
                <span v-if="i === languages.length - 1">
                  {{ translation.percentageOfBase }}%
                </span>
              </div>
            </div>
          </td>
        </tr>
      </table>
      
  </div>
</div>

<!-- measure char width or render text and pixels? -->


Q: Which languages to use and why?

**Internet users by language top 10**

1. English
2. Chinese
3. Spanish
4. Arabic
5. Indonesian / Malaysian
6. Portugese
7. French
8. Japanese
9. Russian
10. German

Citation syntax?
https://www.internetworldstats.com/stats7.htm


Q: Which words to use?
Idea:
- Scrape the inner text from X of sites.
- Find common occurances. Use those.

- Examples of wrapping and word breaks? or skip?


Q: Measuring characters or pixels?
Pixels. Using San Francisco font.

<link rel="stylesheet" href="/css/table.css" />

<style>
.word {
  display: inline-block;
}

.word.base {
  background-color: yellow;
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
    }
  },

  methods: {
    getTranslations(word) {
      return this.sorted[word];
    }
  }
})   
</script>
