
//js code
// var slider = $('#slider').slider(); //slideReveal return $('#slider')
// //to call it
// slider.slideReveal("show"); // which is equal to $('#slider').slideReveal("show")
// //then to show it, you call:
// slider.slideReveal("hide"); // which is = to $('#slider').slideReveal("hide");

var trggr = document.getElementById("trggr");
console.dir(trggr);

trggr.addEventListener("click", function() {
if (trggr.innerHTML === "close") {
  trggr.innerHTML = "take a peek!";
} else {
  trggr.innerHTML ="close";
}
  $('#slider').slideReveal({
  trigger: $("#trggr")
});
});

  // alert("Hi whats up!");
  // $('#slider').slideReveal({
  //   trggr: $("#trggr")






