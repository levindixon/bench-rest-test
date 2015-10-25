'use strict';

var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var size = require('gulp-filesize');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var config = require('../config').production;

var minifyCss = function() {
  return gulp.src(config.css.src)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(plumber())
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(gulp.dest(config.css.dest))
    .pipe(size());
};

gulp.task('minify-css', ['build-styles'], minifyCss);
