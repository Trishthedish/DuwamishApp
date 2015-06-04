$('#slider').slideReveal({
  trigger: $("#trigger")
});

$("#trigger").on("click", function(){
  var $this = $(this);
  $this.toggleClass('truth');
  if($this.hasClass('truth')){   //what will be shown prior to click
    $this.text('close');
  }
  else {
    $this.text('truth');  //
  }
});
