---
date: 2020-04-15
layout: page.njk
---

# Style guide

## To-do

- colors
- forms.css
- dev-posts.css

---

## Collections

<section class="item-grid">
  <article class="item">
    <h2 class="item-title">Title</h2>
    <div class="item-meta">Meta</div>
    <div class="item-credits">Credits</div>
    <div class="note-body">Body</div>
  </article>
  <article class="item">
    <h2 class="item-title">Title</h2>
    <div class="item-meta">Meta</div>
    <div class="item-credits">Credits</div>
    <div class="note-body">Body</div>
  </article>
  <article class="item">
    <h2 class="item-title">Title</h2>
    <div class="item-meta">Meta</div>
    <div class="item-credits">Credits</div>
    <div class="note-body">Body</div>
  </article>
  <article class="item">
    <h2 class="item-title">Title</h2>
    <div class="item-meta">Meta</div>
    <div class="item-credits">Credits</div>
    <div class="note-body">Body</div>
  </article>
</section>

---


## Layout

- **Default width**:Content column is set to a max-width of 40rem (--page-max-width) by default.
- **Full-width**: To have the content column span the full-width of a page, set `pageWidth: "full"` to in the Markdown front matter.

---

## Images

<figure>
  <img src="https://via.placeholder.com/400x100" />
</figure>

```
<figure>
  <img src="https://via.placeholder.com/400x100" />
</figure>
```

### Width 300px or less

For images 300px or less wide, use the _small_ class. This prevents them from being stretched to 100% width on mobile.

<figure class="small">
  <img src="https://via.placeholder.com/300x100" />
</figure>

```
<figure class="small">
  <img src="https://via.placeholder.com/300x100" />
</figure>
```


### Width 800px or greater

For images over 800px that you don't want to have scaled down to fit the text column, use class _large_.

<figure class="large">
  <img src="https://via.placeholder.com/800x100" />
</figure>

```
<figure class="large">
  <img src="https://via.placeholder.com/800x100" />
</figure>
```

---


## Color


---

## Typography

# H1

Dicant lobortis at pro, at qui scaevola officiis. No ridens docendi theophrastus pro, cu quo cibo suavitate suscipiantur. Clita altera postea nec cu, in <a href="#">lobortis iracundia has</a>. An magna tempor facilisis eam, eum alia decore iudicabit id, eos ut detracto partiendo consetetur. Mazim ubique abhorreant no eam.

<i>Redo link styling. Blue is harsh.</i>

- Unordered list
- Heading and UI font: Space Grotesk
- Body font: Inter

## H2 Mel eu labitur deleniti iracundia, ad nam vocent cotidieque

Dicant lobortis at pro, at qui scaevola officiis. No ridens docendi theophrastus pro, cu quo cibo suavitate suscipiantur. Clita altera postea nec cu.

1. Ordered list
1. Loading Space Grotesk SemiBold
1. And Bold

In lobortis iracundia has. An magna tempor facilisis eam, eum alia decore iudicabit id, eos ut detracto partiendo consetetur. Mazim ubique abhorreant no eam.


---

# H1 Simul delicata ex pri

## H2 Mel eu labitur deleniti iracundia, ad nam vocent cotidieque

Impetus blandit repudiandae eu sea, atqui eirmod commodo usu no. At his utroque intellegat, duis periculis vix no. Nec nihil oblique eleifend at. Pri facete suscipiantur an, per solet utamur vulputate te.


### H3 Te cum veri prima

Te recteque hendrerit cum, pri id partem lucilius pertinacia. Audire inciderint in vis, vim et dicam prompta. Dolore inciderint nam ea, putent tamquam per ea, usu errem scriptorem in. Utamur bonorum incorrupte et pri, at autem ocurreret sadipscing his. Ne nec graece deserunt interesset, at summo argumentum appellantur nec.

### H3 Vix posse nusquam eu

Meliore detraxit sed ne, ut esse <code>code inline</code> velit contentiones vel. Nec molestie vivendum eleifend in. No wisi clita tibique 

Reque dicam eripuit ut pri. Ad his latine facilisi cotidieque, justo possit usu ex, an abhorreant theophrastus sed. Cu sea tempor aliquam, solum aperiri vix ad. Viris homero mel te.

```
Pre code using triple tilde

Outputs 
<pre>
  <code>
       ...
  </code>
</pre>
```

---

## Forms

<i>TODO: Style form controls. See forms.css. Continue to style classes only, giving freedom for one-off experiments?</i>

<button>Button</button>  
<input type="input" value="input" />  
<select>
  <option>Select...</option>
</select>
<textarea></textarea>

---

## Misc

### Notice

<div class="notice">
  <p>His ea enim tollit incorrupte. In vel semper prompta, magna possit usu id. Nec choro putant ex. Zril tantas alterum ne pri, vitae primis semper ad eum.</p>

  <p>Vim suas adhuc virtute at, fierent repudiandae te per. Et aeterno perpetua ullamcorper cum, eros referrentur et sit, nam an dicat suavitate.</p>
</div>

<link rel="stylesheet" href="/css/forms.css">

<style>
i {
  background: #fff3c7;
}

a {
/*  color: var(--color);
  background: #F0E3A4;
*/}
</style>
