"use strict";

define(
  [
  ],

  function() {

    var scrollTop,
      transform,
      scrollTopPosition;

    function Layout() {
      console.log('layout');
    }

    Layout.prototype.parallax = function(event) {
      scrollTop = Math.max(0, scrollTop),
      scrollTop = Math.min(threshhold, scrollTop),
      transform = 'translateY(' + (scrollTop/-2) + 'px)';

      $header.get(0).style[Modernizr.prefixed('transform')] = transform;

      if(scrollTop > 0) {
        $header.addClass('white');
      } else {
        $header.removeClass('white');
      }

      // console.log(scrollTop, threshhold);
      if(scrollTop >= threshhold) {
        $header.addClass('pinned');
      } else {
        $header.removeClass('pinned');
      }
    }

    return Layout;

  }
);

