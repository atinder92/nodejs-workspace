var gulp        = require('gulp');
var jscs        = require('gulp-jscs');
var jshint      = require('gulp-jshint');
var jsFiles = ['public/js/**/*.js'];


gulp.task('style',function(){

    return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish',{verbose:true}))
    .pipe(jscs());

});

gulp.task('wiredep-task',function(){

    var wiredep = require('wiredep').stream;
    //wiredep configuration

    var options = {
        bowerJson : require('./bower.json'),
        directory : './public/lib',
        ignorePath: '../../public'
    }

    return gulp.src('./src/views/*.html')
           .pipe(wiredep(options))
           .pipe(gulp.dest('./src/views/'));


});