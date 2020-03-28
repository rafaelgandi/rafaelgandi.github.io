const { echo, sizeAndTime } = require('./my-plugin-helpers');

module.exports = function (babelCore, jetpack, chalk) {
    let outDir = '';
    return {
        name: 'create-separate-transpiled-bundle',
        generateBundle: function (options) {
            outDir = options.dir;
        },
        writeBundle: function (bundle) {
            for (let f in bundle) {
                let path = outDir + bundle[f].fileName,
                    code = jetpack.read(path),
                    es5OutDir = outDir + 'es5/',
                    es5OutFilePath = es5OutDir + bundle[f].fileName;
                let babelOutput = babelCore.transform(code, { 
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        // Not using the babel-plugin-transform-runtime for many reasons. See: https://babeljs.io/docs/en/babel-plugin-transform-runtime
                        '@babel/plugin-transform-async-to-generator', 
                        '@babel/plugin-syntax-dynamic-import' 
                    ],
                    sourceMaps: true,
                    comments: false,
                    minified: true,
                    // See: https://stackoverflow.com/questions/34973442/how-to-stop-babel-from-transpiling-this-to-undefined-and-inserting-use-str
                    sourceType: 'script' 
                });
                // NOTE: babel polyfill.min.js needs to be included externally for async/await to work.
                // See: https://babeljs.io/docs/en/babel-polyfill#usage-in-browser   
                code = ';' + babelOutput.code;
                // Generate a separate bundle for transpiled es5 bundles //
                jetpack.writeAsync(es5OutFilePath, code).then(() => {
                    //echo(chalk, '#F7C14D', `BABEL ${ babelCore.version } BUILT: ` + es5OutFilePath + sizeAndTime(es5OutFilePath));     
                });                               
            }
        }
    };
};