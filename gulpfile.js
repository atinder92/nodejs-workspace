var gulp        = require('gulp');
var jscs        = require('gulp-jscs');
var jshint      = require('gulp-jshint');
var nodemon     = require('gulp-nodemon');

var jsFiles = ['app.js','public/js/**/*.js','src/**/*.js'];


gulp.task('style',function(){

    return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish',{verbose:true}))
    .pipe(jscs());

});

gulp.task('inject',function(){

    var wiredep = require('wiredep').stream;
    var inject  = require('gulp-inject');

    //wiredep configuration

    var options = {
        bowerJson : require('./bower.json'),
        directory : './public/lib',
        ignorePath: '../../public'
    }
    //gulp-inject configuration

    var injectSrcFiles = gulp.src(['./public/css/*.css','./public/js/*.js'],{read:false});
    var gulpInjectOptions = {
        ignorePath : '/public'
    };



    return gulp.src('./src/views/*.html')
           .pipe(wiredep(options))
           .pipe(inject(injectSrcFiles,gulpInjectOptions))
           .pipe(gulp.dest('./src/views/'));


});

//gulp task for nodemon 

gulp.task('serve',['style','inject'],function(){

    var nodemonOptions = {
        script : 'app.js',
        delayTime : 1,
        env : {
            'PORT':8083
        },
        watch : jsFiles
    }


    return nodemon(nodemonOptions).on('restart',function(){
        console.log('** rest')
    })


});
