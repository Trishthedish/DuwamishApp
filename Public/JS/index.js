var trggr = document.getElementById("trggr");
console.dir(trggr);

trggr.addEventListener("click", function(e) {
  e.preventDefault();
  if (trggr.innerHTML === "close") {
    trggr.innerHTML = "take a peek!";
  } else {
    trggr.innerHTML ="close";
  }
    $('#slider').slideReveal({
    trigger: $("#trggr")
  });
});







