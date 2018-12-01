---
date: 2018-07-08
layout: blog.njk
---

<div class="page-tag">Blog</div> 

<h1 class="page-title">Posts</h1>


<style>
.postcards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 400px));
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin-bottom: 48px;
}

.postcard {
  display: block;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-xl);
}

.postcard:hover {
  text-decoration: none;
  background-color: #f5f5f5;
}


.postcard__draft-label {
  float: right;
  margin-left: 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--secondary-color);
}

.postcard__title {
  margin: 0 0 4px 0;
  color: var(--color);
  font-weight: 700;
}

.postcard__date {
  color: var(--muted-color);
  font-weight: 600;
}
</style>
