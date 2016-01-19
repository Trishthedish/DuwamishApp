$(document).ready(function(){
    // read and dynamically insert total signatures from Firebase, currently reading total
    //   number of users, which will likely change to 'backers' or something similar
    //   when the petition actually begins.
    var userCount = new Firebase('https://standwithduwamish.firebaseio.com/userCount');
    userCount.on("value", function(snapshot){
      var numSigs = snapshot.val();
      $('#signatures').html(numSigs); // set initial value of users/signatures
      localStorage.userCount = numSigs;
      $('#sigs-needed').html(100000 - numSigs);

    })

    // will count users in database and update userCount....to be done after every user
    // submits to signing petition
    function setUserCount(userCount){
      var sig = new Firebase('https://standwithduwamish.firebaseio.com/users');
      sig.on("value", function(snapshot) {
        var numSigs = snapshot.numChildren();
        userCount.set(numSigs);
        localStorage.userCount = numSigs; //
      });
      showProgress(localStorage.userCount);
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

  setUserCount(userCount);
})

