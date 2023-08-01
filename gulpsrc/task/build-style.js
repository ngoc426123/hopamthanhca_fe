const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const bulkSass = require('gulp-sass-bulk-import');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const { src_style, build_style } = require('../config/directories');
const { style_name } = require('../config/names');

const styles = function () {
  return gulp
    .src(src_style)
    .pipe(bulkSass())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename(style_name))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(build_style))
    .pipe(browserSync.stream());
}

styles.displayName = 'Build: styles';

module.exports = styles