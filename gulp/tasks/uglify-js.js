'use strict';

var gulp = require('gulp');
var size = require('gulp-filesize');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var config = require('../config').production;

var uglifyJs = function() {
  return gulp.src(config.js.src)
    .pipe(plumber())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest))
    .pipe(size());
  };

gulp.task('uglify-js', ['browserify'], uglifyJs);
