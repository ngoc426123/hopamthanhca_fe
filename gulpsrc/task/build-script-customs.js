const gulp = require('gulp');
const browserSync = require('browser-sync');
const { src_script_customs, build_script } = require('../config/directories');

const scriptsCustoms = function () {
  return gulp
    .src(src_script_customs)
    .pipe(gulp.dest(build_script))
    .pipe(browserSync.stream());
}

scriptsCustoms.displayName = 'Build: scripts-customs';

module.exports = scriptsCustoms;