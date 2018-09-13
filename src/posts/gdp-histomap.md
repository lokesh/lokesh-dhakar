---
title: "Histomap"
date: 2018-09-04
layout: post.njk
draft: true
---

<div class="center">

<svg id="histomap">
  <g id="chart-group">
  <!-- <rect id="chart-rect"></rect>  -->
  </g>
  <g id="overlay-group"></g>
</svg>

</div>

<p class="citation">Data provided by the Maddison Project Database, version 2018. Bolt, Jutta, Robert Inklaar, Herman de Jong and Jan Luiten van Zanden (2018)</p>

<style>
#histomap {
}

#chart-group {

}

#chart-rect {
  fill: #eee;
  stroke: black;
  stroke-width: 2;
}

#overlay-group {
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
}

.year-line {
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 1;
  stroke-dasharray: 4;
}

.citation {
  font-size: 12px;
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
const labelColumnWidth = 34;
const chartWidth = canvasWidth - labelColumnWidth;
const chartHeight = canvasHeight;

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
const endYear = 1950;
const yearInterval = 5;

/* Countries */
let countryList = [
  // 'Brazil',
  // 'Canada',
  'China',
  // 'France',
  // 'Germany',
  'India',
  // 'Indonesia',
  // 'Italy',
  'Japan',
  // 'Russian Federation',
  // 'Spain',
  // 'United Kingdom',
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

// ----
// DRAW
// ----

function resizeSVG() {
  const svg = document.getElementById('histomap');
  // svg.setAttribute('style', `width: ${canvasWidth}px; height: ${canvasHeight}px`);
  svg.setAttribute('viewBox', `0, 0, ${canvasWidth}, ${canvasHeight}`);

  const chartGroup = document.getElementById('chart-group')
  chartGroup.style.transform = `translateX(${labelColumnWidth}px)`

  // const chartRect = document.querySelector('#chart-rect');
  // chartRect.setAttribute('width', chartWidth);
  // chartRect.setAttribute('height', chartHeight);
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
      // poly.setAttribute('stroke', 'black');
      // poly.setAttribute('stroke-width', '1');
      poly.setAttribute('data-name', country);

      points = '0, 0';
      
      let yearIndex = 0;
      let height = 0;

      for (let year of years.keys()) { 
        let yearTotal = years.get(year);

        let width = ((countryObj[year] / yearTotal) * chartWidth) + widthSum[year];
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

    // Draw left edge going down. Use prev countries right edge points.

    // Draw line at bottom connecting to right

    // Draw right going up. Save right edge points.

    // Draw line at top connecting to left

    poly.setAttribute('points', points);

    polys.push(poly);

    countryIndex++;
  }    

  // Append chart polys to DOM
  let frag = document.createDocumentFragment()
  for (let i = polys.length - 1; i >= 0; i--) {
    frag.appendChild(polys[i]);  
  }

  document.getElementById('chart-group').appendChild(frag);
}



function drawOverlay(data) {  
  const svgOverlay = document.getElementById('overlay-group');
  
  // <text x="5" y="30">A nice rectangle</text>
  
  let yearIndex = 0;
  let height = 0;
  let polys = [];
  let frag = document.createDocumentFragment();

  let yearHeight = canvasHeight / (years.size - 1); 

  for (let year of years.keys()) {        
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let textY = (yearIndex === 0) ? 10 : yearIndex  * yearHeight;

    // Draw year labels
    text.setAttribute('x', 0);
    text.setAttribute('y', textY);
    text.setAttribute('text-anchor', 'right');
    text.textContent = year;
    frag.appendChild(text);
    
    // Draw year lines    
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('x1', labelColumnWidth);
    line.setAttribute('y1', yearIndex  * yearHeight);
    line.setAttribute('x2', canvasWidth);
    line.setAttribute('y2', yearIndex  * yearHeight);
    line.classList.add('year-line');
    frag.appendChild(line);

    yearIndex++;
  }

  // Draw country labels
  for (let country in data) {
    let countryObj = data[country];
    
  }


  svgOverlay.appendChild(frag);
}

fetchData().then(data => {
  let processedData = processData(data);
  
  resizeSVG();
  drawChart(processedData);
  drawOverlay(processedData);
})
</script>

