---
date: 2018-10-03
layout: page.njk
---

<div class="page-tag" style="margin-bottom: 12px;">Notes</div> 

<div class="notes">

<div class="note movie">
  <div class="tag">Movie</div>
  <h2 class="title">Slacker</h2>
  <div class="meta">1990 | Directed by Richard Linklater</div>

  <p>The classic Gen-X indie film from <a href="https://en.wikipedia.org/wiki/Richard_Linklater">Richard Linklater</a>.</p>

  <p>The movie has no main character. Instead, it has a meandering camera that uses long takes to move between characters and stories, mostly unrelated. It's a movie about conversations and small moments, and not about plot. The unconventional structure is refreshing.</p>

  <p>The people, the conversations, everything, it all felt familiar. I lived in this world in the early 2000s in Boston, even though this movie takes place in Austin at the start of the 90s.</p>

 <p>Though the term _slacker_ has negative connotations now, Linklater thought of slackers in positive terms. Something akin to a hippie or a beatnik. <i>These are people who intentionally disconnect from mainstream society, not because they are apathetic or unmotivated, but because society isn't helping them, and they don't see what it offers.</i>
  </p>

  <p>"Slacker is inspiration to keep on with those passion projects—to go your own way despite the pressure to conform. Above all, the film taught me this: Those who wander may not be lost." - Eleanor Capaldi</p> 

  <p class="date">- Oct. 4, 2018</p> 
</div>


<div class="note movie">
  <div class="tag">Movie</div>
  <h2 class="title">Blade Runner</h2>
  <div class="meta">1982 | Directed by Ridley Scott</div>

  <p>When I first watched the movie, the visuals were what left a mark. Now after seeing _Blade Runnner 2049_ and reading <a href="https://en.wikipedia.org/wiki/Do_Androids_Dream_of_Electric_Sheep%3F">_Do Androids Dream of Electric Sheep?_</a>, I've come to appreciate the themes the movie explores. The plot is fine, but less remarkable.</p>

  <p>Dark alleys lit with neon, endless rain, noir lighting, and technology that is futuristic but also worn and textured. All of these are now visual touchstones that every modern sci-fi film taps. The impact of Blade Runner on sci-fi imagery, especially cyberpunk, cannot be overstated. And the movie still looks great 30+ years later.</p>

  <p>_What does it mean to be human?_ This is the overarching question in the movie. It plays out between humans and replicants. Replicants are 'robots' created by humans that are virtually identical to humans, but treated as property. Through out the movie, it's not clear if Deckard, Harrison Ford's character, is a replicant or not. This is an interesting way to point out that the answer to the question of Deckard's humanity doesn't matter. If as viewers, we can't tell if he is a replicant or not, does it matter if he is or not?</p>

  <p><i><i>_More Human than human._ With AI getting more advanced, the question of 'What does it mean to be human?' will become important. If Siri is able to emote, show empathy, and collect memories, how does that change how we think about her?</i></i></p>

  <p class="date">- Oct. 19, 2018</p> 
</div>



<div class="note article rough" style="display: none;">
  <div class="tag">Article</div>
  <h2 class="title">Big Budget Items: The starchitectural landscape of Frank Gehry</h2>

  <div class="meta">2019 | the weekly Standard | <a href="https://www.weeklystandard.com/andrew-ferguson/big-budget-items">Link</a></div>

  <p>The article highlights Frank Gehry's architectural career, with a focus on his early Santa Monica residence and his later <a href="https://www.google.com/search?q=8+spruce+street+new+york+gehry&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiSq-qSpLfeAhWcFTQIHXqeBAQQ_AUIFCgC&biw=1386&bih=978">8 Spruce Street skycraper</a>.</p>

  <p>The <a href="https://en.wikipedia.org/wiki/Gehry_Residence">Gehry Residence</a>, which is built atop an existing bungalow, uses unconventional materials like corrugated steel and most infamously, chain-link fences. It is a statement. "the architect's chief purpose in his breakthrough work was mockery and satire, rooted in a contempt for the "hypocrisy" that his golden neighborhood represented."</p>

  <p>Gehry's later work received mostly positive reviews and his projects and budgets grew in scale. There was some criticism of his later work</p>

  brings up the question which I have googled many times: What are the differences between Modernism and Post-Modernism?</p>

  <p class="date">- Oct. 21, 2018</p> 
</div>

</div>

<style>

.note {
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 14px;
}

@media (min-width: 480px) {
  .note {
    width: 320px;
  }
}

.note a {
  text-decoration: underline;
  color: var(--color);
}

.image {
  float: left;
  width: 120px;
  margin: 0 16px 8px 0;
  border-radius: 4px;
}

.tag {
  display: none;
  padding: 1px 4px 2px 4px;
  margin-bottom:  4px;
  color: var(--muted-colo);
  background-color: #f3f3f3;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: var(--border-radius);
}

.title {
  margin: 0;
}

.meta {
  font-weight: bold;
  color: var(--muted-color);
}

.meta a {
  text-decoration: underline;
  color: var(--muted-color);
}


.date {
  display: none;
  font-weight: bold;
  color: var(--muted-color);
}


i {
  background: #ffb;
  font-style: normal;
}

i i {
  background: #ffb;
}
</style>

<script src="/js/masonry.pkgd.min.js"></script>
<script>
const msnry = new Masonry( '.notes', {
  gutter: 16,
  transitionDuration: '0.2s'
});

</script>
