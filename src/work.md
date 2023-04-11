---
date: 2022-4-4
layout: page.njk
pageWidth: full
---

<!-- <h1 class="page-title">Work</h1> -->

<!-- <div class="project-list">

- [Bitsweeper](/projects/bitsweeper)

</div>
 -->

 <!-- <br /><br /><br /><br /><br /> -->

<div class="p">
  <div class="p-info-section">
    <div class="p-header">
      <div class="p-icon"></div>
      <div class="p-title-bar">
        <div class="p-title">Getaround</div>
        <div class="p-subtitle">2012-2015</div>
      </div>
    </div>
    <p>Getaround is a car sharing company, think Airbnb for cars. I joined as a UI Engineer and eventually moved up to lead the Web team.</p>
    <div class="p-actions">
      <a class="p-action" href="https://getaround.com">View site</a>
    </div>
  </div>
  <div class="p-media">
    <div class="p-page" style="background-color: rgba(0, 5, 10, 0.1); border-radius: var(--radius); padding: 24px;">
      <div class="p-device-frame">
        <img src="/media/projects/sq-web.png" style="width: 420px; border: 2px solid black; border-radius: var(--radius)" />
      </div>
    </div>
    <div class="p-page" style="background-color: #2F80ED; border-radius: var(--radius); padding:  24px">
      <div class="p-device-frame">
        <img src="/media/projects/sq-web.png" style="width: 420px; border: 2px solid black; border-top-width: 16px; border-radius: var(--radius)" />
      </div>
    </div>
    <div class="p-page" style="background-color: #7FCEFA; border-radius: var(--radius); padding:  24px;">
      <div class="p-device-frame">
        <img src="/media/projects/sq-web.png" style="width: 420px; border: 2px solid black; border-radius: var(--radius)" />
      </div>
    </div>
    <!--
    <div class="p-prev">Prev</div>
    <div class="p-next">Next</div>
    <div class="p-dots">
      <div class="p-dot">O</div>
      <div class="p-dot">o</div>
      <div class="p-dot">o</div>
    </div>
  -->
  </div>
</div>

<!--
<ul class="project-list">
  <li><span class="project-title"><a href="/projects/bitsweeper">Bitsweeper</a></span> - A retro-styled take on Minesweeper.</li>
  <li><span class="project-title">[Team Bee](/projects/team-bee)</span> - NYT Spelling Bee made for teams, specifically made for my family.</li>
  <li><span class="project-title">[Color Stacks](/projects/color-stacks)</span> - A color palette generator for design systems.</li>
  <li><span class="project-title">[Lightbox2](/projects/lightbox2/)</span> - The sequel.</li>
  <li><span class="project-title">[Color Thief](/projects/color-thief/)</span> - Generate color palettes from an image.</li>
  <li><span class="project-title">[Lightbox](/projects/lightbox/)</span> - The original Lightbox library.</li>
  <li><span class="project-title">[Flexitem](/projects/flexitem/)</span> - CSS flexbox quick reference.</li>
  <li><span class="project-title">[Ascii Today](https://ascii.today)</span> - A super-fast ASCII title generator.</li>
</ul>
-->

<style>
.project-list {
  padding-left: 0;
}

.project-list li {
  list-style: none;
  margin-left: 0;
  margin-bottom: 0.6em;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border-color-light);
}

.project-title a {
  font-weight: var(--weight-bold);
}


@media (min-width: 800px) {
  .p {
    display: grid;
    grid-template-columns: 360px auto;
    gap: var(--gutter);
    margin-bottom: var(--block-bottom);
  }  

  .p-info-section {
/*    flex: 0 0 360px;*/
  }
}

.p-info-section {
  flex: 0 0 360px;
  margin-bottom: var(--block-bottom);  
}

.p-header {
  display: flex;
  margin-bottom: var(--block-bottom);
}

.p-icon {

}

.p-title-bar {

}

.p-title {
  font-weight: var(--weight-bold);
  font-size: 16px;
}

.p-subtitle {
  color: var(--muted-color);
  font-weight: var(--weight-semi-bold);
}

.p-actions {
  display: flex;
  gap: var(--gutter;);
}

.p-action {
  display: block;
  padding: 6px 8px;
  color: var(--link-color);
  border: 1px solid var(--link-color);
  font-size: 0.8333rem;
  font-weight: var(--weight-semi-bold);
  font-family: var(--font-ui);
  text-transform: uppercase;
}


.p-media {
  scroll-snap-type: x mandatory;
/*   scroll-padding-left: 48px; */
  overflow-x: scroll;
  display: flex;
  gap: 24px;
}

.p-page {
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 420px;

/*  background: #9ef;*/
/*  min-height: 400px;*/
/*  flex: 0 0 240px;*/
}

</style>