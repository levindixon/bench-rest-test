'use strict';

var gulp = require('gulp');
var serve = require('gulp-serve');
var config = require('../config').serve;

gulp.task('serve', serve(config.source));
