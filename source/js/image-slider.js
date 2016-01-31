var images = ['photos/chiefSealth.jpg','photos/tempCamp.jpg','photos/chiefneedle.jpg','photos/group.jpg','photos/porch.jpg','photos/totem.jpg','photos/woman.jpg','photos/duwamishcanoe.jpg'];
var $imageLoc = $('#imgSlider').children('img');

var imageNodes = $.map(images, function(el, i){
  return '<div class="slide-image image-'+i+'" style="background-image:url('+el+');z-index:'+(-images.length-i)+'"></div>';
});
$('#image-slider-container').html(imageNodes);

var fadeInterval = 1000;
var transitionInterval = 10000;
var i = 0;
setInterval(function(){
  var $currentImage = $('.image-'+ i);
  var $newImage = $('.image-'+ (i+1));
  if($newImage.length) {
    $currentImage.fadeOut(fadeInterval);
    i++;
  } else {
    $('.image-0').fadeIn(fadeInterval, function(){$('.slide-image').show();});
    i = 0;
  }
}, transitionInterval);
