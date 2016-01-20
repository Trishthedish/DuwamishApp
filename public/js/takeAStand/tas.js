$(document).ready(function(){
  // read and dynamically insert total signatures from Firebase, currently reading total
  //   number of backers
  var backerCount = new Firebase('https://standwithduwamish.firebaseio.com/backerCount');
  backerCount.on("value", function(snapshot){
    var signatureCount = snapshot.val();
    $('#signatures').html(signatureCount); // set initial value of users/signatures
    localStorage.backerCount = signatureCount;
    $('#sigs-needed').html(100000 - signatureCount);
  });

  // will count users in database and update backerCount....to be done after every user
  // submits to signing petition....they are now 'backers'
  function updateBackers(backerCount){
    var sig = new Firebase('https://standwithduwamish.firebaseio.com/backers');
    sig.on("value", function(snapshot) {
      var signatureCount = snapshot.numChildren();
      backerCount.set(signatureCount); // updates firebase backerCount (a smaller query than always counting the thousands of backers for an intial load)
      localStorage.backerCount = signatureCount; //
    });
    showProgress(localStorage.backerCount);  //using local storage for the backer count
  };

  // progress bar, will register 10% for visual sake until the signature total is higher
  function showProgress(signatures){
    $(".meter > span").each(function() {
      var percent = (signatures * 100)/100000;
      var adjPercent = percent > 10 ? percent : 10; // 10% minimum showing
      $(this)
        .data("origWidth",  adjPercent + "%")
        .width(0)
        .animate({
          width: $(this).data('origWidth') // or + "%" if fluid
        }, 1200);
    });
  };

  //listen for submit to update backer in firebase
  $('button#pledge').on('click', function(event){
    event.preventDefault();
    var firstName = $('#firstName').val()
    $('.action-call').hide(); // hide call-to-action form
    $('.thanx-message').show(); // show hidden html
    $('#insert-name').html(firstName)
    var backer = new Firebase('https://standwithduwamish.firebaseio.com/backers');
    backer.set({backer: {
      first: firstName,
      last: $('#lastName').val(),
      email: $('#email').val(),
      zipcode: $('#zip').val(),
    }});
    updateBackers(backerCount);
  });

  updateBackers(backerCount);
})

