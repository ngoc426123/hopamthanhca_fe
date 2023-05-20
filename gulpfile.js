// SET ENVIRONMENT
process.env.NODE_ENV = ~['build'].indexOf(process.argv[2]) ? 'production' : 'development';

const gulp = require('gulp');
const { parallel } = require('gulp');
const server = require('./gulpsrc/task/runner-server');
const watcher = require('./gulpsrc/task/runner-watcher');
const clean = require('./gulpsrc/task/runner-clean');
const buildAssets = require('./gulpsrc/task/build-assets');
const html = require('./gulpsrc/task/build-html');
const runServer = parallel(server, watcher);

// TASK
gulp.task('default', gulp.series(
  clean,
  buildAssets,
  runServer,
));
gulp.task('build', gulp.series(
  clean,
  html,
  buildAssets,
));