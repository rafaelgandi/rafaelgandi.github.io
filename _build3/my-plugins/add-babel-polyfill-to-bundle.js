// Needed to make async/await feature work. //
// See: https://babeljs.io/docs/en/babel-polyfill#usage-in-browser
const jetpack = require('../node_modules/fs-jetpack'); 
const babelPolyfillCode = jetpack.read(__dirname + '/polyfill.min.js');
module.exports = function () {
    let outDir = '';
    return {
        name: 'add-babel-polyfill-to-bundle',
        generateBundle: function (options) {
            outDir = options.dir;
        },
        writeBundle: function (bundle) {
            for (let f in bundle) {
                if (! bundle[f].isDynamicEntry) {
                    let path = outDir + bundle[f].fileName,
                        code = jetpack.read(path);
                    code = ';' + babelPolyfillCode + ';' + code;    
                    jetpack.write(path, code);
                }
            }
        }
    };
};