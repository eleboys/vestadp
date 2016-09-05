'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function () {
    gulp.src(['src/js/VestaDatePicker.persian.js', 'src/js/VestaDatePicker.gregorian.js', 'src/js/VestaDatePicker.js'])
        .pipe(concat('VestaDatePicker.full.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));

    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('sass:watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});


gulp.task('build', ['sass', 'js']);