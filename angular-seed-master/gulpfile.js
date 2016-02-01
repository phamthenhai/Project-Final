// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
 
gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(gulp.dest('.'))
});
 
gulp.task('styles', function() {
  gulp.src('/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});
 
gulp.task('automate', function() {
    gulp.watch(['*.scss', 'js/**/*.js'], ['scripts', 'styles']);
});
 
 
gulp.task('default', ['scripts', 'styles']);