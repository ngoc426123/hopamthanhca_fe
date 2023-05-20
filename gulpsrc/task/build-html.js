const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const { src_html, build_html } = require('../config/directories');

const html = function () {
  return gulp
    .src(src_html)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(build_html))
    .pipe(browserSync.stream());
}

html.displayName = 'Build: html';

module.exports = html