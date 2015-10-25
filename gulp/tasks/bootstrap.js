'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('../config');

var bootstrap = function() {
  var cacheBust = new Date().getTime();

  var target = gulp.src(config.bootstrap.src);
  var sources = gulp.src(
    [config.styles.dest + '*.css', config.scripts.dest + '*.js'],
    {read: false}
  );

  var transform = function (filepath) {
    if (filepath.slice(-3) === '.js') {
      return '<script src="' + filepath.substr(5) + '?' + cacheBust + '"></script>';
    }
    if (filepath.slice(-4) === '.css') {
      return '<link rel="stylesheet" href="' + filepath.substr(5) + '?' + cacheBust + '">';
    }
  };

  return target.pipe(inject(sources, {transform: transform}))
    .pipe(gulp.dest(config.bootstrap.dest));
};

gulp.task('bootstrap', ['build-styles', 'watch'], bootstrap);
gulp.task('bootstrap-prod', ['clean-prod'], bootstrap);
