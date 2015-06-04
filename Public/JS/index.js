

var myDataRef = new Firebase('https://standwithduwamish.firebaseio.com/reasons');
// accessing your realtime firebase database
$('#slider').slideReveal({
  trigger: $("#trigger")
});


$("#enter").on("click",function() {
 var response = $("#missing").val();
    if (response) {
      $("#slider").append("</br>" + response);
      $('#missing').val("");
      $('#slider').slideReveal("show");
      $("#trigger").text("Close");
    }
});

$("#trigger").on("click", function(){
  var $this = $(this);
  $this.toggleClass('truth');
  if($this.hasClass('truth')){   //what will be shown prior to click
    $this.text('close');
  }
  else {
    $this.text('View Responses');  //
  }
});


myDataRef.push({text: text});
myDataRef.set('User ' + name + ' says ' + text);

myDataRef.on('child_added', function(snapshot) {
  //We'll fill this in later.
});

