'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config').lint;

var lint = function() {
  return gulp.src(config.src)
    .pipe(eslint())
    .pipe(eslint.format());
};

gulp.task('lint', lint);
