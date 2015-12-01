var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var addsrc = require('gulp-add-src');

var onError = function(err){
	console.log(err.toString());
	this.emit('end');
};

gulp.task('js', function(){
	return gulp.src([
			'public/js/jquery-1.11.3.min.js',
			'public/js/slider.min.js',
			'public/js/indexController.js'
		])
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(addsrc.append('src/*.js'))
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('css', function(){
	return gulp.src('css/reset.css')
		// .pipe(replace(/\.\.\/fonts\//g, 'fonts/'))
		.pipe(addsrc.append([
			'public/css/front.css',
			'public/css/slider.css',
			'public/css/fitz_concept.css'
		]))
		.pipe(concat('app.css'))
		.pipe(minifyCSS())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('public/css'));
});

gulp.task('default', ['css', 'js']);
