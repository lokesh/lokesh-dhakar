/**
 * Activate email links which are designated with .js-email-link classes.
 * We're avoiding putting our email in the href to prevent harvesting for
 * spam. I'm not certain this is still an issue, but keeping in for now.
 */

export function enableEmail() {
	[...document.getElementsByClassName('js-email-link')].forEach(link => {
		link.addEventListener('click', event => {
	    const a = "lokesh.dhakar@";
	    const b = "gmail.com";
	    window.open(`mailto:${a}${b}`, 'email');
      return false;
    });
  });
}

export function highlightActiveNavItem() {
	const path = window.location.pathname.slice('1');
	// link.classList.add("active");

	document.querySelectorAll('.nav__item').forEach(el => {
		// console.log(el.href, window.location.href);
		if (el.href === window.location.href) {
			el.classList.add('nav__item--active');
			console.log(el.href);
		}
	})
    
}


// <nav class="nav">
//       <div class="nav__list">
//         <a href="/" class="nav__item">Home</a>
//         <a href="/work/" class="nav__item">Work</a>


// const MIN_SCROLLX_HIDE_NAV = 50;
// const body = document.querySelector('body');

// function hideNavOnHorizontalScroll() {
//   body.classList.toggle('hide-desktop-nav', window.scrollX > MIN_SCROLLX_HIDE_NAV);
// }

// export function enableHorizontalScrollCheck() {
//   window.addEventListener(
//     'scroll',
//     hideNavOnHorizontalScroll,
//     { passive: true }
//   );

//   hideNavOnHorizontalScroll();
// };


