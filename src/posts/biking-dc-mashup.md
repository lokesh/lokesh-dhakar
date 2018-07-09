---
title: "Biking DC mashup"
date: 2008-11-24 22:42
comments: true
sharing: true
layout: post.njk
---
## DC's bike lanes and routes drawn on a Google Map.

Inspired by the [Apps for Democracy][2] contest which encouraged developers to build useful applications from [DC's Data Catalog][3], I built a Google Maps mashup which displays bike lanes and signed bike routes. Use the map as a starting to point to plan your ride through the city.

 [1]: http://lokeshdhakar.com/projects/bikingdc/
 [2]: http://www.appsfordemocracy.org/
 [3]: http://data.octo.dc.gov/

<figure class="figure">
  <a href="http://www.lokeshdhakar.com/projects/bikingdc/" class="loadPageInline"><img src="/media/posts/biking-dc-mashup/biking-dc-map.png" /></a>
</figure>

### Tech Notes

The '[Bicycle Lane][4]' and '[Signed Bike Route][5]' KMZ files from the DC Data Catalog are used. Data is pulled daily. Before displaying, the files are filtered to display only existing bike lanes.

 [4]: http://dcatlas.dcgis.dc.gov/catalog/info.asp?info=2315&pagesize=10&page=1&search_type=search_by_keyword&keyword=bicycle
 [5]: http://dcatlas.dcgis.dc.gov/catalog/info.asp?info=1483&pagesize=10&page=1&search_type=search_by_keyword&keyword=bike
