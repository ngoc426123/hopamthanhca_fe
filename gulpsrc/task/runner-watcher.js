const gulp = require('gulp');
const reload = require('./reload');
const style = require(`./build-style.js`);
const styleCustoms = require(`./build-style-customs`);
const script = require(`./build-script.js`);
const scriptCustoms = require(`./build-script-customs`);
const data = require(`./build-data.js`);

const watcher = function () {
  gulp.watch('src/scss/**/*', gulp.series(style));
  gulp.watch('src/scss/app.scss', gulp.series(style));
  gulp.watch('src/scss/customs.scss', gulp.series(styleCustoms));
  gulp.watch('src/js/**/*', gulp.series(script));
  gulp.watch('src/js/all.js', gulp.series(script));
  gulp.watch('src/js/customs.js', gulp.series(scriptCustoms));
  gulp.watch('src/data/*', gulp.series(data));
  gulp.watch('src/html/*', reload);
  gulp.watch('src/html/**/*', reload);
}

watcher.displayName = 'Runner: watcher';

module.exports = watcher;