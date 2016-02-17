$(function() {
  // jshint ignore:start
  // Add twitter widget functionality
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
  // jshint ignore:end

  $('body').on('click', function(e) {
     $('.nav-links-container').removeClass('expanded');
     $('#menu-icon').attr('aria-expanded', false);
  });
  $('#menu-icon').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    if($this.attr('aria-expanded') === 'true') {
      $this.attr('aria-expanded', false);
    } else {
      $this.attr('aria-expanded', true);
    }
    $('.nav-links-container').toggleClass('expanded');
  });
});
