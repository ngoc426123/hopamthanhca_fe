const browserSync = require('browser-sync');

const reload = function (cb) {
  browserSync.reload();
  cb();
}

reload.displayName = 'Reload...'

module.exports = reload