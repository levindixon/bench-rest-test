'use strict';

var gulp = require('gulp');

gulp.task('build:prod', ['bootstrap-prod'], function(callback) {
  callback();

  process.nextTick(function () {
    process.exit(0);
  });
});
