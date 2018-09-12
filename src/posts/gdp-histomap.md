---
title: "Histomap"
date: 2018-09-04
layout: post.njk
draft: true
---

<div class="center">

<svg class="histomap" viewBox="0 0 400 800" style="width: 400px">
  <rect x="0" y="0" width="400" height="800" fill="#eee" />
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

<script src="/js/lodash-core.min.js"></script>
<script src="/js/axios.min.js"></script>

<script>
// ------
// CONFIG
// ------

/* SVG size and colors */
const canvasWidth = 400;
const canvasHeight = 800;
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
  // 'Brazil',
  // 'Canada',
  'China',
  // 'France',
  'Germany',
  'India',
  // 'Indonesia',
  // 'Italy',
  'Japan',
  // 'Russian Federation',
  // 'Spain',
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

// years `map` stores total GDP for the year across countries
const years = new Map();
for (let year = startYear; year >= endYear; year -= yearInterval) {
  years.set(year, 0);
}

function processData(data) {
  
  const filteredData = {};
  let yearsArray = Array.from(years.keys());

  /* Filter out unneeded countries and years data */
  for (let country in data){
      if (countryList.indexOf(country) !== -1) {
        let countryObj = data[country];
        filteredData[country] = _.pick(countryObj, yearsArray);
      }
  }

  // Sum up GDP totals for the year and store in years map
  for (let year of years.keys()) {
    for (let country in filteredData){
      let countryObj = filteredData[country];
      if (countryObj.hasOwnProperty(year)) {
        years.set(year, years.get(year) + countryObj[year]);
      }
    }
  }

  return filteredData;
}

function drawChart(data) {
  
  let countryIndex = 0;
  let polys = [];
  let points;

  let yearHeight = canvasHeight / (years.size - 1); 

  let widthSum = {};
  for (let year of years.keys()) {        
      widthSum[year] = 0;
  }

  for (let country in data) {
    let countryObj = data[country];

      let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      poly.setAttribute('fill', colorList[countryIndex % colorList.length]);
      poly.setAttribute('stroke', 'black');
      poly.setAttribute('stroke-width', '1');
      poly.setAttribute('data-name', country);

      points = '0, 0';
      
      let yearIndex = 0;
      let height = 0;

      for (let year of years.keys()) {        
        let yearTotal = years.get(year);

        let width = ((countryObj[year] / yearTotal) * canvasWidth) + widthSum[year];
        // console.log(width);
        height = yearIndex * yearHeight;

        // Add point
        points += `, ${width}, ${height}`;

        //
        widthSum[year] = width;          
        

        // points +=`, ${countryObj[year]`;
        // points += `, ${(country[i] + gdpCounter[i]) / gdpTotals[i] * width}, ${i * (height / (YEARS - 1))}`;
        // gdpCounter[i] += country[i];
        yearIndex++;
      }

      points += `, 0, ${height}`
    //   poly.setAttribute('points', points);

    //   polys.push(poly);
    
    // console.log(widthSum);



    // Draw left edge going down. Use prev countries right edge points.

    // Draw line at bottom connecting to right

    // Draw right going up. Save right edge points.

    // Draw line at top connecting to left

    poly.setAttribute('points', points);

    polys.push(poly);

    countryIndex++;
  }    

  let frag = document.createDocumentFragment()

  for (let i = polys.length - 1; i >= 0; i--) {
    frag.appendChild(polys[i]);  
  }

  document.querySelector('.histomap').appendChild(frag);

  // console.log(years);
  // console.log(data);
}

fetchData().then(data => {
  let processedData = processData(data);
  drawChart(processedData);
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

