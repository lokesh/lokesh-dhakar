---
title: "The GDP Histomap"
date: 2018-09-20
layout: post.njk
---

<button class="button-text" id="histomap-customize-button">Customize chart&hellip;</button>

<div id="histomap-form" class="col--720">

  <div class="histomap-form-row">
    <div class="histomap-form-row-label">
      Timeline:
    </div>
    <div class="histomap-form-row-controls">
      <select id="histomap-start-year-input"></select>
      to
      <select id="histomap-end-year-input">
        <option>2015</option>
      </select>
      with data every
      <select id="histomap-interval-input">
        <option value="1">1 year</option>
        <option value="2">2 years</option>
        <option value="5" selected>5 years</option>
        <option value="10">10 years</option>
        <option value="20">20 years</option>
      </select>
    </div>
  </div>

  <div class="histomap-form-row">
    <div class="histomap-form-row-label">
      Countries:
    </div>
    <div id="histomap-form-countries" class="histomap-form-row-controls">
    </div>
  </div>
</div>


<h2 class="histomap-title col--720">
  <span class="histomap-title-line-1">200 Years of Economic History</span><br>
  <span class="histomap-title-line-2">Relative Power as told by Real GDP</span>
</h2>


<div class="col--720">

<svg id="histomap">
  <g id="chart-group"></g>
  <g id="overlay-group"></g>
</svg>

</div>

<p class="citation">Data provided by Maddison Project Database, version 2018. Bolt, Jutta, Robert Inklaar, Herman de Jong and Jan Luiten van Zanden (2018), “Rebasing ‘Maddison’: new income comparisons and the shape of long-run economic development”, [Maddison Project Working paper 10](https://www.rug.nl/ggdc/historicaldevelopment/maddison/research)
</p>


## The original _Histomap_

This chart is inspired by John B. Sparks' work, [The Histomap](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~200375~3001080:The-Histomap-),
published in 1931. The original work was an attempt to visualize 4000 years of civilization into a
set of colorful flows on a five foot (1.5m) tall chart. It was ambitious... but flawed. Daniel Brownstein
does a thorough critique of John B. Spark's _Histomap_ on his blog, [Musings on Maps](https://dabrownstein.com/2013/08/13/reading-the-histomap/).

## The GDP Histomap

This chart is less abmitious. Where the original tried to show and explain
the march of civilization over millennia, the goal of this new chart is to map out the relative
economic power of countries in the past two centuries. And rather than an
undefined _power_ measure for the x-axis, the new chart uses Real GDP.

**What is GDP?** aka Nominal GDP. The sum of the prices of all finished goods and services a
country produces. Inflation and the cost of good will increase GDP, though the number of goods is
not increasing.

**How is Real GDP different?** aka GDP PPP (Purchasing Power Parity). This measure controls for
inflation and uses the same set of prices for goods and services over time. This measure is better
than nominal GDP for comparing countries and is the metric used in the chart.

---

## Behind the scenes

The chart is generated on-the-fly, with vanilla Javascript used to create SVG shapes and text.

- [Blog post source code](https://raw.githubusercontent.com/lokesh/lokesh-dhakar/master/src/posts/gdp-histomap.md) - All the chart generation code lives here.
- [GDP Data from Maddison Project Database ](https://www.rug.nl/ggdc/historicaldevelopment/maddison/research) - Source dataset.
- [Processed GDP data as JSON](https://github.com/lokesh/lokesh-dhakar/blob/master/src/data/gdp-by-country-interpolated.json) - Subset of the source dataset with gaps interpolated.



<link rel="stylesheet" href="/css/forms.css">

<style>
/*.col--720 {
  width: 720px;
}
*/
@media (min-width: 748px) {
/*  .col--720 {
    width: 720px;
  }*/
}

.histomap-title {
  margin-bottom: 0.5rem;
 /* Offset a bit to make it optically centered with the chart, excluding y-axis label column. */
  margin-left: 8px;
  font-weight: var(--weight-x-bold);
  line-height: 1rem;
  text-transform: uppercase;
  text-align: center;
}

.histomap-title-line-1 {
  font-size: 1rem;
}

.histomap-title-line-2 {
  font-size: 0.75rem;
}

#histomap {
  overflow: visible;
}

#overlay-group {
  font-weight: var(--weight-x-bold);
  font-size: 0.625rem;
  text-transform: uppercase;
}

.year-line {
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 1;
  stroke-dasharray: 4;
}

.citation {
  font-size: 0.75rem;
}

#histomap-form {
  display: none;
  font-size: 0.8125rem;
}
#histomap-form select {
  font-size: 0.8125rem;
}

#histomap-form.open {
  display: block;
}

#histomap-customize-button {
  display: block;
  text-align: left;
  width: 100%;
  padding-bottom: 8px;
  margin-bottom: 4px;
  border-bottom: 1px solid #eee;
}

@media (min-width: 480px) {
  #histomap-form {
    display: block;
  }
  #histomap-customize-button {
    display: none;
  }
}



.histomap-form-row {
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 4px;
  border-bottom: 1px solid #eee;
}

.histomap-form-row:first-of-type {
  padding-top: 8px;
  border-top: 1px solid #eee;
}

.histomap-form-row-label {
  font-weight: var(--weight-x-bold);
  flex: 0 0 6em;
}
</style>

<script src="/js/lodash-core.min.js"></script>

<script>
// --------------
// UTIL FUNCTIONS
// --------------

// Color function for use in generating our hover color changes
// https://stackoverflow.com/a/13542669/400407
function shadeBlend(p,c0,c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    }else{
        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
}

// ------
// CONFIG
// ------

/* SVG sizing and colors */
const canvasMaxWidth = 720;
const canvasAspectRatio = 2; // height / width

const labelColumnWidth = 34;

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

/* The range of data available. */
const yearMax = 2015;
const yearMin = 1820;

/* The current range shown in the chart */
let startYear = 2015;
let endYear = 1820;
let yearInterval = 5;

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
  'United States'
]


// ----------
// SETUP FORM
// ----------

function buildForm() {

  // Build country inputs
  let countriesHTML = '';
  countryList.forEach(country => {
    countriesHTML += `
      <label class="checkbox-label">
        <input class="checkbox" type="checkbox" name="country" value="${country}" checked>
        ${country}
      </label>`;
  });

  // Build start and end year inputs
  let startYearOptionsHTML = '';
  for (let i = yearMax; i >= yearMin; i--) {
    let selected = (startYear === i) ? 'selected': '';
    startYearOptionsHTML += `<option ${selected}>${i}</option>`
  }

  let endYearOptionsHTML = '';
  for (let i = yearMax; i >= yearMin; i--) {
    let selected = (endYear === i) ? 'selected': '';
    endYearOptionsHTML += `<option ${selected}>${i}</option>`
  }

  // Apend to DOM
  const countriesEl = document.getElementById('histomap-form-countries');
  const startYearInputEl = document.getElementById('histomap-start-year-input');
  const endYearInputEl = document.getElementById('histomap-end-year-input');

  countriesEl.insertAdjacentHTML('beforeend', countriesHTML);
  startYearInputEl.insertAdjacentHTML('beforeend', startYearOptionsHTML);
  endYearInputEl.insertAdjacentHTML('beforeend', endYearOptionsHTML);

  // Add event handlers
  document.getElementById('histomap-customize-button').addEventListener('click', (event) => {
    document.getElementById('histomap-form').classList.add('open');
    event.target.style.display = 'none';
  });

  document.querySelectorAll('input[name=country]').forEach(input => {
    input.addEventListener('change', event => {
      refresh();
    })
  });

  document.getElementById('histomap-start-year-input').addEventListener('input', (event) => {
    startYear = event.target.value;
    refresh();
  })
  document.getElementById('histomap-end-year-input').addEventListener('input', (event) => {
    endYear = event.target.value;
    refresh();
  })
  document.getElementById('histomap-interval-input').addEventListener('input', (event) => {
    yearInterval = event.target.value;
    refresh();
  })


}


function refresh() {
  // Countries
  countryList = [];
  document.querySelectorAll('input[name=country]:checked').forEach(input => {
    countryList.push(input.value);
  });

  processData();
  drawChart();
  drawOverlay();
}

// ----------
// GLOBALS
// ----------

let rawData;
let processedData;

// Set in the resizeSVG function
let canvasWidth;
let canvasHeight;

let chartWidth;
let chartHeigh;


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


// --------------------
// GENERATE CSS CLASSES
// --------------------

let styleTag = document.createElement('style');
let seriesCSS = '';

colorList.forEach((color, index) => {
  seriesCSS += `
    .series-color-${index}{
      fill: ${color};
    }
    /*
    .series-color-${index}:hover{
      fill: ${shadeBlend(-0.5, color)};
      transition: none;
    }
    */
    `;
});

// Append new styles to DOM
if (styleTag.styleSheet) {
    styleTag.styleSheet.cssText = seriesCSS;
} else {
    styleTag.appendChild(document.createTextNode(seriesCSS));
}
document.head.appendChild(styleTag);


// ----------
// FETCH DATA
// ----------

function fetchData() {
  return fetch('/data/gdp-by-country-interpolated.json')
    .then((response) => {
      return response.json();
    })
}


// ------------
// PROCESS DATA
// ------------

/*
  interpolateData();
  This function is not actively called. It was used to process the JSON in gdp-by-country.json. The
  output of which is stored in gdp-by-country-interpolated.json.

  The function replaces the zero values in each country's gdp data with an interpolated value. One
  exception, if the data start with a zero value or a string of zero values, these initial zero
  values will not be interpolated.

  Example INPUT:
   "Brazil": {
    "1800": 0,
    "1810": 200,
    "1820": 0,
    "1830": 0,
    "1840": 300
   }

  Example OUTPUT:
   "Brazil": {
    "1800": 0,
    "1810": 200,
    "1820": 233.333,
    "1830": 266.666,
    "1840": 300
   }

function interpolateData(data) {
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
*/

function processData() {
  // Reset gdp totals
  gdpTotalsByYear.clear();
  for (let year = startYear; year >= endYear; year -= yearInterval) {
    gdpTotalsByYear.set(year, 0);
  }

  const filteredData = {};
  let yearsArray = Array.from(gdpTotalsByYear.keys());

  /* Filter out unneeded countries and years data */
  for (let country in rawData){
      if (countryList.indexOf(country) !== -1) {
        let countryObj = rawData[country];
        filteredData[country] = _.pick(countryObj, yearsArray);
      }
  }

  // Sum up GDP totals for the year and store in years map
  for (let year of gdpTotalsByYear.keys()) {
    for (let country in filteredData){
      let countryObj = filteredData[country];
      if (!countryObj.hasOwnProperty(year)) {
        filteredData[country][year] = 0;
      }
      gdpTotalsByYear.set(year, gdpTotalsByYear.get(year) + countryObj[year]);
    }
  }

  processedData = filteredData;
}

// ----
// DRAW
// ----

function resizeSVG() {
  // 24 = left and right side padding for page at mobile resolution
  let width = Math.min( (window.innerWidth - 24), canvasMaxWidth)

  canvasWidth = width;
  canvasHeight = canvasAspectRatio * canvasWidth;

  chartWidth = canvasWidth - labelColumnWidth;
  chartHeight = canvasHeight;


  const svg = document.getElementById('histomap');
  svg.setAttribute('style', `width: ${canvasWidth}px; height: ${canvasHeight}px`);
  svg.setAttribute('viewBox', `0, 0, ${canvasWidth}, ${canvasHeight}`);

  const chartGroup = document.getElementById('chart-group')
  chartGroup.style.transform = `translateX(${labelColumnWidth}px)`
}


function drawChart() {
  let countryIndex = 0;
  let polys = [];
  let points;

  let rowHeight = canvasHeight / (gdpTotalsByYear.size - 1);

  for (let country in processedData) {
    let countryObj = processedData[country];

    seriesCoords[countryIndex] = [];

    let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.classList.add(`series-color-${countryIndex % colorList.length}`);
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

  let chartEl = document.getElementById('chart-group');
  chartEl.innerHTML = '';
  chartEl.appendChild(frag);
}


function drawOverlay() {
  let yearIndex = 0;
  let height = 0;
  let polys = [];
  let frag = document.createDocumentFragment();

  let rowHeight = canvasHeight / (gdpTotalsByYear.size - 1);

  for (let year of gdpTotalsByYear.keys()) {
    let yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    // Hardcoded y pos for first year label and finessed others to get them to
    // line up with year lines
    let textY = (yearIndex === 0) ? 5 : yearIndex  * rowHeight + 3;

    // Draw year labels
    yAxisLabel.setAttribute('x', 0);
    yAxisLabel.setAttribute('y', textY);
    yAxisLabel.setAttribute('text-anchor', 'right');
    yAxisLabel.textContent = year;
    frag.appendChild(yAxisLabel);

    // Draw year lines (except for first and last years)
    if (yearIndex !== 0 && yearIndex !== gdpTotalsByYear.size - 1) {
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute('x1', labelColumnWidth);
      line.setAttribute('y1', yearIndex  * rowHeight);
      line.setAttribute('x2', canvasWidth);
      line.setAttribute('y2', yearIndex  * rowHeight);
      line.classList.add('year-line');
      frag.appendChild(line);
    }

    yearIndex++;
  }

  // Draw country labels
  let countryIndex = 0;
  for (let country in processedData) {
    let seriesLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    seriesLabel.setAttribute('text-anchor', 'middle');
    seriesLabel.textContent = country;

    let countryObj = processedData[country];
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

    // The labels can overlap the year labels on the left. To avoid this issue,
    // set a min.  55 works for most cases.
    let seriesLabelX = Math.max(countryCoords[widestAreaIndex].x - (widestArea / 2) + labelColumnWidth, 57)
    seriesLabel.setAttribute('x', seriesLabelX);
    seriesLabel.setAttribute('y', countryCoords[widestAreaIndex].y + 3);

    frag.appendChild(seriesLabel);

    countryIndex++;
  }

  const overlayEl = document.getElementById('overlay-group');
  overlayEl.innerHTML = '';
  overlayEl.appendChild(frag);
}


// ----
// INIT
// ----

buildForm();

fetchData().then(data => {
  rawData = data;
  processData();
  resizeSVG();
  drawChart();
  drawOverlay();
})
</script>

