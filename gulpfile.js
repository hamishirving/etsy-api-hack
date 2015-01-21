// --------------------------------------------
// Dependencies
// --------------------------------------------

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush');

// --------------------------------------------
// Default Tasks (Can be run standalone)
// --------------------------------------------

// Compiles all Scss files
gulp.task('styles', function(){
    gulp.src('scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({ 
            style: 'compressed' 
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('build/css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'))
        .pipe(livereload());
});

// Compress images task
gulp.task('images', function () {
    gulp.src('img/*')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('build/img'))
        .pipe(notify("Completed Gulping your Images!"))
        .pipe(livereload());
});

//Concatnate and Compressn Vendor .js Task
gulp.task('vendors', function() {  
    gulp.src(
        [
            'src/scripts/vendors/jquery.min.js',
            'src/scripts/vendors/*.js'
        ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'))
        .pipe(livereload());
});

// Concatenate & minify js files
gulp.task('scripts', function() {
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(livereload());
});

// Duplicate to the build and reload browser
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(plumber())
        .pipe(gulp.dest('build/'))
        .pipe(livereload());
});

// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------

// Watches all files and reacts
gulp.task('watch', function(){
    var server = livereload();
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('*.html', ['html']);
});

// Default Task (Run 'gulp')
gulp.task('default',['html', 'styles', 'images', 'vendors', 'scripts', 'watch']);