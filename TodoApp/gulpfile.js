// Include gulp
var gulp = require('gulp'),
	gutil = require('gulp-util');

// Include Our Plugins
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');


var	input  = {
      'javascript': './app/js/**/*',
      'stylesheets': './app/css/**/*.scss',
      'bower_components': './app/bower_components/**',
      'html_files': './app/**/*.html',
      'image_files': './app/img/**/*',
      'audio_files': './app/audio/**/*'
    },

    output = {
      'javascript': './dist/js/',
      'stylesheets': './dist/css/',
      'bower_components': 'dist/bower_components',
      'html_files': 'dist/',
      'image_files': 'dist/img/',
      'audio_files': 'dist/audio/'
    };
 
 //Minify javascripts
gulp.task('scripts', function() {
  gulp.src(input.javascript)
  	//only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(gulp.dest(output.javascript))
});
 
 //Compile scss
gulp.task('styles', function() {
  gulp.src(input.stylesheets)
    .pipe(sass())
    .pipe(gulp.dest(output.stylesheets));
});

// Copy bower components
gulp.task('copy-bower-components', function () {
  gulp.src(input.bower_components)
    .pipe(gulp.dest(output.bower_components));
});
 
// Copy html files
gulp.task('copy-html-files', function () {
  gulp.src(input.html_files)
    .pipe(gulp.dest(output.html_files));
});
// Copy html files
gulp.task('copy-audio-files', function () {
  gulp.src(input.audio_files)
    .pipe(gulp.dest(output.audio_files));
});
// Copy images
gulp.task('copy-images', function () {
  gulp.src(input.image_files)
    .pipe(gulp.dest(output.image_files));
});
// Connect dist to port
gulp.task('connectDist', function () {
  connect.server({
    root: output.html_files,
    port: 8888
  });
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', function() {
  gulp.watch(input.javascript, function() {
      console.log("javascript changed");
      gulp.start('scripts');
  });

  gulp.watch(input.stylesheets, ['styles']);
  gulp.watch(input.html_files, ['copy-html-files']);
  gulp.watch(input.image_files, function() {
      console.log("images changed");
      gulp.start('copy-images');
  });
});
 

// Default task, build and watch for changes
gulp.task('default', ['styles', 'scripts', 'copy-html-files', 'copy-audio-files','copy-bower-components', 'copy-images', 'connectDist', 'watch']);