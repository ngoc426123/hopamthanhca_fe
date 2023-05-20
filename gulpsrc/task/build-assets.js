const { series } = require('gulp');
const styles = require('./build-style');
const stylesCustoms = require('./build-style-customs');
const scripts = require('./build-script');
const scriptsCustoms = require('./build-script-customs');
const data = require('./build-data');
const fonts = require('./build-fonts');
const images = require('./build-images');

const buildAssets = series(
  styles,
  stylesCustoms,
  scripts,
  scriptsCustoms,
  data,
  fonts,
  images
);

module.exports = buildAssets;