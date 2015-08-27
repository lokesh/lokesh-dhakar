function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function enableEmailLinks() {
  var emailLinks = document.querySelectorAll('.js-email-link')
  for (var i =0; i < emailLinks.length; i++) {
    emailLinks[0].addEventListener('click', function(event) {
      var a = "lokesh.dhakar@";
      var b = "gmail.com";
      window.open("mailto:" + a + b, 'email');
      return false;
    })
  }
}

ready(function() {
  enableEmailLinks();
})
