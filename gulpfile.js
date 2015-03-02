// include gulp
var gulp = require('gulp'); 

// include plug-ins
var changed = require('gulp-changed');					//	
var imagemin = require('gulp-imagemin');				//	
var concat = require('gulp-concat');					//	
var stripDebug = require('gulp-strip-debug');			//	
var uglify = require('gulp-uglify');					//	
var minifyHTML = require('gulp-minify-html');			//	
var jshint = require('gulp-jshint');					//	
var sass = require('gulp-ruby-sass');				//////	
var autoprefixer = require('gulp-autoprefixer');		//	
var minifycss = require('gulp-minify-css');				//	
var rename = require('gulp-rename');					//	
var size = require('gulp-size');

var tasks = ['imagemin', 'scripts', 'styles', 'htmlpage', 'jshint'];

// gulp-clean
// gulp-size

// minify new images
gulp.task('imagemin', function() {
	var imgSrc = './src/imgs/*',
		imgDst = './build/imgs';
	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		// .pipe(size())
		.pipe(gulp.dest(imgDst));
});

// JS hint task
gulp.task('jshint', function() {
	gulp.src('./src/js/library.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {

	gulp.src([
			"./src/js/jquery.min.js",
			"./src/js/bootstrap.min.js",
			"./src/js/video.min.js",
			"./src/js/jquery.imagesloaded.min.js",
			"./src/js/bigvideo.min.js",
			"./src/js/library.js"
		])

		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(stripDebug())
		// .pipe(size())
		.pipe(gulp.dest('./build/js/'));
});

// SASS Compile & dump CSS auto-prefix and minify
gulp.task('styles', function() {
  return sass('./src/sass/main.sass', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    // .pipe(gulp.dest('./build/css/test.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    // .pipe(size())
    .pipe(gulp.dest('./build/css/'));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
	return true;
	var htmlSrc = './src/*.html',
			htmlDst = './build';
 
	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(minifyHTML())
		// .pipe(size())
		.pipe(gulp.dest(htmlDst));
});

// clean up 
gulp.task('clean-scripts', function () {
    gulp.src('build/css/*.css')
    gulp.src('build/js/*.js')
        .pipe(clean());
});

// default gulp task
gulp.task('default', tasks, function() {

});

// watch gulp task
gulp.task('watch', function() {
	var watch = tasks;
	gulp.watch('./src/imgs/*', watch);
	gulp.watch('./src/js/*.js', watch);
	gulp.watch('./src/*.html', watch);
	gulp.watch('./src/sass/*.sass', watch);
});