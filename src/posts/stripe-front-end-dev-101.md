---
title: "Stripe front-end dev 101"
date: 2019-01-06
layout: post.njk
---
<h2 class="page-subtitle">Reverse engineering the _tilted code card_</h2>

<div class="figure">
  <img style="max-width: 650px;" src="/media/posts/stripe/101/code-card.jpg" alt="Source code snippet for how to use Stripe Terminal in card that is tilted and floating with shadow.">
</div>

The Stripe front-end team pays a tremendous amount of attention to the construction and polish of their work. This is most visible to the outside world through Stripe's landing pages. In this series, we'll attempt to reverse engineer a few elements from [Stripe.com](https://stripe.com/) and see if we can up our front-end game.

Let's tackle something on the simpler end of the spectrum first, this tilted code card (see image above) from the [Stripe Terminal landing page](https://stripe.com/terminal).

Our strategy for this will be to work on the inner components and then move outwards. Let's work on getting the code snippet styled.

## Part 1: Code syntax highlighting


### Picking a syntax highlighting library

Let's figure out how we want to apply syntax highlighting. We could manually insert DOM elements in to the code snippet to use as styling hooks, but this would be tedious to set up and a pain to maintain. Fortunately, there are many syntax highlighting libraries available. If we peek at the DOM on the Stripe page, we can see a class called `prism`:

<div class="figure">
  <img style="max-width: 480px;" src="/media/posts/stripe/101/code-card-inspect-prism.png" alt="Chrome dev tools showing prism class applied to code tag.">
</div>

Google for "prism syntax highlighting" and bingo: [PrismJS](https://prismjs.com/). Spend five minutes to play around with the examples, read the basic usage instructions, check the Readme on Github for any warnings, and see if the project is actively being maintained. In this case, no red flags, let's go!

### Adding Prism for syntax highlighting
[Download](https://prismjs.com/download.html) and load `prism.js` and include the CSS for one of their themes. I picked the Tomorrow Night Prism theme as a starting point.

Add two classes to the code tag: `<code class="prism language-javascript">` and this is what we get:

<p data-height="500" data-theme-id="light" data-slug-hash="EGLNOr" data-default-tab="html,result" data-user="lokesh" data-pen-title="Stripe - Code Card 1.1 - Add Prism" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/EGLNOr/">Stripe - Code Card 1.1 - Add Prism</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Updating the font stack

Let's get our fonts aligned before digging into the colors. The code snippet uses the following font-stack: <code>Source Code Pro, Consolas, Menlo, monospace</code>.

Source Code Pro is an open source font made available by Adobe. Stripe is hosting it themselves, but we'll load it from [Google Fonts](https://fonts.google.com/specimen/Source+Code+Pro) and pull in the Medium and Bold weights. We've specified monospace fallbacks just in case there is a problem loading the font, _Consolas_ for Windows and _Menlo_ for MacOS.

In this step, we also went ahead and reduced the font-size to 14px.

<p data-height="500" data-theme-id="light" data-slug-hash="jXxyOx" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Code Card 1.2 - Font update" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/jXxyOx/">Stripe - Code Card 1.2 - Font update</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Finessing the font weights

There are two font weight updates we need to make:

1. **Use a heavier weight for keywords and functions.** This design decision by Stripe seems to be less about highlighting certain elements of the code because they have elevated importance, but rather to introduce some dynamism to the visuals.

  <div class="figure no-border">
    <img style="max-width: 535px;" src="/media/posts/stripe/101/code-card-font-weights.jpg" alt="3 lines of code showing different font weights applied to different code tokens.">
  </div>

  <pre><code>.token.function,
  .token.keyword {
    font-weight: 600;
  }
  </code></pre>


2. **Update font-smoothing rules.** Font-smoothing adjustments were originally intended to resolve device specific rendering issues. Fix the blurry bits. They also might caused some performance hits. But now days they are used as a way to finesse type rendering for aesthetics, similar to Photoshops's sharp, crisp, strong, & smooth options.

   <pre><code>-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;</pre></code>

<p data-height="500" data-theme-id="light" data-slug-hash="jXxyzX" data-default-tab="css,result" data-user="lokesh" data-pen-title="Stripe - Code Card 1.3 - Font weights" class="codepen">See the Pen <a href="https://codepen.io/lokesh/pen/jXxyzX/">Stripe - Code Card 1.3 - Font weights</a> by Lokesh Dhakar (<a href="https://codepen.io/lokesh">@lokesh</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


### Customizing the colors

We can use dev tools to inspect the color values used by Stripe and move them into our Prism theme CSS.

Let's get our fonts aligned before digging into the colors. The code snippet uses the following font-stack: <code>Source Code Pro, Consolas, Menlo, monospace</code>.

<style>
.figure {
  display: inline-block;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-large);
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
  margin-bottom: 48px;
}

</style>