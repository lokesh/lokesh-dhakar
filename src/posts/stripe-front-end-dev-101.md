---
title: "Stripe front-end dev 101"
date: 2019-01-06
layout: post.njk
---

<h2 class="page-subtitle">Reverse engineering the _tilted code card_</h2>

<div class="figure">
  <img style="max-width: 650px;" src="/media/posts/stripe/101/code-card.jpg" alt="Source code snippet for how to use Stripe Terminal in card that is tilted and floating with shadow.">
</div>


<a href="#final-example">↓ Skip to the finished result</a>

The Stripe front-end team pays a tremendous amount of attention to the construction and polish of their work. This is most visible to the outside world through Stripe's landing pages. In this series, we'll attempt to reverse engineer a few elements from [Stripe.com](https://stripe.com/) and see if we can up our front-end game.

Let's tackle something on the simpler end of the spectrum first, the tilted code card (see image above) from the [Stripe Terminal page](https://stripe.com/terminal).

Our strategy for this will be to work on the inner components and then move outwards. Let's work on getting the code snippet styled.

## Part 1: Styling the code snippet

### Picking a syntax highlighting library

Let's figure out how we want to apply syntax highlighting. We could manually insert DOM elements in to the code snippet to use as styling hooks, but this would be tedious to set up and a pain to maintain. Fortunately, there are many syntax highlighting libraries available. If we peek at the DOM on the Stripe page, we can see a class called `prism`:

<div class="figure max-width">
  <img src="/media/posts/stripe/101/code-card-inspect-prism.png" alt="Chrome dev tools showing prism class applied to code tag.">
</div>

Google for "prism syntax highlighting" and bingo: [PrismJS](https://prismjs.com/). Spend five minutes to play around with the examples, read the basic usage instructions, check the Readme on Github for any warnings, and see if the project is actively being maintained. In this case, no red flags, let's go!

### Adding Prism for syntax highlighting
[Download](https://prismjs.com/download.html) and load `prism.js` and include the CSS for one of their themes. I picked the Tomorrow Night Prism theme as a starting point.

Add two classes to the code tag: `<code class="prism language-javascript">` and this is what we get:

<p data-height="400" data-theme-id="minimal" data-slug-hash="EGLNOr" data-default-tab="html,result" data-user="lokesh" data-pen-title="Stripe - Code Card 1.1 - Add Prism" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/EGLNOr/">Stripe - Code Card 1.1 - Add Prism</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Updating the font stack

Let's get our fonts aligned before digging into the colors. The code snippet uses the following font-stack: <code>Source Code Pro, Consolas, Menlo, monospace</code>.

Source Code Pro is an open source font made available by Adobe. Stripe is hosting it themselves, but we'll load it from [Google Fonts](https://fonts.google.com/specimen/Source+Code+Pro) and pull in the Medium and Bold weights. We've specified monospace fallbacks just in case there is a problem loading the font, _Consolas_ for Windows and _Menlo_ for MacOS.

In this step, we also went ahead and updated the font-size and line-height to match.

<p data-height="400" data-theme-id="minimal" data-slug-hash="jXxyOx" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Code Card 1.2 - Font update" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/jXxyOx/">Stripe - Code Card 1.2 - Font update</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Finessing the font weights

There are two font weight tweaks we need to make:

1. **Use a heavier weight for keywords and functions in the code snippet.**

  <div class="figure no-border">
    <img style="max-width: 535px;" src="/media/posts/stripe/101/code-card-font-weights.png" alt="3 lines of code showing different font weights applied to different code tokens.">
  </div>

  This design decision seems to be less about highlighting certain elements of the code because they have elevated importance, but rather to introduce some dynamism to the visuals. This works great in this scenario, but you might reconsider this styling if you needed to show a large number of code samples.

  <div class="note note-design" style="display: none">
    <svg class="note-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <div class="note-text">
      <div class="note-tag">Design</div>
      <p>This decision seems to be less about highlighting certain elements of the code because they have elevated importance, but rather to introduce some dynamism to the visuals.</p>
    </div>
  </div>

2. **Update font-smoothing rules.** This will make the fonts render a little thinner and crisper, especially light text on dark backgrounds.

   <pre><code>-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;</pre></code>

  Font-smoothing adjustments were originally intended to resolve device specific rendering issues. Fix the blurry bits, with a small performance trade-off. But now days they are used as a way to finesse type rendering for aesthetics, similar to Photoshops's sharp, crisp, strong, & smooth options.


<p data-height="400" data-theme-id="minimal" data-slug-hash="jXxyzX" data-default-tab="result,css" data-user="lokesh" data-pen-title="Stripe - Code Card 1.3 - Font weights" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/jXxyzX/">Stripe - Code Card 1.3 - Font weights</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


### Update the colors

We can use dev tools to inspect the color values used by Stripe and move them into our Prism theme CSS.

<p data-height="400" data-theme-id="minimal" data-slug-hash="BvxpeO" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Code Card 1.4 - Color updates" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/BvxpeO/">Stripe - Code Card 1.4 - Color updates</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### End of part 1

Stripe on the left, our version on the right.

<div class="figure max-width">
  <img src="/media/posts/stripe/101/code-card-color-comparison.jpg" alt="Side-by-side view of the original Stripe design and our design so far. Stripe colors are more subdued.">
</div>

We used the same hex values as Stripe, but our version is rendering differently. We'll come back to this in the next part...

## Part 2: Styling the card

### Create the card element

Add a wrapper element around our code snippet to use as our card. We'll give it padding, a width, our purple background, and a border radius.

<div class="note note-design" style="display: none">
  <svg class="note-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
  <div class="note-text">
    <div class="note-tag">Design</div>
    <p>The padding rule Stripe uses is <code>padding: 25px 30px</code>. This is shorthand to say, 25px on top and bottom, an 30px on the left and right. Why not 30px all around?</p>
  </div>
</div>


<p data-height="600" data-theme-id="minimal" data-slug-hash="BvxWpb" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Code Card 2 - Card wrapper" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/BvxWpb/">Stripe - Code Card 2 - Card wrapper</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Adding a shine

Remember those mismatching colors from the end of part 1? By inspecting the DOM we find that there is a translucent overlay on top of the card. It's a div with a subtle gradient that fades from white to transparent, starting from the top right. This is what makes the text colors a bit more subdued and also provides us that nice shine to the card.

<div class="figure max-width">
  <img src="/media/posts/stripe/101/code-card-shine-equation.jpg" alt="Purple rectangle plus transparent gradient rectangle equals purple rectangle with shine">
</div>

1. **Add a block element for the shine.**

  <pre><code>&lt;div class=&quot;card&quot;&gt;
    &lt;div class=&quot;card-shine&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;code-snippet&quot;&gt;
      ...
    &lt;/div&gt;
  &lt;/div&gt;
  </div></code></pre>

2. **Stretch the element to edges.** There are multiple ways to have an element stretch to fit the width and height of its parent. We'll use an absolute positioning technique in which we set all of the directional values to <code>0</code>. Make sure to set the parent element to <code>position: relative</code>.

  ```
  .card {
    position: relative;
  }

  .card-shine {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }```


3. **Add gradient and set opacity.** Our shine element should now be sized and in position. Let's add the shine effect with a gradient.

  ```
  .card-shine {
    background: linear-gradient(
      to top right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.5) 70%,
      #fff
    );
    opacity: 0.2;
  }```

4. **Keep content below the overlay interactive.** Set <code>pointer-events: none</code> on the card shine overlay to make sure it doesn't block clicks and taps from getting through.

<p data-height="520" data-theme-id="35696" data-slug-hash="xmjdMe" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Code Card 2.1 - Add shine" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/xmjdMe/">Stripe - Code Card 2.1 - Add shine</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Make it pop off the page

We're going to rush through this section and save the more in-depth discussion on box-shadows and 3d transforms for a follow-up article.

1. **Add shadows.**

  ```
  .card {
     box-shadow:
       -27.1px 62.5px 125px -25px rgba(50, 50, 93, 0.5),
       -16.2px 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
  }```


2. **Tilt in 3d.** Enable 3d space by adding a parent element with <code>perspective: 1500px</code>. Then add a transform to the card:

  ```
  .card {
     transform: rotate3d(0.5, 0.866, 0, 15deg) rotate(-1deg);
  }
  ```

---

_🥁 Drum roll please..._

<a id="final-example"></a>
<p data-height="560" data-theme-id="minimal" data-slug-hash="wRjeJy" data-default-tab="result" data-user="lokesh" data-pen-title="Stripe - Code Card 2.3 - Add shadows and tilt" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/wRjeJy/">Stripe - Code Card 2.3 - Add shadows and tilt</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## The end of Stripe front-end dev 101

I hope you enjoyed this post and learned something new. I'm planning on doing at least one more which will focus on motion.

I'd love to hear your thoughts on this post. What parts did you enjoy? What parts were confusing? What would you like to learn about next?

Follow me on [Twitter](https://twitter.com/lokesh) to find out when the next post is up.

<link rel="stylesheet" href="/css/stripe.css">
