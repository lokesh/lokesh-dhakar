---
title: "Histomap"
date: 2018-09-04
layout: post.njk
draft: true
---

<div class="center">

<svg id="histomap">
  <g id="chart-group"></g>
  <g id="overlay-group"></g>
</svg>

</div>

<p class="citation">Data provided by the Maddison Project Database, version 2018. Bolt, Jutta, Robert Inklaar, Herman de Jong and Jan Luiten van Zanden (2018)</p>

<style>
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

const fontHeight = 10; // About 10px, measured manually

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
const endYear = 1820;
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
  // 'United Kingdom',
  'United States',
  // 'West Germany',
]



// ----------
// GLOBALS
// ----------

/*
  Each child array in seriesCoords contains all the x & y positions for the 
  country series data from top to bottom.
  
  Ex. seriesCoords = [
    [{x: 200, y: 0}, {x: 120, y: 50}],
    [{x: 230, y: 0}, {x: 180, y: 50}],
  ]
 */
let seriesCoords = [];

// years `map` stores total GDP for the year across countries
const gdpTotalsByYear = new Map();
for (let year = startYear; year >= endYear; year -= yearInterval) {
  gdpTotalsByYear.set(year, 0);
}


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

function interpolateData(data) {
  let interpolatedData = data;
  
  let countryIndex = 0;
  for (let country in data){
    
    let countryObj = data[country];
    
    let firstZeroIndex;
    let isZeroSequence = false;
    let lastNonZeroYear;
    let lastNonZeroGDP;

    let zeroYears = [];
    
    _.forEach(countryObj, function(gdp, year) {
        
        if (gdp === 0) { 
          zeroYears.push(year);
          isZeroSequence = true;
        } else {
                  
          if (isZeroSequence) {
            if (lastNonZeroGDP) {
              let gdpDiff = gdp - lastNonZeroGDP;
              let yearsDiff = year - lastNonZeroYear;
              let gdpPerYearDiff = gdpDiff / yearsDiff;
              
              zeroYears.forEach(zeroYear => {
                interpolatedData[country][zeroYear] = ((zeroYear - lastNonZeroYear) * gdpPerYearDiff) + lastNonZeroGDP;
              })
            }

            isZeroSequence = false;
            zeroYears = [];
          } 

          lastNonZeroGDP = gdp;
          lastNonZeroYear = year;
        }        
      })
  }
  return interpolatedData;
}

function processData(data) {
  const filteredData = {};
  let yearsArray = Array.from(gdpTotalsByYear.keys());

  /* Filter out unneeded countries and years data */
  for (let country in data){
      if (countryList.indexOf(country) !== -1) {
        let countryObj = data[country];
        filteredData[country] = _.pick(countryObj, yearsArray);
      }
  }

  // Sum up GDP totals for the year and store in years map
  for (let year of gdpTotalsByYear.keys()) {
    for (let country in filteredData){
      let countryObj = filteredData[country];
      if (countryObj.hasOwnProperty(year)) {
        gdpTotalsByYear.set(year, gdpTotalsByYear.get(year) + countryObj[year]);
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
  svg.setAttribute('style', `width: ${canvasWidth}px; height: ${canvasHeight}px`);
  svg.setAttribute('viewBox', `0, 0, ${canvasWidth}, ${canvasHeight}`);

  const chartGroup = document.getElementById('chart-group')
  chartGroup.style.transform = `translateX(${labelColumnWidth}px)`
}

function drawChart(data) {  
  let countryIndex = 0;
  let polys = [];
  let points;

  let rowHeight = canvasHeight / (gdpTotalsByYear.size - 1); 
 
  for (let country in data) {
    let countryObj = data[country];

    seriesCoords[countryIndex] = [];

    let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute('fill', colorList[countryIndex % colorList.length]);
    poly.setAttribute('data-name', country);

    let yearIndex = 0;
    let x = 0;
    let y = 0;

    for (let year of gdpTotalsByYear.keys()) { 
      let gdpTotalForYear = gdpTotalsByYear.get(year);

      let width = ((countryObj[year] / gdpTotalForYear) * chartWidth);
      let xOffset = (countryIndex === 0) ? 0 : seriesCoords[countryIndex - 1][yearIndex].x;

      x = width + xOffset;
      y = yearIndex * rowHeight;
      
      seriesCoords[countryIndex].push({x, y});

      yearIndex++;
    }


    let points = '';
    seriesCoords[countryIndex].forEach(coord => {
      points += `${coord.x},  ${coord.y},`;
    });

    /* So far we've created points for the right edge of the shape. Now we need to work on the left
    side. To do this, we use the previous items right edge. */
    for (let i = gdpTotalsByYear.size - 1; i >= 0; i--) { 
      if (countryIndex === 0) {
        let coord = seriesCoords[countryIndex][i];
        points += `0,  ${coord.y},`;
      } else {
        let coord = seriesCoords[countryIndex - 1][i];
        points += `${coord.x},  ${coord.y},`;
      }
    }
    
    // Remove comma at end
    points = points.slice(0, -1);

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
    
  let yearIndex = 0;
  let height = 0;
  let polys = [];
  let frag = document.createDocumentFragment();

  let rowHeight = canvasHeight / (gdpTotalsByYear.size - 1); 

  for (let year of gdpTotalsByYear.keys()) {        
    let yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let textY = (yearIndex === 0) ? 10 : yearIndex  * rowHeight;

    // Draw year labels
    yAxisLabel.setAttribute('x', 0);
    yAxisLabel.setAttribute('y', textY);
    yAxisLabel.setAttribute('text-anchor', 'right');
    yAxisLabel.textContent = year;
    frag.appendChild(yAxisLabel);
    
    // Draw year lines    
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('x1', labelColumnWidth);
    line.setAttribute('y1', yearIndex  * rowHeight);
    line.setAttribute('x2', canvasWidth);
    line.setAttribute('y2', yearIndex  * rowHeight);
    line.classList.add('year-line');
    frag.appendChild(line);

    yearIndex++;
  }

  // Draw country labels
  let countryIndex = 0;
  for (let country in data) {
    let seriesLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    seriesLabel.setAttribute('text-anchor', 'middle');    
    seriesLabel.textContent = country;

    let countryObj = data[country];
    let widestArea = 0;
    let widestAreaIndex = 0;
    let countryCoords = seriesCoords[countryIndex];
    let prevCountryCoords = seriesCoords[countryIndex - 1];

    countryCoords.forEach((coord, index) => {
      if (index === 0 || index === countryCoords.length - 1) return;
      
      let areaWidth;
      if (countryIndex === 0) {
        areaWidth = coord.x;
      } else {
        areaWidth = coord.x - prevCountryCoords[index].x;  
      }

      if (areaWidth > widestArea) {
        widestArea = areaWidth;
        widestAreaIndex = index;
      }
    })
    
    seriesLabel.setAttribute('x', countryCoords[widestAreaIndex].x - (widestArea / 2) + labelColumnWidth);
    seriesLabel.setAttribute('y', countryCoords[widestAreaIndex].y + 3);

    frag.appendChild(seriesLabel);

    countryIndex++;
  }

  svgOverlay.appendChild(frag);
}

fetchData().then(data => {
  let interpolatedData = interpolateData(data);
  let processedData = processData(interpolatedData);
  resizeSVG();
  drawChart(processedData);
  drawOverlay(processedData);
})
</script>

