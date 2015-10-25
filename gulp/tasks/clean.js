'use strict';

var gulp = require('gulp');
var del = require('del');

gulp.task('clean-prod', ['uglify-js', 'minify-css'], function(callback) {
  del([
    'dist/css/bench.css',
    'dist/js/app.js'
  ], callback);
});
