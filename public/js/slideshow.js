"use strict";

define(
  [
    'modernizr'
  ],

  function() {

    var scrollTop,
      new_scrollTop,
      transform,
      scrollTopPosition,
      slideshow_el,
      stage_el,
      slides,
      current_slide_index = 0,
      slide_position_array = [],
      zoomed = false;

    function Slideshow(selector) {
      slideshow_el = document.querySelector(selector),
      stage_el = slideshow_el.querySelector('.stage'),
      slides = stage_el.children;

      // this.parallax();

      setStage();
      window.addEventListener('resize', setStage);

      slideshow_el.addEventListener('click', function(event) {

        console.log(event.target.classList[0]);

        switch (event.target.classList[0]) {
          case "slideshow":
          case "slide":
          case "home-button":
            zoomOut();
            break;
          case "slide-image":

            if(zoomed) {
              goToNext();
            } else {
              var slide_index = [].indexOf.call(slides, event.target.parentNode);
              goToSlide(slide_index);
            }



        }



      });
    }

    Slideshow.prototype.parallax = function() {

      new_scrollTop = (document.documentElement && document.documentElement.scrollTop || document.body && document.body.scrollTop || 0);

      if(new_scrollTop !== scrollTop) {

        scrollTop = Math.max(0, new_scrollTop),
        transform = 'translateY(' + (scrollTop/-1) + 'px) scale(.5)';

        stage_el.classList.remove('zoomed');
        zoomed = false;

      } else {



      }

      // requestAnimationFrame(this.parallax.bind(this));
    }

    function setStage() {
      var translateX,
        translateY,
        transform;

      console.log('test');
      stage_el.style.height = window.innerHeight + "px";

      slideshow_el.style.height = window.innerHeight*2.3333 + "px";


      [].forEach.call(slides, function(slide, index){

        translateX = index%3 * 100;
        translateY = Math.floor(index/3) * 100;

        slide_position_array.push({
          translateX: translateX,
          translateY: translateY
        })

        transform = "translate(" + translateX + "%, " + translateY + "%)";
        slide.style.webkitTransform = transform;

      });
    }

    function goToSlide(slide_index) {
      console.log('goToSlide');
      zoomed = true;

      current_slide_index = slide_index;

      renderSlideshow();
    }

    function goToNext() {
      console.log('goToNext');
      zoomed = true;
      current_slide_index = (current_slide_index + 1 < slides.length) ? current_slide_index + 1 : 0;
      renderSlideshow();
    }

    function zoomOut() {
      current_slide_index = 0;
      zoomed = false;
      renderSlideshow();
    }

    function renderSlideshow() {
      var translateX,
        translateY;

      if(zoomed === true) {

        stage_el.classList.add('zoomed');
        // zoomed = false;

        translateX = slide_position_array[current_slide_index].translateX * -1,
        translateY = slide_position_array[current_slide_index].translateY * -1;

        transform = "translate(" + translateX + "%, " + translateY +"%)";

      } else {
        stage_el.classList.remove('zoomed');

        transform = "scale(0.3333)";

      }

      stage_el.style.webkitTransform = transform;

    }

    return Slideshow;

  }
);

