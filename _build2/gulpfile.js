const gulp = require('gulp');
const sass = require('gulp-sass'); // On installing gulp-sass see: https://stackoverflow.com/questions/50338202/gulp-sass-error-when-installing
const Builder = require('./vectto_builder/Builder');
const ComponentModuleTransforms = require('./vectto_builder/ComponentModuleTransforms');
const fileMaps = require('./filemap.json');

// See: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/using-buffers.md
// See: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md
// See: https://github.com/saan1984/GulpLetterType/blob/master/index.js
// See: https://drewbarontini.com/articles/building-a-better-gulpfile/
// See: https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js#tasks-that-are-actually-useful
// See: https://stackoverflow.com/questions/22224831/after-installation-of-gulp-no-command-gulp-found
// See: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb


// LM: 2018-06-28
// Use to avoid "MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 finish listeners added. Use emitter.setMaxListeners() to increase limit" error.
// See: https://stackoverflow.com/questions/8313628/node-js-request-how-to-emitter-setmaxlisteners
require('events').EventEmitter.defaultMaxListeners = 15;

// SASS 
// See: http://ryanchristiani.com/getting-started-with-gulp-and-sass/
// See: https://goede.site/setting-up-gulp-4-for-automatic-sass-compilation-and-css-injection
gulp.task('compile-component-sass', function() { // Compiler for sass files for components 
    return (
        gulp.src('../js/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        // See: https://stackoverflow.com/questions/23247642/modify-file-in-place-same-dest-using-gulp-js-and-a-globbing-pattern
        .pipe(gulp.dest(function (file) {
            return file.base;
        }))
    );    
});

gulp.task('build', () => {
    // See: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color //
    console.log('\x1b[32m%s\x1b[0m', '================================================');
    console.log('\x1b[32m%s\x1b[0m \x1b[31m%s\x1b[0m', 'BUILD SCRIPT IS WATCHING...', '<\\3'); 
    console.log('\x1b[32m%s\x1b[0m', '================================================');
    let buildsArr = [];
    fileMaps.forEach((data) => {
        let build = new Builder(data);
        build.setBabelPresetPath([
            './vectto_builder/node_modules/@babel/preset-env'        
        ])
        .setBabelPluginPaths([
            './vectto_builder/node_modules/@babel/plugin-transform-async-to-generator'
        ]); 
        build.setCustomTransform((_code) => ComponentModuleTransforms(_code));
        build.compile();
        buildsArr.push(build);
        build.getAllDependencyFiles().forEach((file) => {
            let delay;
            // See: https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/
            //  See: https://stackoverflow.com/questions/25913359/how-to-restart-gulp-watch-when-git-branch-changes
            gulp.watch(file, { debounceDelay: 2000 }).on('all', (e) => {
                clearTimeout(delay);  
                delay = setTimeout(() => {
                    build.compile();
                }, 300);                
            });
        });
    });
    // See: https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4/
    gulp.watch('../js/**/*.js').on('all', (_event, _path) => {
        if (_event.toLowerCase() == 'added') {
            console.log('File ' + _path + ' was added. Re-compiling everything...');     
            buildsArr.forEach((b) => {
                b.compile();
            });
            console.log('Re-compile done!');
        }          
    });
    // See: https://stackoverflow.com/questions/25913359/how-to-restart-gulp-watch-when-git-branch-changes
    gulp.watch('../.git/HEAD').on('all', (e) => {
        console.log('\x1b[41m%s\x1b[0m', 'WARNING! Branch has changed. Please run "gulp build" again.');
        process.exit();            
    });
    // SASS compiler 
    gulp.watch('../js/**/*.scss', gulp.series('compile-component-sass')).on('change', (sassFile) => {
        console.log('SCSS compiled component file ' + sassFile);
    });
});