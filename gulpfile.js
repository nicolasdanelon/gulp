var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var stripDebug = require('gulp-strip-debug');

gulp.task('sass', function() {
	gulp.src('./app/sass/**/*.+(scss|sass)')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('scripts', function() {
	gulp.src([
			'./bower_components/jquery/dist/jquery.min.js',
			'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
			'./bower_components/circles/circles.min.js',
			'./app/js/jquery.placeholder.min.js'
		])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(uglify())
		.pipe(concat('libs.js'))
		.pipe(stripDebug())
		.pipe(gulp.dest('./app/js'));
});

gulp.task('jshint', function() {
	gulp.src('app/js/*Controller.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('watch', ['scripts', 'browserSync', 'sass'], function() {
	gulp.watch('app/js/*Controller.js', ['jshint', 'scripts'], browserSync.reload);
	gulp.watch('app/sass/**/*.+(scss|sass)', ['sass'], browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});
