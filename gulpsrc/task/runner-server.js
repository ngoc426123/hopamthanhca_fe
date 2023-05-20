const nodemon = require('nodemon');
const browserSync = require('browser-sync');
const { DEV_PORT, STATIC_PORT, UI_PORT } = require('../config/port');
const script = './express/index.js';
const watch = false;

const server = function () {
  nodemon({
    script,
    watch
  }).on('start', () => {
    setTimeout(() => {
      browserSync.init({
        port: DEV_PORT,
        proxy: `http://localhost:${STATIC_PORT}`,
        ui: {
          port: UI_PORT
        },
      });
    }, 1500);
  });
}

server.displayName = 'Runner: server'

module.exports = server; 