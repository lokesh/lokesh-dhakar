---
title: "Stripe front-end dev 102"
date: 2019-01-13
layout: post.njk
---
<h2 class="page-subtitle">Reverse engineering the _logo bubbles_</h2>

<div class="figure figure__video">
    <video style="width: 100%; max-width: 720px" autoplay loop muted playsinline>
        <source src="/media/posts/stripe/102/logo-bubbles.mp4" type="video/mp4" />
    </video>
</div>

<a href="#final-example">↓ Skip to the finished result</a>

This is the second article in the series where we reverse engineer elements from <em>Stripe.com</em>. In the [first article](stripe-front-end-dev-101/) we focused on static elements. In this one, we'll make things <em>move</em>!

Let's see if we can recreate the logo bubbles (see movie above) from the [Stripe Customers page](https://stripe.com/us/customers). At-a-glance we can see a few interesting challenges:

1. Randomly generating and placing the bubbles on page load
2. Animating the smooth up and down movement
3. Looping the animation infinitely

Our strategy for this will be to work on the atomic elements (the bubbles), then on placing them, and finally animating them.

## Part 1: Creating the bubble

### Set up an empty bubble

Create an element with equal width and height, and then turn this square into a circle by setting `border-radius: 50%`. If you want to nerd out about how exactly a border-radius value affects a shape, check out this [Stackoverflow answer](https://stackoverflow.com/a/29966500/400407).

<p data-height="270" data-theme-id="minimal" data-slug-hash="WLKEJP" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Logo Bubble 1.0" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/WLKEJP/">Stripe - Logo Bubble 1.0</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Add the logo

Stripe combines all the logos into a single image file, which is called a spritesheet. You can see it here:

<div class="figure max-width">
  <img src="/media/posts/stripe/102/logo-spritesheet.png" alt="A grid of company logos.">
</div>

Using a **spritesheet** is a handy technique to reduce the number of HTTP requests the browser has to make. In this case, 1 file vs 43 files, a big performance win.

Now back to our code&hellip; we'll take the logo spritesheet and set it as the background for each of the bubbles. We'll then adjust the size the spritesheet with the `background-size` CSS property so that one logo in the image is the size of one bubble.


```
.bubble {
  background-image: url(stripe-logo-bubbles-spritesheet.png);
  background-size: 1076px 1076px;
}
```

 And then we can use the `background-position` property to shift the image's position in each bubble and reveal different logos.

 ```
.logo1 {
  background-position: 0 0;
}

.logo2 {
  background-position: 0 -154px;
}

.logo3 {
  background-position: 0 -308px;
}
```

<p data-height="300" data-theme-id="35671" data-slug-hash="Ydjrad" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Logo Bubble 1.1 - Add logos" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/Ydjrad/">Stripe - Logo Bubble 1.1 - Add logos</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

We'll create the rest of the bubbles in the next section, and we'll do it dynamically with Javascript.

## Part 2: Placing and sizing the bubbles

To better understand the placement and sizing logic used, let's take a bird's eye view of the entire header. To do this, open your browser's dev tools and apply <code>transform: scale(0.2)</code> to the header area. This is what we see:

<div class="figure">
  <img src="/media/posts/stripe/102/logo-bubbles-panoramic.png" alt="A wide image of company logos in circles.">
</div>

There isn't a quickly discernable pattern. But one thing we notice is that the general placement and sizing of the bubbles is the same on every page load, it's just the logos that are randomized.

Let's peek at the original code to see if we can get to the bottom of this:

<div class="figure max-width">
  <img src="/media/posts/stripe/102/bubbles-array.gif" alt="A wide image of company logos in circles.">
</div>

Found it! The positions and sizes are hard coded into an array called <code>bubbles</code>. Let's copy and paste the array in our code and use it to generate all the bubbles on the fly. We won't worry about randomizing the logos for this exercise.

```
const bubbles = [{
    s: .6,
    x: 1134,
    y: 45
}, {
    s: .6,
    x: 1620,
    y: 271
},
    ...
];

bubbles.forEach((bubble, index) => {
  let el = document.createElement("div");

  el.className = `bubble logo${index + 1}`;
  el.style.transform = `translate(${bubble.x}px, ${bubble.y}px) scale(${bubble.s})`;

  bubblesEl.appendChild(el);
})
```

<p data-height="640" data-theme-id="35671" data-slug-hash="gZQJBz" data-default-tab="js,result" data-user="lokesh" data-pen-title="Stripe - Logo Bubble 1.2 - Place and size logos" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/gZQJBz/">Stripe - Logo Bubble 1.2 - Place and size logos</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


## Part 3: Animating and looping

### Structuring our code

Before we start animating, let's add some structure to our code so we can support new features and keep things tidy. We'll create two new classes: <code>Bubbles</code> and <code>Bubble</code>.

```
class Bubbles {
  constructor() { } // For creating the individual bubbles.
  update() { } // Will be called every frame.
}

class Bubble {
  constructor() { }
  update() { } // Will be called every frame.
}
```

### Adding performant animations

1. **Use transforms.**  There are two layout related properties that browsers can animate cheaply, thanks to support from the GPU, and these are: `opacity` and `transform`. It is tempting to use the `top` and `left` CSS values to move elements around, but modifying them triggers expensive layout calculations that can cause slowdown/jank. Stick to `transform` and `opacity`. In our case, we'll use transforms to move the bubbles around.

  ```
  this.x = this.x - SCROLL_SPEED;
  if (this.x <  -200) {
      this.x = CANVAS_WIDTH;
  }
  style.transform = `translate(${this.x}px, ${this.y}px)`;
  ```

2. **Use requestAnimationFrame.** If you ever catch yourself using `setInterval` to build out an animation, stop what you're doing, and go read about [requestAnimationFrame](https://flaviocopes.com/requestanimationframe/).

  ```
  class Bubbles {
      update() {
          this.bubbles.forEach(bubble => bubble.update());
          requestAnimationFrame(this.update.bind(this))
      }
  }
  ```

<p data-height="640" data-theme-id="35671" data-slug-hash="NeEZyP" data-default-tab="js,result" data-user="lokesh" data-pen-title="Stripe - Logo Bubble 1.3 - Animating and looping" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/NeEZyP/">Stripe - Logo Bubble 1.3 - Animating and looping</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Let's give the animation some life

We have movement, but it feels stale. How do we get that organic bobbing and weaving that the Stripe page has? My first thought is to use perlin noise to randomize the movement.

---

<a id="final-example"></a>
<p data-height="640" data-theme-id="35671" data-slug-hash="GPPKGQ" data-default-tab="result" data-user="lokesh" data-pen-title="Stripe - Logo Bubble 3.1 - Perlin noise" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/GPPKGQ/">Stripe - Logo Bubble 3.1 - Perlin noise</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<link rel="stylesheet" href="/css/stripe.css">
