const gulp = require('gulp');
const browserSync = require('browser-sync');
const { src_data, build_data } = require('../config/directories');

const data = function () {
  return gulp 
    .src(src_data)
    .pipe(gulp.dest(build_data))
    .pipe(browserSync.stream());
}

data.displayName = 'Build: data';

module.exports = data;
