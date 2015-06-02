var User=function(name, location, cause) {
  this.name=name;
  this.location=location;
  this.cause=cause;
}

User.prototype.showMe = function(){
    $('.inputName').append(newUser.name);
    $('.inputLocation').append(newUser.location);
    $('.inputCause').append("I stand with the Duwamish because " + newUser.cause + ".");
}

var newUser;

$('.user-button').on('click', function(e) {
  e.preventDefault();
  var userName= $('.name').val();
  var userLocation= $('.place').val();
  var userCause= $('.cause').val();
  newUser = new User(userName, userLocation, userCause);
  newUser.showMe();
});

$('.polbutton').on('click', function(e){
  e.preventDefault();
  var polEmail= $(this).attr('id');
  var polName= $(this).attr('title')
  $('.sirORmadam').append("Dear " + polName + ",");
});

