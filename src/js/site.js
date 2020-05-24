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


