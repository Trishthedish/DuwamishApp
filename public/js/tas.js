$(function(){
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
    var backers = new Firebase('https://standwithduwamish.firebaseio.com/backers');
    backers.on("value", function(snapshot) {
      var backerTotal = snapshot.numChildren();
      backerCount.set(backerTotal); // updates firebase backerCount (a smaller query than always counting the thousands of backers for an intial load/ note lines 4 - 10)
      localStorage.backerCount = backerTotal;
    });
    showProgress(localStorage.backerCount);
  }

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
  }

  // taken from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //listen for submit to update backer in firebase
  // should also make api call to change.org *************(NOT YET)************

  $('button#pledge').on('click', function(event){
    event.preventDefault();
    var firstName = $('#firstName').val();
    var email = $('#email').val();
    var zip = $('#zip').val();
    if (zip.length == 5 && validateEmail(email)){
      $('.action-call').hide(); // hide call-to-action form
      $('.thanx-message').show(); // show hidden html
      $('.polpick').show();
      console.log('should show something here');
      $('#insert-name').html(firstName);
      var backer = new Firebase('https://standwithduwamish.firebaseio.com/backers/');
      backer.push({
        first: firstName,
        last: $('#lastName').val(),
        email: email,
        zipcode: zip,
      });
      updateBackers(backerCount);
    } else {
      $('#error').html("Check your email address and/or your zipcode");
    }
  });

  updateBackers(backerCount);
});

