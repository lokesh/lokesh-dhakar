---
title: "Snappy mobile web interactions"
date: 2020-10-17
layout: post.njk
draft: true
---

<!--
or trigger click on pointer down?

If you're building a mobile web app or game and you want the interactions to feel responsive, like native actions, there are a few tricks.

What if you simple add a click handler to a button? Notice that there is a small delay before the tap registers. It's small, but it could be better.

To get these gains, we need to understand what events fire when the user taps or clicks with a mouse on our button.

[ diagram ]

If we look at the sequence of events that fire, we see that the click event fires about 60-70ms~ after the pointerdown event.

pointerdown works with both touch and mouse events.

touchstart and click



Note!
A keyboard is not a pointer device. So the pointerdown event does not fire. If you use a standard 
-->


<div class="events-grid">
  <h3 class="column-heading">
    Mouse click
  </h3>
  <h3 class="column-heading">
    Tap
  </h3>
  <h3 class="column-heading">
    Keyboard press
    (space or enter)
  </h3>
  <div>
    <div class="pointer">pointerdown</div>
    <div class="mouse">mousedown</div>
    <div class="pointer">pointerup</div>
    <div class="mouse">mouseup</div>
    <div class="all">click</div>
  </div>
  <div>
    <div class="pointer">pointerdown</div>
    <div class="touch">touchstart</div>
    <div class="pointer">pointerup</div>
    <div class="touch">touchend</div>
    <div class="mouse">mousedown</div>
    <div class="mouse">mouseup</div>
    <div class="all">click</div>
  </div>
  <div>
    <div class="all">click</div>
  </div>
</div>

<style>
.column-heading {
  text-align: center;  
  margin-bottom: 0;
}

.events-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: calc(var(--gutter) * 2);
  grid-row-gap: var(--gutter);
}

.events-grid div div {
  font-size: 0.875rem;
  font-family: var(--monospace);
  padding: 8px;
  margin-bottom: 8px;
  border-radius: var(--radius);
  border-width: 2px;
  border-style: solid;
  font-weight: bold;
}

.mouse {
  color: #3971ED;
  border-color: #3971ED;
}

.touch {
  color: #F96A38;
  border-color: #F96A38;
}

.pointer {
  color: #198844;
  border-color: #198844;
}

.all {
  color: #A36AC7;
  border-color: #A36AC7;
}
</style>


<script>
</script>
