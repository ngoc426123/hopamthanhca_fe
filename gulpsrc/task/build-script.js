const gulp = require('gulp');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const optionWebpack = require('../config/webpack');
const { src_script, build_script } = require('../config/directories');

const scripts = function () {
  return gulp
    .src(src_script)
    .pipe(webpack(optionWebpack))
    .pipe(uglify({
      mangle: {
        keep_fnames: true
      }
    }))
    .pipe(gulp.dest(build_script))
    .pipe(browserSync.stream());
}

scripts.displayName = 'Build: scripts';

module.exports = scripts;