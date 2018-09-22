/**
 * Activate email links which are designated with .js-email-link classes.
 * We're avoiding putting our email in the href to prevent harvesting for
 * spam. I'm not certain this is still an issue, but keeping in for now.
 */
Array.from(document.getElementsByClassName('js-email-link')).forEach(link => {
  link.addEventListener('click', event => {
    var a = "lokesh.dhakar@";
    var b = "gmail.com";
    window.open("mailto:" + a + b, 'email');
    return false;
  })
})