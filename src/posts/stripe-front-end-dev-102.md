---
title: "Stripe front-end dev 102"
date: 2019-01-07
layout: post.njk
draft: true
---
<h2 class="page-subtitle">Reverse engineering the _logo bubbles_</h2>

<div class="figure">
    <video style="width: 100%; max-width: 720px" autoplay loop muted playsinline>
        <source src="/media/posts/stripe/102/logo-bubbles.mp4" type="video/mp4" />
    </video>
</div>

This is the second article in the series where we reverse engineer elements from <em>Stripe.com</em>. In the [first article](stripe-front-end-dev-101/) we focused on static elements. In this one, we'll make things <em>move</em>!

Let's see if we can recreate the logo bubbles (see movie above) from the [Stripe Customers page](https://stripe.com/us/customers). At-a-glance we can see a few interesting challenges:

1. Randomly generating and placing the bubbles on page load
2. Animating the smooth up and down movement
3. Looping the animation infinitely

Our strategy for this will be to work on the atomic elements (the bubbles), then on placing them, and finally animating them.

## Part 1: Creating the bubbles

### Set up an empty bubble

Create an element with equal width and height, and then turn this square into a circle by setting `border-radius: 50%`. If you want to nerd out about how exactly a border-radius value affects a shape, check out this [Stackoverflow answer](https://stackoverflow.com/a/29966500/400407).

<p data-height="270" data-theme-id="minimal" data-slug-hash="WLKEJP" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Logo Bubble 1.0" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/WLKEJP/">Stripe - Logo Bubble 1.0</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Add the logos

Stripe uses a spritesheet for all the logos. A spritesheet is an image file, in this case a PNG, that has all the different assets stitched together.

<div class="figure">
  <img style="max-width: 480px;" src="/media/posts/stripe/102/logo-spritesheet.png" alt="A grid of company logos.">
</div>

Why not save each logo as a separate image file? Because each image file would require a new HTTP request.  And browsers limit the numbe of HTTP connnections from the same domain.



<div class="note note-design" style="display: none">
  <svg class="note-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
  <div class="note-text">
    <div class="note-tag">Design</div>
    <p>This decision seems to be less about highlighting certain elements of the code because they have elevated importance, but rather to introduce some dynamism to the visuals.</p>
  </div>
</div>


<style>
:root {
  --debug-color: #7795f8;
  --design-color: #7ec699;
  --design-text-color: #62b17c;
}

.note {
  display: flex;
  align-items: flex-start;
  max-width: var(--text-max-width);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-large);
  padding: 8px;
  margin-bottom: 16px;
}

.note-icon {
  flex: 0 0 auto;
}

.note svg {
  stroke: currentColor;
}

.note-text {
  margin-left: 12px;
  font-size: 14px;
}

.note-text p {
  margin-top: 0;
}

.note-text p:last-child {
  margin-bottom: 0;
}

.note-text ol {
  padding-left: 0;
}

.note-tag {
  margin-top: -2px;
  margin-bottom: 2px;
  color: var(--secondary-color);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.note-debug {
  color: var(--debug-color);
  border-color: var(--debug-color);
}

.note-debug .note-tag {
  color: var(--debug-color);
  border-color: var(--debug-color);
}

.note-design {
  color: var(--design-color);
  border-color: var(--design-color);
}

.note-design .note-tag {
  color: var(--design-text-color);
  border-color: var(--design-color);
}

.note-debug .note-text,
.note-design .note-text {
  color: var(--color);
}

.figure {
  display: inline-block;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-large);
  margin-bottom: 8px;
}

.figure.no-border {
  border: 0;
}

.figure img {
  width: 100%;
  margin-bottom: 0;
  border-radius: var(--border-radius-large);
}

/* Codepen Embeds */
.cp_embed_wrapper,
iframe {
  margin: 48px 0;
}


@media (max-width: 400px) {
  iframe[src*="codepen.io"] {
    width: 360px !important;
  }
}

@media (max-width: 360px) {
  iframe[src*="codepen.io"] {
    width: 320px !important;
  }
}

</style>
