'use strict';

var dest = './dist';
var src = './src';

module.exports = {
  styles: {
    src: src + '/styles/bench.scss',
    watchSrc: src + '/styles/**/*.scss',
    dest: dest + '/css/',
    settings: {
      errLogToConsole: true,
      imagePath: 'images'
    }
  },
  bootstrap: {
    src: src + '/index.html',
    dest: dest
  },
  serve: {
    source: dest
  },
  lint: {
    src: src + '/scripts/**/*.js',
  },
  scripts: {
    src: src + '/scripts/**/*.js',
    dest: dest + '/js/'
  },
  production: {
    css: {
      src: dest + '/css/bench.css',
      dest: dest + '/css/'
    },
    js: {
      src: dest + '/js/app.js',
      dest: dest + '/js/'
    }
  }
};
