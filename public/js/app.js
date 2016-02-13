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

  //changes FINALLY to FALSE VICTORY!  Tweens it to fadein
  function changeTag(){
    $('#content-head-4-1').text('FALSE').css("color", "#AF0000");
    TweenMax.fromTo('#content-head-4-1', 3, {opacity:0}, {opacity:1});
  }

  //Positions the Denied id tag in the middle according to screen width
  function posDenied(){
    var $width = $(window).width();
    console.warn($width);
    var percentWidth = (((1 - (480/$width))/2) * 100).toString() + '%';
    $('#denied').css('left', percentWidth);

    var $height = $(window).height();
    var percentHeight = (((1 - (320/$height))/2) * 100).toString() + '%';
    $('#denied').css('top', percentHeight );
  }

  function removeClassBegin(){
    $('#we').removeClass('begin');
  }

  //Activate position of Denied tag
  posDenied();

  //Initiate ScrollMagic Controller
  var controller = new ScrollMagic.Controller();

  //bouncing chevron
  var chev = [TweenMax.fromTo('#chevron', 1.5, {rotation:90, scale:1.5}, {y:100, scale: 1.5, rotation:90, ease:Bounce.easeinOut, delay: 2, repeat:-1, yoyo:true})];
      // chev.fromTo('#chevron', 3, {opacity:0, scale: 1.5}, {opacity:1, scale: 1.5});

  //initiate arrays of content for Tweening
  var $contentS1 = $('#scene1 .content'),
      $contentS2 = $('#scene2 .content');


  //SCENE 1
  var scene1 = TweenMax.staggerFrom($contentS1, 1, {opacity:0, cycle:{x:[-100,100]}, ease:Elastic.easeinOut}, 0.2);

  new ScrollMagic.Scene({triggerElement:"#scene1", triggerHook:0.15, duration:650})
          .setPin("#scene1")
          .setTween(scene1)
          .addTo(controller);

  //SCENE 2
  var scene2 = [TweenMax.staggerFrom($contentS2, 5, {opacity:1, rotationX:90, transformOrigin:"50% top", ease:Power4.easeOut}, 3),
                 TweenMax.to('#content-head-2-2', 3, {rotation:-120, transformOrigin:"right", delay: 6}),
                 TweenMax.to('#content-head-2-2', 1, {rotation:-70, transformOrigin:"right", delay:9}),
                 TweenMax.to('#content-head-2-2', 1, {rotation:-110, transformOrigin:"right", delay:10}),
                 TweenMax.to('#content-head-2-2', 1, {rotation:-80, transformOrigin:"right", delay:11}),
                 TweenMax.to('#content-head-2-2', 1, {rotation:-95, transformOrigin:"right", delay:12}),
                 TweenMax.to('#content-head-2-2', 1, {rotation:-90, transformOrigin:"right", delay:13})];
                 // TweenMax.to('#content-head-2-2', 0.2, {rotation:90, transformOrigin:"left", delay:2.4})];

  new ScrollMagic.Scene({triggerElement:"#scene2", triggerHook:0.3, duration:650})
        .setPin("#scene2")
        .setTween(scene2)
        .addTo(controller);

  // new ScrollMagic.Scene({triggerElement:"#scene2", triggerHook:0.3})
  //       .setTween(scene2B)
  //       .addTo(controller);

  //SCENE 3 VIBRATE
  var scene32 = new TimelineMax({repeat:-1});
      scene32.fromTo('#content-head-3', 0.2, {x:0}, {x:2, repeat:5})
             .fromTo('#content-head-3', 0.3, {x:0}, {x:6});


  new ScrollMagic.Scene({triggerElement:"#scene3", triggerHook:0.3, duration:850})
        .setPin("#scene3")
        .setTween(scene32)
        .addTo(controller);


  //Scene 4 FALSE VICTORY
  var scene4 = new TimelineMax();
      scene4.from('#content-head-4-1', 2, {ease:Bounce.easeOut, scale:1.5, x:-100})
            .from('#content-head-4-2', 2, {ease:Bounce.easeOut, scale:1.5, x:100})
            .from('#content4-1', 2, {ease:Linear.none, opacity:0, scale:0.1})
            .from('#content4-2', 2, {ease:Power1.easeOut, opacity:0, scale:0.1,}, "+=1")
            .to('#denied', 0.1, {opacity:1, delay:2}, "+=10")
            .from('#denied', 3, {ease:Bounce.easeOut, rotation: 720, scale:3, onStart:changeTag})
            .to('#content4-2', 3, {color: '#FA0000'});

  new ScrollMagic.Scene({triggerElement:"#scene4", triggerHook:0.2, duration:1100})
        .setPin("#scene4")
        .setTween(scene4)
        .addTo(controller);


  //scene5 Unite
  var scene5 = [TweenMax.fromTo('#you', 2.5, {color:"#05F", opacity:0, x:-200}, {color:"#05F", opacity:1, x:-200}),
                TweenMax.fromTo('#we', 2.5, {color:"#FF0", opacity:0, x:200, delay:1.25}, {color:"#FF0", opacity:1, x:200, delay:2.25}),
                TweenMax.from('#unite', 3, {opacity:0, delay:5}),
                TweenMax.to('#you', 3, {ease:Bounce.easeOut, x:0, color:"#0A0", delay:8, onStart:removeClassBegin}),
                TweenMax.to('#we', 3, {ease:Bounce.easeOut, x:0, color:"#0A0", delay:8}),
                TweenMax.from('#unite-sent', 6, {opacity:0, delay:12.5}),
                TweenMax.to('#unite', 3, {color:"#0A0", delay:12.5})];

  new ScrollMagic.Scene({triggerElement:"#scene5", triggerHook:0.3, duration:2500})
          .setPin("#scene5")
          .setTween(scene5)
          .addTo(controller);

  //Stand WITH DUWAMISH LETTERS
  var $headerArr = $('.letter');
  console.log($headerArr);

  var scene6 = TweenMax.staggerFrom($headerArr, 1, {ease:Elastic.easeOut, scale:0.1, cycle:{y:[-100,100]}, opacity:0}, 0.2);
                // TweenMax.from('#tas-btn', 3, {opacity:0, delay: 4})];
                // TweenMax.to('#tas-btn', .3, {glowFilter:{color:0x91e600, alpha:1, blurX:50, blurY:50}, repeat:-1, yoyo:true})];

  new ScrollMagic.Scene({triggerElement:"#scene6", triggerHook:0.3, offset:0, duration: 1000})
        .setPin("#scene6")
        .setTween(scene6)
        .addTo(controller);

  // Parallax
  new ScrollMagic.Scene({triggerElement: "#parallax1", triggerHook:"onEnter", duration:"200%"})
          .setTween("#parallax1 > section", {y: "80%", ease: Linear.easeNone})
          .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#parallax2", triggerHook:"onEnter", duration:"200%"})
          .setTween("#parallax2 > section", {y: "80%", ease: Linear.easeNone})
          .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#parallax3", triggerHook:"onEnter", duration:"200%"})
          .setTween("#parallax3 > section", {y: "80%", ease: Linear.easeNone})
          .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#parallax4", triggerHook:"onEnter", duration:"200%"})
          .setTween("#parallax4 > section", {y: "80%", ease: Linear.easeNone})
          .addTo(controller);
});
