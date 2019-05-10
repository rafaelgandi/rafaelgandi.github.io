const gulp = require('gulp');
const Builder = require('./vectto_builder/Builder');
const ComponentModuleTransforms = require('./vectto_builder/ComponentModuleTransforms');
const fileMaps = require('./filemap.json');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg')

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
            //  See: https://stackoverflow.com/questions/25913359/how-to-restart-gulp-watch-when-git-branch-changes
            gulp.watch(file, { debounceDelay: 2000 }, (e) => {
                clearTimeout(delay);  
                delay = setTimeout(() => {
                    build.compile();
                }, 300);                
            });
        });
    });
    gulp.watch('../js/**/*.js', (event) => {
        if (event.type.toLowerCase() == 'added') {
            console.log('File ' + event.path + ' was added. Re-compiling everything...');     
            buildsArr.forEach((b) => {
                b.compile();
            });
            console.log('Re-compile done!');
        }          
    });
    // See: https://stackoverflow.com/questions/25913359/how-to-restart-gulp-watch-when-git-branch-changes
    gulp.watch('../.git/HEAD', (e) => {
        console.log('\x1b[41m%s\x1b[0m', 'WARNING! Branch has changed. Please run "gulp build" again.');
        process.exit();            
    });
    // Compress images with Imagemin 
    // See: https://web.dev/fast/use-imagemin-to-compress-images 
    // See: https://web.dev/fast/use-imagemin-to-compress-images/codelab-imagemin-gulp
    /** /
    gulp.src('../images/proj/*')
    .pipe(imagemin([
        mozjpeg({quality: 50})
    ]))
    .pipe(gulp.dest('../images/proj/'));
    // PNG
    gulp.src('../images/weapons/*')
    .pipe(imagemin([
      pngquant({ quality: [0.5, 0.5] })
    ]))
    .pipe(gulp.dest('../images/weapons/'));
    /**/

});