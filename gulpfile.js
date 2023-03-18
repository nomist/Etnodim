const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function styleTask() {
    return src('src/style/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(dest('dest/style/'));
}

exports.style = styleTask