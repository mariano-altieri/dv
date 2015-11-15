/*
* Dependencies
*/

'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    jade = require('gulp-jade'),

// Sources
    $client = 'client/',
    $src = $client + 'src/',
    $statics = $client + 'statics/',
    $scss = $src + 'sass/mdl.scss',
    $jade = $src + 'jade/mdl/*.jade',

// Destination
    $html = $statics + 'html/',
    $htmlMdl = $html + 'mdl/',
    //$css = $statics + 'styles/',

    // TODO: cambio parcial de estilos porque no funcionan las rutas relativas.
    $css = $htmlMdl,

    $dev = $html,

// Distribution
    $dist = 'build/';


// Notifications
var _gulpsrc = gulp.src;

gulp.src = function() {

    return _gulpsrc.apply(gulp, arguments)
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title:    'Gulp Error',
          message:  'Error: <%= error.message %>',
          sound:    'Bottle'
        })(err);
        this.emit('end');
      }
    }));
    this.emit('end');
};

// sass
gulp.task('sass', function() {

    return gulp.src($scss)
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(gulp.dest($css))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Tarea sass finalizada' }));
});

// Jade
gulp.task('jade', function() {

    return gulp.src($jade)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest($htmlMdl))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Tarea jade finalizada' }));
});

// Server
gulp.task('serve', ['sass','jade'], function() {
    browserSync.init({ server: $dev });
    gulp.watch($scss, ['sass']);
    gulp.watch($jade, ['jade']);
    gulp.watch($html + '*.html').on('change', browserSync.reload);
});

// Tasks
gulp.task('default', ['sass', 'serve']);
