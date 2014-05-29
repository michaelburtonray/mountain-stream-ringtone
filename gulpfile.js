// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var stylus = require('gulp-stylus');
var rjs = require('gulp-requirejs');


var prefix = require('gulp-autoprefixer');

// Compile Our Stylus
gulp.task('stylus', function () {
  gulp.src('styl/main.styl')
    .pipe(stylus())
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('public/css'));
});

// Require r.js Task
gulp.task('rjs-compile', function() {
  rjs({
    baseUrl: 'js/main.js',
    out: 'main.min.js',
    shim: {
      // standard require.js shim options
    },
    // ... more require.js options
  })
    .pipe(gulp.dest('public/')); // pipe it to the output DIR
});


// Watch Files For Changes
gulp.task('watch', function() {
  // gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('styl/*.styl', ['stylus']);
});

// Default Task
// gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
gulp.task('default', ['stylus', 'watch']);

