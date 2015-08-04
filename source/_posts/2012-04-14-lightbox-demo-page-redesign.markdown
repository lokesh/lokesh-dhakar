---
layout: post
title: "Lightbox2 page redesign"
date: 2012-04-14 22:03
comments: true
categories: 
---
It's hard to imagine that I released the <a href="http://lokeshdhakar.com/projects/lightbox2">Lightbox2 script</a> almost 5 years ago! The script still gets a fair bit of use. I spent an evening giving the demo page a fresh coat of paint. Use the slider on the right to see the new design.

<div id="wiper" class="wiper lightboxPageRedesign">

  <a href="http://lokeshdhakar.com/projects/lightbox2" class="button pageButton">Click to view</a>
  <div class="wiperPages">
    <a href="http://lokeshdhakar.com/projects/lightbox2">
      <div class="page2shine"></div>
    </a>
    <div class="page1">
      <img src="{{ root_url }}/assets/posts/lightbox-page-redesign/lightbox-page-old.jpg" alt="old Lightbox 2 demo page" class="scale page1" />
    </div>
    <div class="page2">

        <img src="{{ root_url }}/assets/posts/lightbox-page-redesign/lightbox-page-new.jpg" alt="new Lightbox 2 demo page" class="scale page2" />
    </div>
  </div>
  
  <div class="wiperSlider container">
    <div href="#" class="wiperSliderButton"></div>
    <div class="wiperSlide"></div>
  </div>

</div>

## Changes behind the scenes
I didn't add any new features to Lightbox but I did do some tinkering behind the scenes:

*   Now using jQuery. Previously Prototype and Scriptaculous.
*   Javascript written in [Coffeescript](http://coffeescript.org/).
*   CSS written with [SASS](http://sass-lang.com/) &amp; [Compass](http://compass-style.org/).
*   Code available on [Github](https://github.com/lokesh/lightbox2)


<script>
  $LAB
    .script("{{ root_url }}/javascripts/libs/jquery-1.7.1.min.js").wait()
    .script("{{ root_url }}/javascripts/libs/jquery-ui-1.8.18.custom.min.js").wait()
    .script("{{ root_url }}/javascripts/libs/jquery.ui.touch-punch.min.js").wait()
    .script("{{ root_url }}/javascripts/posts/lightbox-page-redesign.js");
</script>
