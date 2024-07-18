const gulp = require('gulp');
const browserSync = require('browser-sync');
const { src_fonts, build_fonts } = require('../config/directories');

const font = function () {
  return gulp 
    .src(src_fonts, { encoding: false })
    .pipe(gulp.dest(build_fonts))
    .pipe(browserSync.stream());
}

font.displayName = 'Build: fonts';

module.exports = font