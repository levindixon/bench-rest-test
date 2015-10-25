'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config = require('../config').styles;
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

var styles = function() {
	livereload.listen();

	return gulp.src(config.src)
		.pipe(changed(config.dest))
		.pipe(sourcemaps.init())
		.pipe(sass(config.settings))
		.on('error', handleErrors)
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ['last 2 version']
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(livereload())
		.pipe(notify({
			onLast: true,
			message: 'Styles ready!'
		}));
};

gulp.task('build-styles', styles);
gulp.task('watch-styles', styles);
