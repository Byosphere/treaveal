// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './src'; // dossier de travail
var dossierCss = './public/css';

gulp.task('css', function () {
  return gulp.src(source + '/**/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.concat('style.css'))
    .pipe(gulp.dest(dossierCss));
});

gulp.task('minify', ['css'], function () {
  return gulp.src([dossierCss+'/style.css', dossierCss+'/normalize.css'])
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dossierCss))
    .pipe(plugins.livereload());
});
plugins.livereload.listen();

gulp.task('watch', function () {
    gulp.watch(source + '/**/*.scss', ['css', 'minify']);
});

gulp.task('build', ['css', 'minify']);
gulp.task('default', ['build', 'watch']);