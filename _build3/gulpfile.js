const gulp = require('gulp');
const sass = require('gulp-sass'); // On installing gulp-sass see: https://stackoverflow.com/questions/50338202/gulp-sass-error-when-installing
const sourcemaps = require('gulp-sourcemaps');
const reactFilesShortcut = require('./react-files-shortcut');
// LM: 2018-06-28
// Use to avoid "MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 finish listeners added. Use emitter.setMaxListeners() to increase limit" error.
// See: https://stackoverflow.com/questions/8313628/node-js-request-how-to-emitter-setmaxlisteners
require('events').EventEmitter.defaultMaxListeners = 15;
// SASS 
// See: http://ryanchristiani.com/getting-started-with-gulp-and-sass/
// See: https://goede.site/setting-up-gulp-4-for-automatic-sass-compilation-and-css-injection
gulp.task('compile-sass', function() { // Compiler for sass files for components 
    return (
        gulp.src('../src/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'compressed',
                includePaths: ['../src']
            }))
            .pipe(sourcemaps.write('.'))
            .on('error', sass.logError)
            // See: https://stackoverflow.com/questions/23247642/modify-file-in-place-same-dest-using-gulp-js-and-a-globbing-pattern
            .pipe(gulp.dest(function (file) {
                return file.base;
            }))
    );    
});

gulp.task('build-sass', () => {    
    console.log('Gulp builder 3 SASS is running...');
    console.log(require('node-sass').info);
    // SASS compiler 
    gulp.watch('../src/**/*.scss', gulp.series('compile-sass')).on('change', (sassFile) => {
        console.log('SCSS compiled file ' + sassFile);
    });
    // React shorcut files maker watcher
    gulp.watch('../src/**/*.react').on('add', (reactShortcutFile) => {
        reactFilesShortcut(reactShortcutFile);
    });
});



