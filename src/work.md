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




<div class="p p-square">
  <div class="p-info-section">
    <div class="p-header">
      <img class="p-icon" src="/media/work/icon-square.png" />
      <div class="p-title-bar">
        <div class="p-title">Square</div>
        <div class="p-subtitle">2012-2015</div>
      </div>
    </div>
    <p>Besides the main desktop app, we explored new potential ventures with Timeular. One of them was a personal AI productivity assistant helping you to optimize your day for focus time, necessary meetings and mental well-being through automagically planning your day and gamifying the experience.  </p>
  </div>
  
  <div class="p-media-section">
    <div class="p-page">
        <img class="p-img" src="/media/work/square-01.png" />
      <!-- <div class="p-caption">
        Lorem then ipsum.
      </div> -->
    </div> 
  <div class="p-page">
        <img class="p-img" src="/media/work/square-02.png" />
      <!-- <div class="p-caption">
        Lorem then ipsum.
      </div> -->
    </div>       
  </div>
</div>

<div class="p p-weebly">
  <div class="p-info-section">
    <div class="p-header">
      <img class="p-icon" src="/media/work/icon-weebly.png" />
      <div class="p-title-bar">
        <div class="p-title">Weebly</div>
        <div class="p-subtitle">2012-2015</div>
      </div>
    </div>
    <p>Weebly lorem ups dolor sit amet, consectetur adipiscing elit. Phasellus eu mauris quis lorem semper consequat sed quis erat. Cras lacus nulla, eleifend vel placerat id, lacinia sed massa. Donec eget urna quis urna tempus consequat. Pellentesque porttitor ligula vel ligula dapibus, non faucibus nulla placerat. </p>
  </div>
  
  <div class="p-media-section">
    <div class="p-page">
        <img class="p-img" src="/media/work/weebly-01.png" />
    </div> 
  </div>
</div>


<div class="p p-getaround">
  <div class="p-info-section">
    <div class="p-header">
      <img class="p-icon" src="/media/work/icon-getaround.png" />
      <div class="p-title-bar">
        <div class="p-title">Getaround</div>
        <div class="p-subtitle">2012-2015</div>
      </div>
    </div>
    <p>Getaround is a car sharing company, think Airbnb for cars. I joined as a UI Engineer and eventually moved up to lead the Web team.</p>
  </div>

  <div class="p-media-section">
    <div class="p-page">
        <img class="p-img" src="/media/work/getaround-01b.png" />
      <!-- <div class="p-caption">
        Lorem then ipsum.
      </div> -->
    </div> 
  </div>
</div>

<!-- 
<div class="p-media-section">
  <div class="p-page" style="background-color: rgba(0, 5, 10, 0.1);">
    <div class="p-page-media">
      <div class="p-device-frame device-desktop">
        <div class="device-desktop-title-bar">
          <div class="device-desktop-circle"></div>
          <div class="device-desktop-circle"></div>
          <div class="device-desktop-circle"></div>
        </div>
        <img class="p-img" src="/media/projects/sq-web.png" />
      </div>
    </div>
    <div class="p-caption">
      Lorem then ipsum.
    </div>
  </div>
  <div class="p-page" style="background-color: #2F80ED;">
    <div class="p-page-media">
      <div class="p-device-frame device-desktop">
        <div class="device-desktop-title-bar">
          <div class="device-desktop-circle"></div>
          <div class="device-desktop-circle"></div>
          <div class="device-desktop-circle"></div>
        </div>
        <img class="p-img" src="/media/projects/sq-web.png" />
      </div>
    </div>
    <div class="p-caption">
      Font selection screen. We had to balance customization with helpful constraints that made maintenance easier and the likelihood for garish results less likely.
    </div>
  </div>
  <div class="p-page" style="background-color: #7FCEFA;">
    <div class="p-page-media">
      <div class="p-device-frame device-desktop">
        <img class="p-img" src="/media/projects/sq-web.png" />
      </div>
    </div>
  </div> -->

<style>
:root {
  --square-color: #1a1a1a;
  --weebly-color: #416FEE;
  --getaround-color: #A22BA2;

  --square-color: var(--recessed-bg-color);
  --weebly-color: var(--recessed-bg-color);
  --getaround-color: var(--recessed-bg-color);


}

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
    grid-template-columns: 300px auto;
    gap: calc(var(--gutter) * 2);
    margin-bottom: calc(var(--block-bottom) * 4);
  }  

  .p-info-section {
    flex: 0 0 320px;
  }

  .p-media-section {
    margin-bottom: 0;
  }
}


.p-info-section {
  flex: 1 1 360px;
  margin-bottom: var(--block-bottom);  
}

.p-header {
  display: flex;
  margin-bottom: var(--block-bottom);
}

.p-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  margin-right: var(--gutter-inner);
}

.p-title-bar {
  margin-top: 4px;
}

.p-title {
  font-weight: var(--weight-bold);
  font-size: 1.10rem;
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
  text-decoration: none;
}


.p-media-section {
  scroll-snap-type: x mandatory;
/*   scroll-padding-left: 48px; */
  overflow-x: scroll;
  overflow-x: auto;
  display: flex;
  gap: 24px;
  margin-bottom: calc(var(--block-bottom) * 4);

  /* width: 100vw;
  margin-left: calc( var(--gutter) * -1); */
}



@media (min-width: 800px) {
  .p-page-media {
    flex: 1 1 auto;
    padding: 48px 24px;  
  }
}



.p-page {
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  border-radius: var(--radius); 
/*  flex: 0 0 480px;*/
/*  padding:  24px;*/

/*  background: #9ef;*/
/*  min-height: 400px;*/
/*  flex: 0 0 240px;*/
}

.p-square .p-page {
  background-color: var(--square-color);
}

.p-weebly .p-page {
  background-color: var(--weebly-color);
}
.p-getaround .p-page {
  background-color: var(--getaround-color);
}


.p-page-media {
  flex: 1 1 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 800px) {
  .p-page-media {
    flex: 1 1 auto;
    padding: 48px 24px;  
  }
}

.p-device-frame {
  position: relative;
}

.p-device-frame.device-desktop {
/*  padding-top: 12px;*/
/*  background: rgba(0, 5, 10, 0.5);*/
  background: black;
  border: 2px solid black;
  border-radius: var(--radius);
}

.p-device-frame.device-mobile {
  padding: 36px 4px 48px;
  background: black;
  border: 2px solid black;
  border-radius: 24px;
}

.device-mobile-chrome {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.device-mobile-speaker {
  position: relative;
  top: -12px;
  width: 48px;
  height: 4px;
  background: #333;
  border-radius: 4px;
}

.device-mobile-home-button {
  position: absolute;  
  bottom: 5px;
/*  top: -12px;*/
  width: 36px;
  height: 36px;
/*  background: #333;*/
  border-radius: 50%;
  border: 3px solid #333;
}

.device-desktop-title-bar {
  display: flex;
  gap: 6px;
  padding: 4px 4px 6px 4px;
}

.device-desktop-circle {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
}

.p-img {
  width: 640px;
}

@media (min-width: 800px) {
   .p-img {
     width: 720px;
  }
}


@media (min-width: 1400px) {
   .p-img {
     width: 1200px;
  }
}

/* 
.device-desktop .p-img {
   width: 540px;
}

@media (min-width: 800px) {
  .device-mobile .p-img {
     width: 240px;
  }

  .device-desktop .p-img {
     width: 800px;
  }
} */

.p-caption {
  display: none;
  width: 100%;
  padding: var(--gutter);
  background-color: rgba(0, 5, 10, 0.5);
  color: rgba(245, 250, 255, 0.85);
  font-size: 0.8333rem;
/*  font-size: 7px;*/
  line-height: var(--line-height);
  border-radius: 0 0 var(--radius) var(--radius);
}

@media (min-width: 800px) {
  .p-caption {
    font-size: 0.8333rem;
  }
}

</style>