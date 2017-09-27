/**
 *  nsis-highlight.js
 *  https://github.com/idleberg/nsis-highlight.js
 *
 *  Copyright (c) 2017 Jan T. Sott
 *  Licensed under the MIT license.
 */

const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const less = require('gulp-less');
const lesshint = require('gulp-lesshint');
const path = require('path');
const watch = require('gulp-watch');

// Source Files
const lessFiles = [
  './src/build.less'
];

// Build Tasks
gulp.task('build:less', gulp.series( (done) => {
  gulp.src(lessFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('highlight.css'))
    .pipe(gulp.dest('./dist/'))

    done();
}));

gulp.task('build:less:min', gulp.series( (done) => {
  gulp.src(lessFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('highlight.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/'));

    done();
}));

// Lint Tasks
gulp.task('lint:less', gulp.series( (done) => {
  gulp.src(lessFiles)
    .pipe(lesshint())
    .pipe(lesshint.reporter());

    done();
}));

// Watch Tasks
gulp.task('watch:less', function() {
  gulp.watch(lessFiles, gulp.series('lint:less', 'build:less:min'));
});

// Available Tasks
gulp.task('build', gulp.parallel('build:less', 'build:less:min'));
gulp.task('lint', gulp.parallel('lint:less'));
gulp.task('watch', gulp.parallel('watch:less'));
