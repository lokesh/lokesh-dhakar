---
title: "Stripe front-end dev 102"
date: 2019-01-07
layout: post.njk
draft: true
---
<h2 class="page-subtitle">Reverse engineering the _logo bubbles_</h2>

<div class="figure">
    <video style="width: 100%; max-width: 720px" autoplay loop>
        <source src="/media/posts/stripe/102/logo-bubbles.mp4" type="video/mp4" />
    </video>
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