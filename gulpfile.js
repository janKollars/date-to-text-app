const gulp = require('gulp');
const gutil = require('gulp-util');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const del = require('del');
const browserSync = require('browser-sync');

gulp.task('pug', function buildHTML() {
  return gulp.src('index.pug')
  .pipe(pug())
  .pipe(gutil.env.type === 'prod' ? htmlmin({collapseWhitespace: true}) : gutil.noop())
  .pipe(gulp.dest('docs'))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass', function() {
  return gulp.src("./assets/css/styles.sass")
    .pipe(sass({
      includePaths: ['css', 'node_modules'],
      onError: browserSync.notify,
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gutil.env.type === 'prod' ? cleanCSS({ compatibility: 'ie8' }) : gutil.noop())
    .pipe(gulp.dest("docs/assets/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
  return gulp.src('assets/js/*')
  .pipe(babel({
    presets: ['env'],
  }))
  .pipe(gutil.env.type === 'prod' ? uglify() : gutil.noop())
  .pipe(gulp.dest('docs/assets/js'))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts', function () {
  del('./docs/assets/fonts/*');
  return gulp.src('assets/fonts/*')
  .pipe(gulp.dest('docs/assets/fonts'))
  .pipe(browserSync.reload({ stream: true }));
})

gulp.task('default', ['pug', 'sass', 'js', 'fonts'], function () {
  browserSync({server: './docs'});

  gulp.watch('./**.pug', ['pug']);
  gulp.watch('./assets/css/*', ['sass']);
  gulp.watch('./assets/js/*', ['js']);
  gulp.watch('./assets/fonts/*', ['fonts']);
});
