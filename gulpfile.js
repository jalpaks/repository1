// Required dependencies
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	
	concat = require('gulp-concat'),
	gzip = require('gulp-gzip'),
	sass = require('gulp-sass'),
	notify = require('gulp-notify'),
	cssbeautify = require('gulp-cssbeautify'),
	cleanCss = require('gulp-clean-css');

// JS gzip extension
var jgzconfig = {
	extension: 'jgz'
};

// CSS gzip extension
var csgzconfig = {
	extension: 'csgz'
};

// Where files are located
var paths = {
	
	css: [
		'app/css/*.css'
	],
	scss: [
		'app/scss/*.scss'
	],
	
	watchScss: [
		'app/scss/*.scss'
	]
};



// Compile SCSS
gulp.task('scss',function(){
	gulp.src(paths.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('yatin.css'))
		.pipe(cssbeautify())
		.pipe(gulp.dest('app/css'))
		
		.pipe(concat('yatin'))
		.pipe(gzip(csgzconfig))
		.pipe(gulp.dest('app/css'))
		.pipe(notify({
			message: "SCSS processed"
		}));
	
});




// This runs on 'gulp' in terminal/command line
gulp.task('default', function(){
	
	gulp.run('scss');
	
});


// this runs when fules change in the SCSS path
gulp.watch(paths.watchScss, function () {
    gulp.run('scss');
});

