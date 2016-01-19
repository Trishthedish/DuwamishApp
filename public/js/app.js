$(window).load(function() {
  var i = 0;
  var images = ['photos/chiefSealth.jpg','photos/tempCamp.jpg','photos/chiefneedle.jpg','photos/group.jpg','photos/porch.jpg','photos/totem.jpg','photos/woman.jpg','photos/duwamishcanoe.jpg'];
  var $imageLoc = $('#imgSlider').children('img');

  setInterval(function(){
    $imageLoc.fadeOut(1000, function () {
      $imageLoc.attr('src', images[i++]);
      $imageLoc.fadeIn(1000);
    });
    if(i == images.length) {
      i = 0;
    }
  }, 10000);
});
// jshint ignore:start
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
// jshint ignore:end
