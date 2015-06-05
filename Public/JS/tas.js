var duwamish={};

duwamish.User=function(name, location, cause) {
  this.name=name;
  this.location=location;
  this.cause=cause; }

duwamish.Politician=function(name,email) {
  this.name=name;
  this.email=email; }

duwamish.sessions=[duwamish.appUsers];
duwamish.contacts=[duwamish.appContacts];

duwamish.User.prototype.showMe = function(){
  $('.inputName').append(duwamish.newUser.name);
  $('.inputLocation').append(duwamish.newUser.location);
  $('.inputCause').append("I stand with the Duwamish because " + duwamish.newUser.cause + ".");
}

$('.user-button').on('click', function(e) {
  e.preventDefault();
  var userName= $('.name').val();
  var userLocation= $('.place').val();
  var userCause= $('.cause').val();
  duwamish.newUser = new duwamish.User(userName, userLocation, userCause);
  duwamish.sessions.push(duwamish.newUser);
  duwamish.appUsers.push(duwamish.newUser);
  duwamish.newUser.showMe();
  $('.polpick').removeAttr('id');
  $('form').attr('id', 'hidden-pol');
});

$('.polbutton').on('click', function(e){
  e.preventDefault();
  var polName= $(this).attr('title')
  var polEmail= $(this).attr('id');
  duwamish.newPolitician = new duwamish.Politician(polName, polEmail);
  duwamish.contacts.push(duwamish.newPolitician);
  $('.sirORmadam').append("Dear " + polName + ", ");
  duwamish.appContacts.push(duwamish.newPolitician)
  $('.choose-letter').removeAttr('id');
  $('.polpick').attr('id', 'hidden-pol');
});

(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);

$('#emailLink').on('click', function(){
  $(".fillin-letter p" ).prepend(document.createTextNode("%0D%0A%0D%0A"));
  $('#emailLink').attr('href', "mailto:" + duwamish.newPolitician.email + "?subject=Stand%20With%20The%20Duwamish&body="+$('.fillin-letter').text());
  $("body *").replaceText("%0D%0A%0D%0A", "");
});

duwamish.allDone=function(){
  if($('.goodbye').length === 5) {
    $('.polpick').attr('id', 'hidden-pol');
    $('.thanx-message').removeAttr('id');
  }
}

duwamish.appUsers = new Firebase('https://standwithduwamish.firebaseio.com/users');
duwamish.appContacts = new Firebase('https://standwithduwamish.firebaseio.com/contacts');
