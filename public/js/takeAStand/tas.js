$(document).ready(function(){
  // read and dynamically insert total signatures from Firebase, currently reading total
  //   number of backers
  var backerCount = new Firebase('https://standwithduwamish.firebaseio.com/backerCount');
  backerCount.on("value", function(snapshot){
    var numSigs = snapshot.val();
    $('#signatures').html(numSigs); // set initial value of users/signatures
    localStorage.backerCount = numSigs;
    $('#sigs-needed').html(100000 - numSigs);
  });

  // will count users in database and update backerCount....to be done after every user
  // submits to signing petition....they are now 'backers'
  function updateBackers(backerCount){
    var sig = new Firebase('https://standwithduwamish.firebaseio.com/backers');
    sig.on("value", function(snapshot) {
      var numSigs = snapshot.numChildren();
      backerCount.set(numSigs);
      localStorage.backerCount = numSigs; //
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
    $('.action-call').hide();
    $('.thanx-message').show();
    $('#insert-name').html(firstName)
    var backer = new Firebase('https://standwithduwamish.firebaseio.com/backers');
    backer.set({backer: {
      first: firstName,
      last: $('#lastName').val(),
      email: $('#email').val(),
      zipcode: $('#zip').val(),
    }});
    updateBackers(backerCount);
  })
  updateBackers(backerCount);
})

