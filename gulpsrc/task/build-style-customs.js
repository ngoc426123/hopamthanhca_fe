const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const { src_style_customs, build_style } = require('../config/directories');

const stylesCustoms = function () {
  return gulp
    .src(src_style_customs)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(build_style))
    .pipe(browserSync.stream());
}

stylesCustoms.displayName = 'Build: styles-custom';

module.exports = stylesCustoms