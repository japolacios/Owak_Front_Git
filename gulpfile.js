let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let htmlmin = require('gulp-htmlmin');
let cleanCSS = require('gulp-clean-css');

//gulp.task('default', gulp.series('sass:watch'));

gulp.task('sass', function () {
    return gulp.src('./public/static/sass/main.scss').pipe(sass().on('error', sass.logError)).pipe(autoprefixer()).pipe(cleanCSS()).pipe(gulp.dest('./public/static/css/'));
});
gulp.task('sass:watch', function () {
    gulp.watch('./public/static/sass/*.scss', gulp.series('sass'));
});

function watchMe() {
    gulp.watch('./public/static/sass/*.scss', gulp.series('sass'));
}

function defaultTask() {
    watchMe()
}

exports.default = defaultTask