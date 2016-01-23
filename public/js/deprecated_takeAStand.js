var duwamish = {};

duwamish.polArray = [];

duwamish.appUsers = new Firebase('https://standwithduwamish.firebaseio.com/users');
duwamish.appContacts = new Firebase('https://standwithduwamish.firebaseio.com/contacts');

duwamish.User = function(name, location, cause) {
  this.name=name;
  this.location=location;
  this.cause=cause;
};

duwamish.Politician = function(name, email) {
  this.name=name;
  this.email=email;
};

duwamish.sessions=[duwamish.appUsers];
duwamish.contacts=[duwamish.appContacts];

var showMe = function(user){
  $('.inputName').append(user.name);
  $('.inputLocation').append(user.location);
  $('.inputCause').append('I stand with the Duwamish because ' + user.cause + '.');
};

duwamish.Politician.prototype.reload = function(){
  $('p.selectPol').replaceWith('<p class="selectPoltwo">Who else should hear our message?</p>');
  $('.sirORmadam').empty();
  duwamish.newPolitician.email = " ";
};

$(window).load(function(){
  duwamish.polArray = JSON.parse(window.sessionStorage.getItem('polString')) || [];
  if(window.sessionStorage.getItem('currentUser')){
    $('#standForm').hide();
    $('.polpick').removeAttr('id');
    var userSession = JSON.parse(window.sessionStorage.getItem('currentUser'));

    var newUser = new duwamish.User(userSession.name, userSession.localStorage, userSession.cause);
    showMe(newUser);
  }
});

$('.user-button').on('click', function(e) {
  e.preventDefault();
  var userName= $('.name').val();
  var userLocation= $('.place').val();
  var userCause= $('.cause').val();

  var newUser = new duwamish.User(userName, userLocation, userCause);

  if (!(sessionStorage.getItem('currentUser'))){
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
  }
  var userData = JSON.parse(localStorage.getItem('currentUser'));

  duwamish.sessions.push(newUser);
  duwamish.appUsers.push(newUser);
  showMe(newUser);

  $('.polpick').removeAttr('id');
  $('form').attr('id', 'hidden-pol');
});

$('.polbutton').on('click', function(e){
  e.preventDefault();
  var polName= $(this).attr('title');
  var polEmail= $(this).attr('id');

  duwamish.newPolitician = new duwamish.Politician(polName, polEmail);
  duwamish.contacts.push(duwamish.newPolitician);
  duwamish.appContacts.push(duwamish.newPolitician);
  duwamish.polArray.push(duwamish.newPolitician);
  sessionStorage.setItem('polString', JSON.stringify(duwamish.polArray));

  $('.sirORmadam').append('Dear ' + polName + ', ');

  $(this).addClass('goodbye').removeClass('polbutton');
  $('.choose-letter').removeAttr('id');
  $('.polpick').attr('id', 'hidden-pol');
});


//replaceText function TODO: replace this with something better
// jshint ignore:start
(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);
// jshint ignore:end

$('#emailLink').on('click', function(){
  $(".fillin-letter p" ).prepend(document.createTextNode("%0D%0A%0D%0A"));

  var emailAddress = duwamish.newPolitician.email;
  var emailSubject = encodeURIComponent('Stand With The Duwamish');

  $('#emailLink').attr('href',
    'mailto:' + emailAddress +
    '?subject=' + emailSubject +
    '&body=' + $('.fillin-letter').text()
    );

  $("body *").replaceText("%0D%0A%0D%0A", "");

  $('.choose-letter').attr('id', 'hidden-letter');
  $('.polpick').removeAttr('id');

  duwamish.newPolitician.reload();
  duwamish.allDone();
});