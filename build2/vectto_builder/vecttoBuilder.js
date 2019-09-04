// See: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/using-buffers.md
// See: https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md
// See: https://github.com/saan1984/GulpLetterType/blob/master/index.js
// See: https://drewbarontini.com/articles/building-a-better-gulpfile/
// See: https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js#tasks-that-are-actually-useful
// See: https://stackoverflow.com/questions/22224831/after-installation-of-gulp-no-command-gulp-found
// See: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb


const through = require('through2');
const PluginError = require('plugin-error');
const gutil = require('gulp-util');

// consts
const PLUGIN_NAME = 'vectto-builder';

function vecttoBuilder() {
    // creating a stream through which each file will pass
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb();
            return;
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        let contents = new String(file.contents),
            outBuffer = new Buffer('OHOHOOOHOOOO ------ ' + contents.replace(/\s/ig, '')),
            // See: https://github.com/gulpjs/gulp-util#new-fileobj
            newFile = new gutil.File();
        console.log(file.path);    
        newFile.path = file.path;
        newFile.contents = outBuffer;
        // make sure the file goes through the next gulp plugin
        this.push(newFile);
        // tell the stream engine that we are done with this file
        //cb(null, newFile);
    });
}
module.exports = vecttoBuilder;