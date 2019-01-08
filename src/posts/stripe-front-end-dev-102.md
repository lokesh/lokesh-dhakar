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