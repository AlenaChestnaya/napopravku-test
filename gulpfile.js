var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var server = require('browser-sync').create();
var reload = server.reload;
var plumber = require('gulp-plumber');

var cssnext = require('postcss-cssnext');

var mq = require('gulp-combine-mq');

var vars = require('postcss-simple-vars');

var del = require('del');

var pathConfig = {
    srcPath: 'src',
    outPath: 'public'
};

var params ={
    srcPath: pathConfig.srcPath,
    outPath: pathConfig.outPath,

    srcCss: pathConfig.srcPath+'/scss',
    srcJs: pathConfig.srcPath+'/js',
    srcImg: pathConfig.srcPath+'/img',
    srcFont: pathConfig.srcPath+'/fonts',

    outCss: pathConfig.outPath+'/css',
    outJs: pathConfig.outPath+'/js',
    outImg: pathConfig.outPath+'/img',
    outFont: pathConfig.outPath+'/fonts'
};

gulp.task('css', function () {
    var processors = [
        cssnext ({ // scss next
            browsers: ['last 2 versions', 'Chrome >= 42', 'Firefox >= 38', 'iOS >= 7', 'Android >= 4']
        })
    ];

    return gulp.src('./src/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(mq({
            beautify: false
        }))
        .pipe(reload({stream:true}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('server', function() {
    server.init({
        server: params.outPath
    });

    gulp.watch(params.srcPath+'/**/*.html', ['html'])
        .on("change", reload);
    gulp.watch(params.srcJs+'/**/*.js', ['js']);
    gulp.watch(params.srcCss+'/**/*.scss', ['css'] );
    gulp.watch(params.srcImg+'/*', ['img']);
});

gulp.task('html', function () {
    gulp.src([params.srcPath+'/**/*.html'])
        .pipe(gulp.dest( params.outPath ))
        .pipe(server.stream());
});

gulp.task('js', function () {
    gulp.src([params.srcJs+'/**/*.js'])
        .pipe(gulp.dest( params.outJs ))
        .pipe(server.stream());
});
gulp.task('img', function () {
    gulp.src(
        [
            params.srcImg+'/**/*.jpg',
            params.srcImg+'/**/*.png',
            params.srcImg+'/**/*.svg',
            params.srcImg+'/**/*.gif'
        ])
        .pipe(gulp.dest( params.outImg ))
        .pipe(server.stream());
});

gulp.task('fonts', function () {
    gulp.src(
        [
            params.srcFont+'/**/*.svg',
            params.srcFont+'/**/*.otf',
            params.srcFont+'/**/*.eot',
            params.srcFont+'/**/*.ttf',
            params.srcFont+'/**/*.woff',
            params.srcFont+'/**/*.woff2'
        ])
        .pipe(gulp.dest( params.outFont ));
});

gulp.task('clean', function() {
    return del('public');
  });

gulp.task('default', ['css', 'server'], function () {
    gulp.watch("scss/*.scss", ['css']);
});

gulp.task('buildDev', ['html', 'js', 'img', 'fonts', 'css']);
gulp.task('dev', ['clean', 'default','server', 'buildDev']);