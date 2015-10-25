'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['watchify'], function() {
  gulp.watch(config.styles.watchSrc, ['watch-styles']);
});
