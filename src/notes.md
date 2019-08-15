---
title: "Notes"
date: 2018-10-03
layout: page.njk
---

<!--
# Style guide
- Italicize names of books, movies, and other long form works.
-->


<template id="tpl-note">
  <article class="note">
    <div v-if="rating" :class="`rating rating-${rating}`"></div>
    <h2 class="title">{{ title }}</h2>
    <div class="meta">{{ date }} | {{ creatorLabel }}</div>
    <slot />
  </article>
</template>

<template id="tpl-filters">
  <div>
    <filter-button>All</filter-button>
    <filter-button>Movies</filter-button>
    <filter-button>Books</filter-button>
    <filter-button>TV</filter-button>
    <filter-button>Music</filter-button>

    Sort by: Rating, date, etc
  </div>
</template>

<template id="tpl-filter-button">
  <button>
    <slot />
  </button>
</template>

<div id="app">
  <div>
    <filters></filters>
    <note
      title="Tokyo Story"
      type="movie"
      rating="5"
      date="1953"
      creator="Yasujiro Ozu"
      noteDate="April 2, 2019"
    >
      <p>It's a simple story of parents visiting their grown up children. The pace is not hurried. The delivery from the actors is straightforward, not melodramatic. The camera moves in one shot, otherwise it stays still. Yet, in this calm, the movie elicits deeply intense feelings.</p>

      <p>Ozu captures the relationship between parents and their children in a way I've never seen or felt before. It hits hard. The movie has aged amazingly well over 60 years and the issues of generational differences and familial relationships it tackles are still present.</p>

      <p>This goes straight into my favorite movies of all-time list! Which is rare from a first viewing.</p>
    </note>

  </div>
</div>


<div class="notes">

<!-- Start intro -->

<!-- <div class="note note--intro">
  <h1 class="page-title">Notes on media</h1>

  <h2 class="page-subtitle">My thoughts on books, movies, and other long form work.</h2>
</div>
 -->
<!-- End of intro -->





<div class="note wip book">
  <div class="tag show">Reading Now</div>
  <h2 class="title">[The Three-Body Problem](https://www.goodreads.com/book/show/20518872-the-three-body-problem)</h2>
  <div class="meta">2014 | Written by Liu Cizin</div>


</div>


<div class="note book">
  <div class="tag">Book</div>
  <div class="rating rating-4"></div>
  <h2 class="title">[Neither Wolf Nor Dog](https://www.goodreads.com/book/show/72662.Neither_Wolf_Nor_Dog)</h2>
  <div class="meta">1994 | Written by Kent Nerburn</div>

  This book is worth reading, not simply because it shows how the unjust treatment and loss of culture that Native Americans suffered percolates down in to their modern day life, but because it gets you to see the same world from two sets of eyes. Two cultures looking at the same thing, but seeing things very differently.

  The story is told through a set of conversations between the author, Ken Nerburn, and a Lakota elder, named Dan. The stripped down format is a perfect vessel to capture Dan's thoughts on topics, which are eloquently stated and deeply personal.

  <div class="date">Apr. 16, 2019</div>
</div>

<div class="note movie">
  <div class="tag">Movie</div>
  <div class="rating rating-5"></div>
  <h2 class="title">[Tokyo Story](https://www.youtube.com/watch?v=R65wTHVUCGk)</h2>
  <div class="meta">1953 | Directed by Yasujiro Ozu</div>

  It's a simple story of parents visiting their grown up children. The pace is not hurried. The delivery from the actors is straightforward, not melodramatic. The camera moves in one shot, otherwise it stays still. Yet, in this calm, the movie elicits deeply intense feelings.

  Ozu captures the relationship between parents and their children in a way I've never seen or felt before. It hits hard. The movie has aged amazingly well over 60 years and the issues of generational differences and familial relationships it tackles are still present.

  This goes straight into my favorite movies of all-time list! Which is rare from a first viewing.

  <div class="date">Apr. 2, 2019</div>
</div>

<div class="note movie">
  <div class="rating rating-3"></div>
  <h2 class="title">[Of Fathers and Sons](https://www.youtube.com/watch?v=Zd0bRdYb8AI)</h2>
  <div class="meta">2017 | Directed by Talal Derki</div>

  This was eye-opening.

  The documentary captures the lives of a Jihadist family in Syria over the span of two years. You witness the children's early radicalization and desentization to violence, and even get to to see their routine at the militant training camps. The access the director was able to get under the guise of a sympathetic photojournalist is really astounding.

  It's shot in a fly-on-the-wall style. So no narration, a slow pace, and intimate, often-labored shots. The framing isn't sympathetic to their ideology, but it does give you time to see the subjects as people. We are all human beings after all.

  <div class="date">Mar. 19, 2019</div>
</div>


<div class="note book">
  <div class="tag">Book</div>
  <div class="rating rating-2"></div>
  <h2 class="title">[The Blue Bottle Craft of Coffee](https://www.amazon.com/Blue-Bottle-Craft-Coffee-Roasting/dp/1607741180/ref=sr_1_1?ih=2_3_1_2_1_0_0_1_0_1.69_30&keywords=blue+bottle&qid=1552452836&rnid=2941120011&s=books&sr=1-1&x=0&y=0)</h2>
  <div class="meta">2012 | Written by James and Caitlin Freeman</div>

  I was hoping for a general education on coffee and the Blue Bottle story, and though both of those topics were covered, they were dryly written, and a good half of the book went into the weeds with technical brewing instructions and pastry recipes.

  I'd recommend this book for serious home roasters and brewers, and not for the casual coffee drinker looking for a Bill Bryson-esque romp through the coffee industry.

  <div class="date">Mar. 7, 2019</div>
</div>


<div class="note book">
  <div class="tag">Book</div>
  <div class="rating rating-1"></div>
  <h2 class="title">[Hatching Twitter](https://www.goodreads.com/book/show/18656827-hatching-twitter)</h2>
  <div class="meta">2013 | Written by Nick Bilton</div>

  I picked this book up hoping to get a little background about Jack Dorsey, who became our CEO after Weebly was acquired by Square. Unfortunately, I found the book to be one-sided. It came off as a hitjob against Jack. I have zero first-hand information and am not implying any inaccuricies to the events in the book, but it seemed like the people who gave time to the author came off well, and those who didn't were maligned, and their motivations unarticulated.

  The book gave me a bit of history on the company, but not much else to takeaway.

  <div class="date">Feb. 15, 2019</div>
</div>

<div class="note movie">
  <div class="rating rating-3"></div>
  <div class="tag">Movie</div>
  <h2 class="title">[Isle of Dogs](https://www.youtube.com/watch?v=dt__kig8PVU)</h2>
  <div class="meta">2018 | Directed by 	Wes Anderson</div>

  Wes Anderson movies always have wonderful production design. But with the absolute control you get
  with stop motion animation, he is really on a different level here. I recommend clicking around
  the [10 min extended preview](https://www.youtube.com/watch?v=rTfSg77jrJw) to see for yourself.

  I do have two complaints. The acting is stilted and often stiff. This really goes for all Wes Anderson
  movies. And second, partly because of the first reason, the dogs don't _feel_ like dogs. They seem
  like human Wes Anderson characters voicing dogs.

  These complaints could take down other movies. But they don't here. The movie is beautiful. The plot
  is playful. The music is incredible. All together, it's a super fun movie.

  I do want to mention the discussion around cultural appropriation and the representation of
  Japanese in this movie. I didn't note any issues while watching the movie and read about the
  concerns after. Justin Chang's [review in the LA Times](https://www.latimes.com/entertainment/movies/la-et-mn-isle-of-dogs-review-20180321-story.html) is worth a read. It's a nuanced issue and after
  reading some more, including interviews from Wes, I'm staying in the _cultural appreciation_,
  not _appropriaton_, camp.

  <div class="date">Feb. 9, 2019</div>
</div>


<div class="note movie">
  <div class="rating rating-5"></div>
  <div class="tag">Movie</div>
  <h2 class="title">[Cold War](https://www.youtube.com/watch?v=8ImvkXgGVWw)</h2>
  <div class="meta">2018 | Directed by 	Paweł Pawlikowski</div>

  This love-conquers-all tale coming from Poland was not on my radar, but I happened across it by chance on a trip to LA.

  The movie is stunning. It is filmed in black and white, beautifully framed, lit, and art directed ([Clip: In the field](https://www.youtube.com/watch?v=BI4IOkjPrcQ)). The camera tends to pan and dolly slowly, and only as much as is required, but there are a couple of more frenetic scenes where we get to see the director and crew show off with some amazing choreography between the subjects and the camera ([[Clip: Dancing](https://www.youtube.com/watch?v=kCuEXWMh5Vo)).

  I don't talk about the characters, plot, or themes here. But I want to note that the movie doesn't miss the mark in any of these categories. It's an engaging story, composed together in a light-weight, but interesting way. I plan on rewatching and digging a little deeper. I also plan on checking  out Pawlikowski's previous film, [Ida](https://www.youtube.com/watch?v=ELIMeemx-FI).

  <div class="revisit"></div>

  <div class="date">Jan. 21, 2019</div>
</div>


<div class="note movie">
  <div class="rating rating-3"></div>
  <div class="tag">Movie</div>
  <h2 class="title">[Stranger Than Paradise](https://www.youtube.com/watch?v=MwefGellnhk)</h2>
  <div class="meta">1984 | Directed by Jim Jarmusch</div>

  This indie film has a lot going for it: great acting, unhurried pacing, beautiful framing, and lots of glorious black and white film grain. But the slack plot and deadpan style only resonated at a surface level for me.

  I followed up the movie by watching an excellent commentary that discussed the movie's themes of [identity and multiculturalism](https://www.youtube.com/watch?v=0tbenS0F7j4). I didn't latch on to these themes when I was watching the movie, but the additional context helped me appreciate some of the specific dialogue and plot choices.

  <div class="revisit"></div>
  <div class="date">Jan. 4, 2019</div>
</div>


<div class="note book">
  <div class="rating rating-4"></div>
  <div class="tag">Book</div>
  <h2 class="title">[The Jungle](https://en.wikipedia.org/wiki/The_Jungle)</h2>
  <div class="meta">1904 | Written by Upton Sinclair</div>

  The book has become infamous for its description of Chicago's meatpacking industry in the early 1900s. The outrage from which led to the creation of the FDA.

  But this is a small part of the book. The majority of which is an immigrant story. The story of Jugris Rudkus and his Lithuanian family who have recently immigrated to Chicago. They arrive with optimism and a drive to better their lives, but all this hope gets wittled away. As immigrants, they are a target for exploitation. And the work available to them in this newly industrialized city is harsh and unsafe. The first half of the book focuses on the trials of the family. The writing is simple and effective, and what they go through is harrowing.

  The latter half half of the book slumps a bit as we follow Jugris's solo adventures and finish with a somewhat dated speech on socialism. Even with these flaws, the book is still absolutely worth a read.

  _"I aimed at the public's heart, and by accident I hit it in the stomach." - Upton Sinclair on the reaction to his book_

  As a companion to this book, I highly recommend [Frontline's Trafficked in America](https://www.pbs.org/wgbh/frontline/film/trafficked-in-america/) documentary to see what similar exploitation looks like in modern America.

  <div class="date">Dec. 31, 2018</div>
</div>

<div class="note movie">
  <div class="rating rating-1"></div>
  <div class="tag">Movie</div>
  <h2 class="title">[Salad Days: A Decade Of Punk In Washington, DC (1980-90)](https://www.youtube.com/watch?v=lF3uSPyrQyQ)</h2>
  <div class="meta">2015 | Directed by Scott Crawford</div>

  A look at the people and the city from which which sprung out <a href="https://www.youtube.com/watch?v=SGJFWirQ3ks">Fugazi</a>, <a href="https://www.youtube.com/watch?v=thnb3UlH2zE">Bad Brains</a>, and many other influential hardcore/punk bands. And the record label in the middle of it all, Dischord Records, which is still kickin' to this day. Along the way we learn about the origin of the straight edge movement and emo(core), both of which I was familiar with, but not their roots. Fun documentary, but a little long, even for someone who likes the music.

  Recommended for those who like punk rock and also like niche musical documentaries.

  <div class="date">Nov. 21, 2018</div>
</div>


<div class="note movie">
  <div class="rating rating-5"></div>
  <div class="tag">Movie</div>
  <h2 class="title">[Slacker](https://www.youtube.com/watch?v=KlmfRuXxuXo)</h2>
  <div class="meta">1990 | Directed by Richard Linklater</div>

  The classic Gen-X indie film from <a href="https://en.wikipedia.org/wiki/Richard_Linklater">Richard Linklater</a>.

  The movie has no main character. Instead, it has a meandering camera that uses long takes to move between characters and stories, mostly unrelated. It's a movie about conversations and small moments, and not about plot. The unconventional structure is refreshing.

  The people, the conversations, everything, it all felt familiar. I lived in this world in the early 2000s in Boston, even though this movie takes place in Austin at the start of the 90s.

 Though the term _slacker_ has negative connotations now, Linklater thought of slackers in positive terms. Something akin to a hippie or a beatnik. <i>These are people who intentionally disconnect from mainstream society, not because they are apathetic or unmotivated, but because society isn't helping them, and they don't see what it offers.</i>

  _"Slacker is inspiration to keep on with those passion projects—to go your own way despite the pressure to conform. Above all, the film taught me this: Those who wander may not be lost." - Eleanor Capaldi_

  Recommended for those who say "film" rather than "movie". You know who you are. You probably enjoy other 'films' like [Breathless](https://www.youtube.com/watch?v=eHQ2Q-_bl8k) and [Buffalo 66](https://www.youtube.com/watch?v=A5FzzN20-60).

  <div class="revisit"></div>

  <div class="date">Oct. 4, 2018</div>
</div>


<div class="note movie">
  <div class="rating rating-4"></div>
  <div class="tag">Movie</div>
  <h2 class="title">[Blade Runner](https://www.youtube.com/watch?v=eogpIG53Cis)</h2>
  <div class="meta">1982 | Directed by Ridley Scott</div>

  When I first watched the movie, the visuals were what left a mark. Now after seeing _Blade Runnner 2049_ and reading <a href="https://en.wikipedia.org/wiki/Do_Androids_Dream_of_Electric_Sheep%3F">_Do Androids Dream of Electric Sheep?_</a>, I've come to appreciate the themes the movie explores. The plot is fine, but less remarkable.

  Dark alleys lit with neon, endless rain, noir lighting, and technology that is futuristic but also worn and textured. All of these are now visual touchstones that every modern sci-fi film taps. The impact of Blade Runner on sci-fi imagery, especially cyberpunk, cannot be overstated. And the movie still looks great 30+ years later.

  _What does it mean to be human?_ This is the overarching question in the movie. It plays out between humans and replicants. Replicants are 'robots' created by humans that are virtually identical to humans, but treated as property. Through out the movie, it's not clear if Deckard, Harrison Ford's character, is a replicant or not. This is an interesting way to point out that the answer to the question of Deckard's humanity doesn't matter. If as viewers, we can't tell if he is a replicant or not, does it matter if he is or not?

  <div class="date">Oct. 19, 2018</div>
</div>


</div>

<style>
.page-title {
  margin-bottom: 4px;
}

@media (min-width: 800px) {
  .page-title {
    font-size: 1.25rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }
}

.note {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-xl);
}

@media (min-width: 800px) {
  .note {
    padding: 1rem;
    border: 1px solid var(--border-color-light);
    background: white;
    /*font-size: 0.875rem;*/
  }

  .note.wip {
    border-style: dashed;
  }

}


@media (min-width: 1000px) {
  .note {
    width: 20rem;
  }
}

.note--intro {
  background: none;
  border: none;
  padding: 0;
}


.note a {
  text-decoration: underline;
  color: var(--color);
}

.note p:last-of-type{
  margin-bottom: 8px;
}

.note hr {
  margin: 8px 0;
  height: 1px;
  border: none;
  /* border-bottom: 1px dashed var(--border-color); */
}

.image {
  float: left;
  width: 120px;
  margin: 0 16px 8px 0;
  border-radius: 4px;
}

.tag {
  display: none;
  margin-top: -2px;
  margin-bottom: 2px;
  color: var(--secondary-color);
  font-size: 0.6875rem;
  font-weight: var(--x-bold);
  text-transform: uppercase;
  border-radius: var(--border-radius);
}

.tag.show {
  display: inline-block;
}

.title {
  margin: 0;
  margin-bottom: 2px;
}

.title a {
  text-decoration: none;
}

.title a:hover {
  text-decoration: underline;
}

.meta {
  font-weight: var(--bold);
  color: var(--muted-color);
}

.meta a {
  text-decoration: underline;
  color: var(--muted-color);
}

.rating {
  font-size: 1rem;
  color: var(--secondary-color);
}

.rating-1::before {
  content: '★☆☆☆☆';
}
.rating-2::before {
  content: '★★☆☆☆';
}
.rating-3::before {
  content: '★★★☆☆';
}

.rating-4::before {
  content: '★★★★☆';
}

.rating-5::before {
  content: '★★★★★';
}

.revisit {
  display: none;
}

.revisit::before {
  display: inline-block;
  padding: 1px 4px 2px;
  margin-bottom: 4px;
  color: #fff;
  background-color: #000;
  border-radius: var(--border-radius);
  font-weight: var(--x-bold);
  font-size: 0.6875rem;
  text-transform: uppercase;
}


.movie .revisit::before {
  content: 'Worth rewatching';
}

.date {
  margin-top: 4px;
  font-size: 0.75rem;
  font-weight: var(--bold);
  color: var(--muted-color);
}

/* .date:before {
  content: '- ';
} */


i {
  /*background: #ffb;*/
  font-style: normal;
}

i i {
  /*background: #ffb;*/
}
</style>


<script src="/js/vue.min.js"></script>
<script>


Vue.component('filter-button', {
  template: '#tpl-filter-button',
})

Vue.component('filters', {
  template: '#tpl-filters',
})

Vue.component('note', {
  template: '#tpl-note',
  props: {
    title: String,
    type: String,
    rating: Number,
    date: String,
    creator: String,
    noteDate: String,
  },
  computed: {
    creatorLabel() {
      switch (this.type) {
        case 'book':
          return `Written by ${this.creator}`;
        break;
        case 'movie':
        case 'tv show':
          return `Directed by ${this.creator}`;
        break;
        case 'music':
          return `by ${this.creator}`;
        break;
      }
    }
  }
})


new Vue({
  el: '#app',

  // data() {
  //   return {
  //     videos: [],
  //     sortedBy: 'date',
  //   };
  // },

  // watch: {
  //   sortedBy(newVal) {
  //     if (newVal === 'date') {
  //       this.videos.sort((a, b) => {
  //         return (new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime() ? -1 : 1);
  //       })
  //     } else if (newVal === 'duration') {
  //       this.videos.sort((a, b) => {
  //         return (strToSeconds(b.duration) > strToSeconds(a.duration) ? -1 : 1);
  //       })
  //     }
  //   },
  // },

  // mounted() {
  //   fetch('/data/inspiration-videos.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       this.videos = data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // },

  // methods: {
  //   sortBy(field) {
  //     this.sortedBy = field;
  //   },
  // }
});
</script>
