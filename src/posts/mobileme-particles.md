---
layout: post.jade
title: "MobileMe particles"
date: 2011-09-20 16:16
comments: true
categories:
---
The soon to be retired, MobileMe service from Apple, has a [beautiful login page][1] with wispy particles floating about. There is a lot to love on this page and an unbelievable attention to detail.

Inspired by the login page and a wanting to tinker with canvas and particles I set out to recreate the wispy particle effect. You can see the progress I made at the following page: [mobileme-particles][2]

<div class="image-wrapper-wide">
  <a href="http://lokeshdhakar.com/projects/mobileme-particles/" class="loadPageInline">
    <img src="/media/posts/mobileme-particles/mobileme_particles.jpg" alt="Cloud iamge with particles flowing out from behind" title="mobileme_particles" class="scale" />
  </a>
</div>

I'm happy with how it turned out but there are a few things that could be improved. For one, the movement in the original is less rigid with more twists and turns. Is a flocking algorithm being used? Also, the mouse interaction with the particles in the original is livelier and has a nice bounce back effect when the mouse moves away from the particles.

If you'd like to look at or use the code you can grab it on [GitHub][3].

### Learning about particle systems

There are quite a few places on the web to learn about simple particle systems. If you want to go a little further and add forces, I found the following two posts useful:

*   [Andrew Hoyer | Particle System][4]
*   [Creating a Particle System in Processing: Applying Forces][5]

 [1]: https://auth.me.com/authenticate?service=mail
 [2]: http://lokeshdhakar.com/projects/mobileme-particles/
 [3]: https://github.com/lokesh/mobileme-particles
 [4]: http://andrew-hoyer.com/experiments/particle_system/
 [5]: http://blog.datasingularity.com/?p=362
