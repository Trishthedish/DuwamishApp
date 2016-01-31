// var truthInput ={};

// var myDataRef = new Firebase('https://standwithduwamish.firebaseio.com/reasons');
// // accessing your realtime firebase database
// $('#slider').slideReveal({
//   trigger: $("#trigger")
// });

// $("#enter").on("click",function() {
//   truthInput.response = $("#missing").val();
//   if (truthInput.response) {
//     myDataRef.push(truthInput.response);
//     $('#slider').slideReveal("show");
//     $("#trigger").text("Close");
//   }
// });

// $("#trigger").on("click", function(){
//   var $this = $(this);
//   $this.toggleClass('truth');
//   if($this.hasClass('truth')){   //what will be shown prior to click
//     $this.text('View Responses');
//   } else {
//     $this.text('View Responses');
//   }
// });

// myDataRef.on('child_added', function(snapshot) {
//   var response = snapshot.val();
//     $("#slider").append("</br>" + response);
//     $('#missing').val("");
// });

