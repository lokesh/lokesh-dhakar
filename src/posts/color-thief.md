---
title: "Color Thief"
date: 2011-11-03
comments: true
layout: post.njk
---
Ever wanted to grab the dominant color or color palette from an image? Probably not. But now you can! Take a look at the <a href="http://lokeshdhakar.com/projects/color-thief" class="loadPageInline">Color Thief Demo Page</a> to see it in action.

<div class="figure">
  <a href="http://lokeshdhakar.com/projects/color-thief/">
    <img src="/media/posts/color-thief/color-thief-pixels.png" alt="pixelated image" title="color thief example" />
  </a>
</div>

## Usecase #1: Color search

This script could be useful for sites that sort and search by color. But you should probably save your user's computer some work and handle the color processing on the server. A couple of color search site examples:

*   [Etsy Color Search][2]
*   [Dribbble Color Explorer][3]

## Usecase #2: Color adapting UI

With this script you can build a UI that adapts to the colors of an image. For example, you could add color accents to the UI by changing the font or border color depending on what image is currently being displayed in your portfolio. To get a bit fancier you could darken the dominant color and use it as a background color or invert the dominant color and use it as the text color. Fancy indeed!

A recent example of a color adapting UI is seen on Google Chrome's new home tab. The dominant color of the favicon is used as the bottom border color on the screenshot:

<div class="figure">
  <img style="max-width: 665px" src="/media/posts/color-thief/chrome-home-tab.png" alt="size screenshots of websites with favicons on top and bottom borders colored with the favicon dominant color" title="chrome_home_tab" />
</div>

## Usage

Include jquery, quantize.js, and color-thief.js on your page. Using the script is as simple as this:

<pre><code class="prism language-js line-numbers">myImage = $('#myImage');
dominantColor = getDominantColor(myImage);
paletteArray = createPalette(myImage, 10); // 2nd argument sets # of colors in palette
</code></pre>

Grab the code and read more on usage on [Github][4]. Dig through the code as well.

## Next steps

In the short term I'm not planning on doing any more work on the script. But if you'd like to make improvements or just clean up the code, please go for it!

[Demo Page][1] | [Github][4]

 [1]: http://lokeshdhakar.com/projects/color-thief/
 [2]: http://www.etsy.com/color.php
 [3]: http://dribbble.com/colors/
 [4]: https://github.com/lokesh/color-thief

<link rel="stylesheet" href="/css/prism-syntax-highlighting.css">

<script src="/js/prism.min.js"></script>
