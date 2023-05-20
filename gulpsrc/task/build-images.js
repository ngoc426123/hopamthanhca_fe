const gulp = require('gulp');
const browserSync = require('browser-sync');
const { src_images, build_images } = require('../config/directories');

const images = function () {
  return gulp 
    .src(src_images)
    .pipe(gulp.dest(build_images))
    .pipe(browserSync.stream());
}

images.displayName = 'Build: images';

module.exports = images