$(window).load(function() {
var i = 0;
var images = ['photos/chiefSealth.jpg','photos/tempCamp.jpg','photos/chiefneedle.jpg','photos/group.jpg','photos/porch.jpg','photos/totem.jpg','photos/woman.jpg','photos/duwamishcanoe.jpg'];
  console.log(images);
var $imageLoc = $('#imgSlider').children('img');

setInterval(function(){
 $imageLoc.fadeOut(1000, function () {
   $imageLoc.attr('src', images[i++]);
   $imageLoc.fadeIn(1000);
   });
   if(i == images.length)
    i = 0;
}, 10000);
});
