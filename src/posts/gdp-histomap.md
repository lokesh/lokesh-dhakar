---
title: "Histomap"
date: 2018-09-04
layout: post.njk
draft: true
---

<div class="center">

<svg class="histomap" viewBox="0 0 200 300">
  <rect x="0" y="0" width="200" height="300" fill="#eee" />
<!--     <text x="5" y="30">A nice rectangle</text> -->
<!-- <polygon points="100, 0, 180, 60, 80, 120, 400, 200, 400, 0" fill="#ddd" /> -->
</svg>

</div>

Maddison Project Database, version 2018. Bolt, Jutta, Robert Inklaar, Herman de Jong and Jan Luiten van Zanden (2018), “Rebasing ‘Maddison’: new income comparisons and the shape of long-run economic development” 


<style>
.histomap {
  border: 2px solid black;
}
</style>

<script src="/js/axios.min.js"></script>

<script>
// ------
// CONFIG
// ------

/* SVG size and colors */
const width = 200;
const height = 300;
const colorList = [
  '#F57373',
  '#FCA469',
  '#F6C458',
  '#E6F598',
  '#8ECC75',
  '#47B068',
]

/* Timeline */
const startYear = 2015;
const endYear = 1960;
const yearInterval = 5;

/* Countries */
let countryList = [
  'Brazil',
  'Canada',
  'China',
  'France',
  'Germany',
  'India',
  'Indonesia',
  'Italy',
  'Japan',
  'Russian Federation',
  'Spain',
  'United Kingdom',
  'United States',
  // 'West Germany',
]


// ----------
// FETCH DATA
// ----------

function fetchData() {
  return axios.get('/data/gdp-by-country.json')
    .then((response) => {
      return response.data;
    })
}

// ------------
// PROCESS DATA
// ------------

// years map stores total GDP for the year across countries
const years = new Map();
for (let year = startYear; year >= endYear; year -= yearInterval) {
  years.set(year, 0);
}

function processData(data) {
  // Sum up GDP totals for the year and store in years map
  for (let year of years.keys()) {
    for (let country in data){
      if (countryList.indexOf(country) !== -1) {
        let countryObj = data[country];
        if (countryObj.hasOwnProperty(year)) {
          years.set(year, years.get(year) + countryObj[year]);
        }
      }
    }
  }
}

function drawChart(data) {
  console.log(data);
}

fetchData().then(data => {
  processData(data);
  drawChart(data);
})

// let gdpTotals = new Array(YEARS).fill(0);
// let gdpCounter = new Array(YEARS).fill(0);

// for (let i = 0; i < YEARS; i++) {
//   for (let country in countries) {
//     gdpTotals[i] += countries[country][i];
//   }
// }




// let polys = [];

// let points;

// Object.keys(countries).forEach((countryName, index) => {
//   let country = countries[countryName]

//   let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
//   poly.setAttribute('fill', colorList[index % colorList.length]);

//   points = '0, 0';
//   for (let i = 0; i < YEARS; i++) {
//     points += `, ${(country[i] + gdpCounter[i]) / gdpTotals[i] * width}, ${i * (height / (YEARS - 1))}`;
//     gdpCounter[i] += country[i];
//   }

//   points += `, 0, ${height}`
//   poly.setAttribute('points', points);

//   polys.push(poly);
// });


// let frag = document.createDocumentFragment()

// for (let i = polys.length - 1; i >= 0; i--) {
//   frag.appendChild(polys[i]);  
// }

// document.querySelector('.histomap').appendChild(frag);
</script>

