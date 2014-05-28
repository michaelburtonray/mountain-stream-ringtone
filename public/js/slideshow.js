"use strict";

define(
  [
    'modernizr'
  ],

  function() {

    var scrollTop,
      transform,
      scrollTopPosition,
      stage_el,
      slides,
      current_slide_index = 0,
      slide_position_array = [],
      zoomed = false;

    function Slideshow(selector) {
      this.el = document.querySelector(selector),
      stage_el = this.el.querySelector('.stage'),
      slides = stage_el.children;

      this.parallax();

      setStage();
      window.addEventListener('resize', setStage);

      stage_el.addEventListener('click', goToSlide);
    }

    Slideshow.prototype.parallax = function() {
      var Slideshow = this;

      var new_scrollTop = (document.documentElement && document.documentElement.scrollTop  || document.body && document.body.scrollTop  || 0);

      if(new_scrollTop !== scrollTop) {

        scrollTop = Math.max(0, new_scrollTop),
        transform = 'translateY(' + (scrollTop/-1) + 'px) scale(.5)';
        stage_el.style.webkitTransform = transform;
        console.log('transform', transform);

      } else {



      }

      requestAnimationFrame(this.parallax.bind(this));
    }

    function setStage() {
      var translateX,
        translateY,
        transform;

      console.log('slides', slides);

      [].forEach.call(slides, function(slide, index){
        // console.log(slide, index)

        translateX = index%2 * 100;
        translateY = Math.floor(index/2) * 100;

        slide_position_array.push({
          translateX: translateX,
          translateY: translateY
        })


        transform = "translate(" + translateX + "%, " + translateY + "%)";
        console.log(transform);
        slide.style.webkitTransform = transform;

      });

    }

    function goToSlide(event) {
      var translateX,
        translateY,
        transform;
      // console.log(event.target);

      if(zoomed) {
        current_slide_index = (current_slide_index + 1 < slides.length) ? current_slide_index + 1 : 0;
      } else {
        zoomed = true;
        current_slide_index = [].indexOf.call(slides, event.target);
      }


      renderSlideshow();
    }

    function renderSlideshow() {
      console.log('current_slide_index', current_slide_index);

      var translateX = slide_position_array[current_slide_index].translateX * -1,
        translateY = slide_position_array[current_slide_index].translateY * -1,
        transform = "translate(" + translateX + "%, " + translateY +"%)";

      // console.log('index', index);



      stage_el.style.webkitTransform = transform;

    }

    return Slideshow;

  }
);

