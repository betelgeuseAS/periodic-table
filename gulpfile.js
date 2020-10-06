let gulp = require('gulp'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		sourcemaps = require('gulp-sourcemaps'),
		cleancss = require('gulp-clean-css'),
		rename = require('gulp-rename'),
		autoprefixer = require('gulp-autoprefixer'),
		notify = require('gulp-notify'),
		rsync = require('gulp-rsync'),
		browserify = require('browserify'),
		babelify = require('babelify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function(done) {
	['common.js'].map(function (entry) {
		return browserify({
			entries: ['app/js/' + entry]
		})
		.transform(babelify, {presets: ['@babel/preset-env']})
		.bundle()
		.pipe(source(entry))
		.pipe(rename({extname: '.min.js'}))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify()) // Minify js (opt.)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('app/js/'))
		.pipe(browserSync.reload({ stream: true }))

		// .pipe(concat('scripts.min.js'))
	});

	done();
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/modules/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'))
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
