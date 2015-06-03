var duwamish={};

duwamish.User=function(name, location, cause) {
  this.name=name;
  this.location=location;
  this.cause=cause;
}

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
  duwamish.newUser.showMe();
});


$('.polbutton').on('click', function(e){
  e.preventDefault();
  var polEmail= $(this).attr('id');
  var polName= $(this).attr('title')
  $('.sirORmadam').append("Dear " + polName + ",");
  console.log(duwamish.newUser);
  duwamish.appUsers.set(duwamish.newUser);
});

duwamish.appUsers = new Firebase('https://standwithduwamish.firebaseio.com/users');
