---
title: "Baseball pitches illustrated"
date: 2007-09-20
comments: true
sharing: true
layout: post.njk
highlight: true
---

<style>
.intro-illustration {
  float: right;
}

.intro-illustration img {
  width: 100px;
  margin: 0 0 8px 8px;
}

@media (min-width: 800px) {
  .intro-illustration {
    position: absolute;
    left: calc(var(--text-max-width) + 48px);
  }
}

.pitch {
  display: flex;
  max-width: var(--text-max-width);
  padding-top: 32px;
  margin-top: 32px;
  border-top: 1px solid #ddd;
}

.pitch:last-of-type {
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid #ddd;
}

.pitch__figure {
  margin-right: 16px;
}

.pitch__title {
  margin: 0 0 0.5em 0;
}

.pitch__speed {
  margin: 0 0 0.5em 0;
}

.pitch__notes {
  margin-top: 0.6em;
}
</style>

<figure class="intro-illustration">
  <img src="/media/posts/baseball-pitches-illustrated/bloop_curve.svg" alt="Arc of a bloop curve pitch" />
</figure>


<h2 class="post-subtitle">A fan's guide to identifying pitches</h2>

I'm a baseball fan. I've watched my share of televised games and attended a few handful. After all this, I was still in the dark about the difference between pitches. I knew a curveball broke downwards, but what exactly was a circle changeup?

The diagrams below are the results of skimming through baseball books and doing online research. This is not a complete guide. I've picked twelve of the more common pitches:

*   **Fastballs**: Four-seam, Two-seam, Cutter, Splitter, and Forkball
*   **Breaking Balls**: Curveball, Slider, Slurve, and Screwball
*   **Changeups**: Changeup, Palmball, Circle Changeup

### Learning to identify pitches

The list of pitches might seem like a lot to keep track of, but remember that each pitcher utilizes only a selection of these pitches. For example, Pedro Martinez throws a curveball, circle-changeup, an occasional slider, and a fastball. Do a little research on the pitcher before the game.

Things to watch for that will help you identify a pitch:

*   **Speed**
*   **Movement** - the general direction the ball is moving
*   **Break** - a sudden shift in direction

There are a few other things that can help you identify a pitch: ball rotation, point of release, and grip. For a casual fan though, it might be a bit much and I don't illustrate or discuss any of the latter three items.

### Reading the diagrams

Take note of the speed, movement, and break of the ball. Don't worry about where the baseball is shown in the the strike zone. You can throw a fastball in the middle of the strike-zone like the one illustrated, or you can throw one high and away from the batter. It's still a fastball. Location doesn't determine the pitch.


<div class="pitch" id="fourseam">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/four_seam_fastball.svg" alt="four seam fastball pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Four-seam Fastball</h3>
    <h4 class="pitch__speed" style="color:#ef4029;">
      85-100 mph
    </h4>
    <p class="pitch__notes">
      Fastest, straightest pitch. Little to no movement.
    </p>
  </div>
</div>

<div class="pitch" id="twoseam">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/two_seam_fastball.svg" alt="two seam fastball pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Two-seam Fastball</h3>
    <h4 class="pitch__speed" style="color:#f1572a;">80-90 mph</h4>
    <p class="pitch__notes">
      Also known as a Sinker. Moves downward, and depending on the release, will sometimes run in on a right handed hitter (RHH).
    </p>

  </div>
</div>

<div class="pitch" id="cutter">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/cutter.svg" alt="cutter pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Cutter</h3>
    <h4 class="pitch__speed" style="color:#ef4029;">85-95 mph</h4>
    <p class="pitch__notes">
      Breaks away from a right handed hitter (RHH) as it reaches the plate. Mix of a <a href="#slider">slider</a> and a <a href="#fourseam">fastball</a>. Faster than a slider but with more movement than a fastball.</p>
  </div>
</div>

<div class="pitch" id="splitter">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/splitter.svg" alt="splitter pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Splitter</h3>
    <h4 class="pitch__speed" style="color:#f1572a;">80-90 mph</h4>
    <p class="pitch__notes">
      Breaks down suddenly before reaching plate.
    </p>
  </div>
</div>

<div class="pitch" id="forkball">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/forkball.svg" alt="forkball pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Forkball</h3>
    <h4 class="pitch__speed" style="color: #f36e27;">75-85 mph</h4>
    <p class="pitch__notes">
      Like a <a href="#splitter">splitter</a>, but with a less dramatic, more gradual downward movement.
    </p>
  </div>
</div>

<div class="pitch" id="curveball">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/curveball.svg" alt="curveball pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Curveball</h3>
    <h4 class="pitch__speed" style="color: #f68727;">70-80 mph</h4>
    <p class="pitch__notes">
      Commonly called a 12-6 curveball. The 12-6 refers to the top to bottom movement (picture a clock with hands at 12 and 6).
    </p>
  </div>
</div>

<div class="pitch" id="slider">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/slider.svg" alt="slider pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Slider</h3>
    <h4 class="pitch__speed" style="color: #f1572a;">80-90 mph</h4>
    <p class="pitch__notes">
      Breaks down and away from a <acronym title="Right Handed Hitter">RHH</acronym>. Between a <a href="#fourseam">fastball</a> and a <a href="#curve">curve</a>.
    </p>
  </div>
</div>

<div class="pitch" id="slurve">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/slurve.svg" alt="slurve pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Slurve</h3>
    <h4 class="pitch__speed" style="color: #f68727;">70-80 mph</h4>
    <p class="pitch__notes">
      11-5 movement. Similar to a curve but with more lateral movement.
    </p>
  </div>
</div>

<div class="pitch" id="screwball">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/screwball.svg" alt="screwball pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">Screwball</h3>
    <h4 class="pitch__speed" style="color: #f9a024;">
      65-75 mph
    </h4>
    <p class="pitch__notes">
      1-7 movement. Opposite of the <a href="#slurve">slurve</a>.
    </p>
  </div>
</div>

<div class="pitch" id="changeup">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/changeup.svg" alt="changeup pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">
      Changeup
    </h3>
    <h4 class="pitch__speed" style="color: #f58741;">
      70-85 mph
    </h4>
    <p class="pitch__notes">
      Slower than a <a href="#fourseam">fastball</a>, but thrown with the same arm motion.
    </p>
  </div>
</div>

<div class="pitch" id="palmball">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/palmball.svg" alt="palmball pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">
      Palmball
    </h3>
    <h4 class="pitch__speed" style="color: #f9a042">
      65-75 mph
    </h4>
    <p class="pitch__notes">
      Ball is gripped tightly in palm. Just like a changeup, this pitch is slower than a <a href="#fastball">fastball</a>, but thrown with the same arm motion.
    </p>
  </div>
</div>

<div class="pitch" id="circle">
  <img class="pitch__figure" src="/media/posts/baseball-pitches-illustrated/circle_change.svg" alt="circle changeup pitch diagram" />
  <div class="pitch__body">
    <h3 class="pitch__title">
    Circle Changeup
    </h3>
    <h4 class="pitch__speed" style="color: #f68727;">
      70-80 mph
    </h4>
    <p class="pitch__notes">
      A changeup with 1-7 moment like the <a href="#screwball">screwball</a>.
    </p>
  </div>
</div>

### PDF Download

All twelve pitch diagrams, minus the text notes, are collected onto a <a href="/media/posts/baseball-pitches-illustrated/baseball_pitches.pdf" class="big-icon">single page PDF</a>.

 [1]: #fourseam
