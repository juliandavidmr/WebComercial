const gulp = require('gulp');
const babel = require('gulp-babel');
const through = require('through2');

function logFileHelpers() {
    return through.obj((file, enc, cb) => {
        console.log(file.babel.usedHelpers);
        cb(null, file);
    });
}

gulp.task('default', () =>
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(logFileHelpers())
)
