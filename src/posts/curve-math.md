---
title: "Curve math in Javascript"
date: 2020-06-14
layout: post.njk
draft: true
---

<canvas id="canvas-line" class="canvas"></canvas>
<canvas id="canvas-quadratic-bezier" class="canvas"></canvas>


<style>
.canvas {
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color-light);
}

</style>


<script>

class Canvas {
  constructor(el) {
    this.el = el;
    this.ctx = el.getContext('2d');
    
    // Style
    this.maxWidth = 1000;
    this.height = 200;
    this.points = 40;
    this.radius = 3;
    this.color = '#58df82';

    // Size
    this.size();
  }

  size() {
    this.width = Math.min(this.el.parentElement.offsetWidth, this.maxWidth);
    this.el.style.width = `${this.width}px`;
    this.el.style.height = `${this.height}px`;

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio;
    this.el.width = this.width * scale;
    this.el.height = this.height * scale;

    // Normalize coordinate system to use css pixels.
    this.ctx.scale(scale, scale);
  }
}

class LineCanvas extends Canvas {
  draw() {
    this.ctx.fillStyle = this.color;

    for (let i = 0; i < 1; i = i + (1 / this.points )) {
      this.ctx.beginPath();
      this.ctx.arc(i * this.width, this.height / 2, this.radius, 0, Math.PI * 2, true);
      this.ctx.fill();
    }
  }
}

class QuadraticBezierCanvas extends Canvas {
  draw() {
    this.ctx.fillStyle = this.color;

    for (let i = 0; i < 1; i = i + (1 / this.points )) {
      this.ctx.beginPath();
      this.ctx.arc(i * this.width, 100, this.radius, 0, Math.PI * 2, true);
      this.ctx.fill();
    }
  }
}




const canvases = [
  new LineCanvas(document.getElementById('canvas-line')),
  new LineCanvas(document.getElementById('canvas-quadratic-bezier')),
];

canvases.forEach(canvas => {
  canvas.draw();
})

window.addEventListener('resize', () => {
  canvases.forEach(canvas => {
    canvas.size();
    canvas.draw();
  })
})

</script>
