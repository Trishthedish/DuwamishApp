$(function(){
  var signed = localStorage.signed;
  if (signed === "true"){
    maskForm(localStorage.firstName);
  }

  // read and dynamically insert total signatures from Firebase, currently reading total
  //   number of backers
  var backerCount = new Firebase('https://standwithduwamish.firebaseio.com/backerCount');
  backerCount.on("value", function(snapshot){
    var signatureCount = snapshot.val();
    $('#sigs-count').text(signatureCount); // set initial value of users/signatures
    localStorage.backerCount = signatureCount;
    $('#sigs-needed').text(100000 - signatureCount);
  });

  function maskForm(firstName){
    $('.step1').fadeOut(500).empty().html('<h3>Thank you <span style="color: #F6B316">' + firstName + '</span> for supporting us</h3>').addClass('signed').fadeIn(1000);
  }

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
    var percent = (signatures * 100)/100000;
    var adjPercent = percent > 10 ? percent : 10; // 10% minimum showing
    var $meterBar = $("#meter-bar");
    $meterBar
      .data("origWidth",  adjPercent + "%")
      .width(0)
      .animate({
        width: $meterBar.data('origWidth') // or + "%" if fluid
      }, 1200);
  }

  // taken from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //Change.org build
  function buildParameters(formData){
    return {
      api_key: "015735396ea389bccd3846d1113ac7ef9395d0fb7cde8670cdd2baa4bf22d9aa",
      timestamp: Date.now(),
      endpoint: "/v1/petitions/5569894",
      source: "http://localhost:3000",
      email: formData['email'],
      first_name: formData['first'],
      last_name: formData['last'],
      state_province: 'WA',
      postal_code: formData['zipcode'],
      country_code: 'US'
    }
  }


  function getHash(){
    $.get('/ajax/change-petition', function(data, status){
      return data['hash']
    });
  }

  function getRsig(formData){
    var data = buildParameters(formData);
    console.log(data);
    $.ajax({
      type: 'PUT',
      url: 'https://api.change.org/v1/petitions/5569894',
      data: data,
      dataType: 'json',
    }).success(function(data, status){
      console.log(data);
      console.log(success);
    }).error(function(data, status){
      console.log(data + status + '%%%% ERROR %%%%');
    })
  }


  //listen for submit to update backer in firebase
  // should also make api call to change.org *************(NOT YET)************

  $('button#pledge').on('click', function(event){
    event.preventDefault();
    var firstName = capitalizeFirstLetter($('#firstName').val());
    var email = $('#email').val();
    var zip = $('#zip').val();
    var lastName = $('#lastName').val();
    var formData = {first: firstName, last: lastName, email: email, zipcode: zip};
    getRsig(formData);
    if (zip.length === 5 && validateEmail(email)){
      var backer = new Firebase('https://standwithduwamish.firebaseio.com/backers/');
      backer.push(formData);
      maskForm(firstName);
      updateBackers(backerCount);
    } else {
      console.log('Error with form');
      $('#error').show().text("Check your email address and/or your zipcode for errors");
    }
  });

  // copy the sample letter text to clipboard. Can be generisized if needed
  $('#copy-button').on('click', function() {
    $('#sample-letter').select();
    document.execCommand('copy');
  });

  updateBackers(backerCount);

});

