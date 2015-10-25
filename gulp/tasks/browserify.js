'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var handleErrors = require('../util/handleErrors');

var bundler;

var initBrowserfy = function() {
  return browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: ['.js', '.jsx'],
    debug: true,
    paths: ['./src/scripts/']
  });
};

var rebundle = function() {
  return bundler.bundle()
    .on('error', handleErrors)
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(notify({
      onLast: true,
      message: 'Browserfied!'
    }));
};

var browserifyTask = function() {
  var b = initBrowserfy();
  bundler = b;

  bundler.transform(babelify);
  bundler.add('./src/scripts/main.jsx');

  return rebundle();
};

var watchifyTask = function() {
  var b = initBrowserfy();
  bundler = watchify(b);

  bundler.on('update', rebundle);
  bundler.transform(babelify);
  bundler.add('./src/scripts/main.jsx');

  return rebundle();
};

gulp.task('browserify', browserifyTask);
gulp.task('watchify', watchifyTask);
