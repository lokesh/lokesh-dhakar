$(document).ready(function(){

    var LD = new LDCOM();
    LD.init();

});

LDCOM = function(){

};

LDCOM.prototype.init = function(){
  this.bindUIevents();
};

LDCOM.prototype.bindUIevents = function(){
  this.enableEmailLinks();
};

LDCOM.prototype.enableEmailLinks = function(){
	$('.email-link').on('click', function(event) {
		var a =  "lokesh.dhakar@",
			b = "gmail.com";
		window.location.href = "mailto:" + a + b;
		return false;
	});

};