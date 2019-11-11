
module.exports = function (babelCore, jetpack) {
    const babelPolyfillCode = jetpack.read(__dirname + '/polyfill.min.js');
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
                    es5OutDir = outDir + 'es5/';
                let babelOutput = babelCore.transform(code, { 
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        // Not using the babel-plugin-transform-runtime for many reasons. See: https://babeljs.io/docs/en/babel-plugin-transform-runtime
                        '@babel/plugin-transform-async-to-generator' 
                    ],
                    sourceMaps: true,
                    comments: false,
                    minified: true,
                    // See: https://stackoverflow.com/questions/34973442/how-to-stop-babel-from-transpiling-this-to-undefined-and-inserting-use-str
                    sourceType: 'script' 
                });
                if (! bundle[f].isDynamicEntry) {
                    // Needed to make async/await feature work. //
                    // See: https://babeljs.io/docs/en/babel-polyfill#usage-in-browser    
                    code = ';' + babelPolyfillCode + ';' + babelOutput.code;    
                }    
                else {
                    code = ';' + babelOutput.code;  
                }
                // Generate a separate bundle for transpiled es5 bundles //
                jetpack.write(es5OutDir + bundle[f].fileName, code);                
            }
        }
    };
};