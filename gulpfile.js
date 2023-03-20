const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dest/'));
});

gulp.task('img', () => {
    return gulp.src('src/img/*.png')
        .pipe(gulp.dest('dest/img/'));
});

gulp.task('style', () => {
    return gulp.src('src/style/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dest/style/'));
});

gulp.task('watch', () => {
    gulp.watch('src/style/*.scss', gulp.series('style'));
    gulp.watch('src/*.html', gulp.series('html'));
});

gulp.task('serve', () => {
    browserSync.init({
        server: './dest'
    });
    gulp.watch("dest/**/*.*").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('style', 'html', 'img'));

gulp.task('dev', gulp.series('default', gulp.parallel('watch', 'serve')));