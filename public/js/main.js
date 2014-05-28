
"use strict";

requirejs.config({
  baseUrl: '/js',
  paths: {
    // 'jquery': 'jquery-2.0.3'
    // 'jquery': 'jquery-1.10.2'
  },
  waitSeconds: 200
});

require(
  [
    'layout',
    'slideshow'
  ],

  function(Layout, Slideshow) {

    var layout = new Layout();

    var slideshow = new Slideshow('section#slideshow');

  }
);
