const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dest/'));
});

gulp.task('img', () => {
    return gulp.src('src/img/**/*.{png,jpg,svg}')
        .pipe(gulp.dest('dest/img/'));
});

gulp.task('style', () => {
    const plugins = [
        require('postcss-import')(),
        require('postcss-nested')(),
        require('autoprefixer')(),
        require('cssnano')()
    ];
    return gulp.src('src/style/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dest/style/'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
      .pipe(gulp.dest('dest/fonts/'));
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

gulp.task('default', gulp.parallel('style', 'html', 'img', 'fonts'));

gulp.task('dev', gulp.series('default', gulp.parallel('watch', 'serve')));