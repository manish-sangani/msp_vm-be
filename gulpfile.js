var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['./*.js', 'server/**/*.js'];

gulp.task('process-scripts', function () {
    return gulp.src(jsFiles)
        .pipe(uglify())
        .pipe(gulp.dest('dist/app'));
});

//watch task
gulp.task('default', ['process-scripts'], function () {
    var options = {
        script: 'bin/www',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', function () {
            console.log('Restarting.....');
        });

});
