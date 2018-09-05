---
title: "GDP Histomap"
date: 2018-09-04
layout: post.njk
draft: true
---

<div class="center">

<svg class="histomap" viewBox="0 0 200 400">
  <rect x="0" y="0" width="200" height="400" fill="#eee" />
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

const width = 200;
const height = 400;

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

let gdpTotal2015 = 0;
let gdpTotal2010 = 0;

for (let country in countries) {
  gdpTotal2015 += countries[country][0];
  gdpTotal2010 += countries[country][1];
}

let us = countries['United States'];

console.log(gdpTotal2015, gdpTotal2010);

var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
poly.setAttribute('style', 'border: 1px solid black');
poly.setAttribute('points', `0, 0, ${us[0] / gdpTotal2015 * width}, 0, ${us[0] / gdpTotal2010 * width}, 50`);
// svg.setAttribute('height', '250');
// svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

document.querySelector('.histomap').appendChild(poly);


document.querySelector('rect').setAttribute('fill', '#fcc')
</script>

