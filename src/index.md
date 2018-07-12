---
date: 2018-07-08
layout: post.njk
---
<style>
.btn {
  margin-right: 8px;
}
</style>

# Hello!
 
My name is <span class="bio__name">Lokesh Dhakar</span>. I work on the Design Engineering team at [Weebly](http://weebly.com) in San Francisco.

Previously I worked at [Getaround](https://www.getaround.com/) as the Engineering Lead of the Web Team. See my full work history at [LinkedIn](https://www.linkedin.com/in/lokeshdhakar).

I created the original [Lightbox](http://lokeshdhakar.com/projects/lightbox2/) script many years ago. More recently I created [Color Thief](http://lokeshdhakar.com/projects/color-thief/). See all my open source projects on [Github](https://github.com/lokesh).

I take photos on [Instagram](https://instagram.com/lokesh), post designs on [Dribbble](https://dribbble.com/lokesh), and track my runs and bike rides on [Strava](https://www.strava.com/athletes/1136437).

<a class="btn" href="https://twitter.com/lokesh">Follow me on Twitter</a> <a class="btn js-email-link" href="#">Email me</a>

<script>
  $(function() {
      var emailLinks = $('.js-email-link').on('click', (event) => {
        var a = "lokesh.dhakar@";
        var b = "gmail.com";
        window.open("mailto:" + a + b, 'email');
        return false;  
      })
  });
</script>
