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

<style>
.histomap {
}
</style>

<!-- <script src="/js/jquery-3.3.1.min.js"></script> -->

<script>

/* https://stackoverflow.com/a/5092872/400407 */
function randHex() {
  return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}

document.querySelector('rect').setAttribute('fill', '#fcc')

const width = 200;
const height = 300;


// let countries = new Map([
//   ['United States', [18, 14, 13, 10]],
//   ['China', [11, 5, 2, 1]],
//   ['Japan', [4, 5, 4, 4]],
//   ['Germany', [4, 5, 4, 4]],
//   ['India', [2, 1, 0, 0]]]);

const countries = {
  /* or
    'United States': {
      2015: 18,
      2010: 14,
      2005: 13,
      2000: 10
      },
  */
  'United States': [18, 14, 13, 10],
  'China': [11, 5, 2, 1],
  'Japan': [4, 5, 4, 4],
  'Germany': [4, 5, 4, 4],
  'India': [2, 1, 0, 0],
}


const YEARS = 4;

let gdpTotals = new Array(YEARS).fill(0);
let gdpCounter = new Array(YEARS).fill(0);

for (let i = 0; i < YEARS; i++) {
  for (let country in countries) {
    gdpTotals[i] += countries[country][i];
  }
}


let polys = [];

let points;


for (let countryName in countries) {
  let country = countries[countryName]

  let poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  poly.setAttribute('fill', randHex());

  points = '0, 0';
  for (let i = 0; i < YEARS; i++) {
    points += `, ${(country[i] + gdpCounter[i]) / gdpTotals[i] * width}, ${i * (height / (YEARS - 1))}`;
    gdpCounter[i] += country[i];
  }

  points += `, 0, ${height}`
  poly.setAttribute('points', points);

  console.log(points);
  polys.push(poly);
}


let frag = document.createDocumentFragment()

for (let i = polys.length - 1; i >= 0; i--) {
  frag.appendChild(polys[i]);  
}

document.querySelector('.histomap').appendChild(frag);
</script>

