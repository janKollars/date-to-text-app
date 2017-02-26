var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['pug', 'sass', 'js'], function() {

  browserSync.init({
    server: "./docs"
  });
  gulp.watch("index.pug", ['pug']);
  gulp.watch("assets/css/*", ['sass']);
  gulp.watch("assets/js/*", ['js']);
  gulp.watch("docs/**").on('change', browserSync.reload);
});

gulp.task('pug', function buildHTML() {
  return gulp.src('index.pug')
  .pipe(pug())
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('docs'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("./assets/css/styles.sass")
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest("docs/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('assets/js/*')
  .pipe(uglify())
  .pipe(gulp.dest('docs/assets/js'));
});

gulp.task('default', ['serve']);
