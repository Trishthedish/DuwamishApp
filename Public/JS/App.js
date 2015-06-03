  $(window).load(function() {
  var i = 0;
  var images = ['photos/chiefSealth.jpg','photos/duwamishcanoe.jpg','photos/chief-sealth-statue.jpg','photos/chesh-canoe-03.jpg'];
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
