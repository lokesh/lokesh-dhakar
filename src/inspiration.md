---
date: 2018-10-03
layout: page.njk
---


<div class="preview">
  <a href="https://www.youtube.com/watch?v=jIbu-dJuEh0" class="thumb" style="background-image: url(/media/foo/tapestry.jpg)"></a>
  <div class="details">
    <div class="length">9min</div>
    <h2 class="title">The Art of Making a Tapestry</h2>
    <h3 class="author">Getty Museum</h3>
  </div>
</div>

<div class="preview">
  <a href="https://www.youtube.com/watch?v=ZT9rvtlk_yc" class="thumb" style="background-image: url(/media/foo/test.jpg)"></a>
  <div class="details">
    <div class="length">24min</div>
    <h2 class="title">Patek Philip watch analysis</h2>
  </div>
</div>

<style>

.preview {
  width: 240px;
  margin-bottom: 16px;
}

.thumb {
  display: block;
  width: 240px;
  height: 160px;
  margin-bottom: 4px;
  background-size: cover;
  border-radius: var(--border-radius);
}

.length {
  float: right;
  margin-left: 4px;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 14px;
}

.title {
  margin: 0;
  font-size: 14px;
}


.author {
  margin: 0;
  color: var(--muted-color);
  font-size: 14px;    
}
</style>

<script>
  console.log('hi');
</script>
