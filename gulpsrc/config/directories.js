// ENVIRONMENT
const isProduct = process.env.NODE_ENV === 'production';

// DIRECTORIES PATH
const srcPath = './src';
const staticPath = 'static';
const distPath = 'build';

// DIRECTORIES SOURCE
const src_html = '/html/*.pug';
const src_style = '/scss/app.scss';
const src_style_customs = '/scss/customs.scss';
const src_script = '/js/all.js';
const src_script_customs = '/js/customs.js';
const src_data = '/data/*';
const src_images = '/images/**';
const src_fonts = ['node_modules/@fortawesome/fontawesome-free/webfonts/*', `${srcPath}/fonts/**`];

// DIRECTORIES BUILD
const build = isProduct ? distPath : staticPath;
const build_html = '';
const build_style = '/css';
const build_script = '/js';
const build_data = '/data';
const build_images = '/images';
const build_fonts = '/fonts';

// MODULE EXPORT
exports.src = srcPath;
exports.src_html = srcPath + src_html;
exports.src_style = srcPath + src_style;
exports.src_style_customs = srcPath + src_style_customs;
exports.src_script = srcPath + src_script;
exports.src_script_customs = srcPath + src_script_customs;
exports.src_data = srcPath + src_data;
exports.src_images = srcPath + src_images;
exports.src_fonts = src_fonts;

exports.build = build;
exports.build_html = build + build_html;
exports.build_style = build + build_style;
exports.build_script = build + build_script;
exports.build_data = build + build_data;
exports.build_images = build + build_images;
exports.build_fonts = build + build_fonts;

exports.staticPath = staticPath;