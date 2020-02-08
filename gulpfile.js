const { src, dest, watch, parallel, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const del = require('del');
const browserSync = require('browser-sync');

function buildHTML() {
  let html = src('src/index.pug')
    .pipe(pug())
  if (process.env.NODE_ENV === 'prod') {
    html = html.pipe(htmlmin({ collapseWhitespace: true }));
  }
  return html
    .pipe(dest('docs'))
    .pipe(browserSync.reload({ stream: true }));
};

function buildCSS() {
  let css = src("src/assets/css/styles.sass")
    .pipe(sass({
      includePaths: ['node_modules'],
      onError: browserSync.notify,
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
  if (process.env.NODE_ENV === 'prod') {
    css = css.pipe(cleanCSS({ compatibility: 'ie11' }))
  }
  return css
    .pipe(dest("docs/assets/css"))
    .pipe(browserSync.reload({ stream: true }));
};

function buildJS() {
  let js = src('src/assets/js/*')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
  if (process.env.NODE_ENV === 'prod') {
    js = js.pipe(uglify())
  }
  return js
    .pipe(dest('docs/assets/js'))
    .pipe(browserSync.reload({ stream: true }));
};

function copyFonts() {
  del('docs/assets/fonts/*');
  return src('src/assets/fonts/*')
  .pipe(dest('docs/assets/fonts'))
  .pipe(browserSync.reload({ stream: true }));
};

browserSync({server: './docs'});
watch('src/**.pug', buildHTML);
watch('src/assets/css/*', series(buildCSS, buildHTML));
watch('src/assets/js/*', series(buildJS, buildHTML));
watch('src/assets/fonts/*', copyFonts);

exports.default = parallel(
  series(
    parallel(buildCSS, buildJS),
    buildHTML
  ),
  copyFonts
);