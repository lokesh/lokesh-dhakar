---
title: "Coffee drinks illustrated"
date: 2007-08-20
comments: true
layout: post.njk
highlight: true
---
<h2 class="subtitle">Side-by-side diagrams of a few common espresso drinks</h2>

I'm new to the world of fancy coffee drinks. With the vast number of ordering options and new words with accented characters to pronounce the coffee shop ordering experience can be intimidating. I've created a few small illustrations to help myself and others wrap their head around some of the small differences.

### About espresso ###
Espresso is prepared by forcing pressurized steam through finely ground dark-roast coffee beans. Think of it is strong, concentrated coffee. You can add extra 'shots' of espresso to make your drink stronger.


<section class="drinks">

  <figure class="drink">
    <div class="img-wrapper">
      <img src="/media/posts/coffee-drinks-illustrated/espresso.svg" alt="Espresso" />
    </div>
    <h2>Espresso</h2>
  </figure>

  <figure class="drink">
    <div class="img-wrapper">
      <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/espresso_macchiato.svg?2" alt="Espresso Macchiato ingredients" />
    </div>
    <h2>Espresso Macchiato</h2>
    <p class="ingredients">Milk foam, Espresso</p>
  </figure>

  <figure class="drink">
    <div class="img-wrapper">
      <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/espresso_con_panna.svg?2" alt="Espresso con Panna ingredients" />
    </div>
    <h2>Espresso con Panna</h2>
    <p class="ingredients">Whipped Cream, Espresso</p>
  </figure>


  <figure class="drink">
    <div class="img-wrapper">
      <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/caffe_latte.svg?2" alt="Caffé Latte ingredients " />
    </div>
    <h2>Caffé Latte</h2>
    <p class="ingredients">Milk Foam, Steamed Milk, Espresso</p>
  </figure>

  <figure class="drink">
    <div class="img-wrapper">
      <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/flat_white.svg?2" alt="Flat White ingredients" />
    </div>
    <h2>Flat White</h2>
    <p class="ingredients">Steamed Milk, Espresso</p>
  </figure>

  <figure class="drink">
    <div class="img-wrapper">
      <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/cafe_breve.svg?2" alt="Cafe Breve ingredients" />
    </div>
    <h2>Cafe Breve</h2>
    <p class="ingredients">Milk Foam, Steamed Half-and-half, Espresso</p>
  </figure>

 <figure class="drink">
    <div class="img-wrapper">
        <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/cappuccino.svg?2" alt="Cappuccino ingredients" />
    </div>
    <h2>Cappuccino</h2>
    <p class="ingredients">Milk Foam, Steamed Milk, Espresso</p>
  </figure>

  <figure class="drink">
    <div class="img-wrapper">
      <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/caffe_mocha.svg?2" alt="Caffe Mocha ingredients " />
    </div>
    <h2>Caffé Mocha</h2>
    <p class="ingredients">Steamed Milk, Espresso</p>
  </figure>

  <figure class="drink">
    <div class="img-wrapper">
      <img class="drink-img" src="/media/posts/coffee-drinks-illustrated/americano.svg?2" alt="Americano ingredients" />
    </div>
    <h2>Americano</h2>
    <p class="ingredients">Water, Espresso</p>
  </figure>

</section>


Each drink above is an individual image. I've also created a single image that contains all [nine coffee drinks](/media/posts/coffee-drinks-illustrated/9_coffee_drinks_illustrated.png) for convenient saving/sharing.


### About the diagrams ###

I gathered most of my information from [Wikipedia](http://www.wikipedia.org) and tidbits from other online sources. Be aware that drinks might be prepared a bit differently coffee shop to coffee shop, and especially country to country.

<style>
.drinks {
  /* Offset left to optically center */
  position: relative;
  left: -6px;

  display: grid;
  grid-template-columns: repeat(2, minmax(7.5rem, 1fr));
  grid-column-gap: 8px;
  grid-row-gap: 16px;
  margin: 24px 0;
}

@media (min-width: 600px) {
  .drinks {
    grid-template-columns: repeat(3, minmax(8.75rem, 15rem));
  }
}

.drink {
  text-align: center;
}

.img-wrapper {
  padding: 0 16px;
}

.drink img {
  width: 100%;
}

.drink h2 {
  margin-top: 2px;
  margin-bottom: 0;
  font-size: 1rem;
}

@media (min-width: 600px) {
  .drink h2 {
    font-size: 1.125rem;
  }
}

.ingredients {
  margin-top: 0;
  color: var(--muted-color);
  font-size: 0.75rem;
  font-weight: bold;
}

.figure--coffee-drinks {
  display: table;
  max-width: 640px;
  margin-bottom: 16px;
}

.figure--coffee-drinks img{
  max-width: 100%;
  margin-bottom: 8px;
}

</style>
