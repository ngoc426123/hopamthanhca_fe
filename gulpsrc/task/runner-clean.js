const del = require('del');
const { build } = require('../config/directories');

const clean = function () {
  return del(build);
}

clean.displayName = 'Runner: clean';

module.exports = clean
