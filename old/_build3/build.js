const rollup = require('rollup');
const rimraf = require('rimraf');
const path = require('path');
const chalk = require('chalk'); // See: https://www.npmjs.com/package/chalk
const babelCore = require("@babel/core"); // See: https://babeljs.io/docs/usage/api/
const includePaths = require('rollup-plugin-includepaths');
const nodeResolve = require('rollup-plugin-node-resolve'); // See: https://github.com/rollup/rollup-plugin-node-resolve
const scss = require('rollup-plugin-scss'); // See: https://github.com/thgh/rollup-plugin-scss
const { terser } = require('rollup-plugin-terser'); // See: https://www.npmjs.com/package/rollup-plugin-uglify-es
const commonjs = require('rollup-plugin-commonjs');
const jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack#writepath-data-options
const simpleBuildPlugin = require('./my-plugins/simpleBuildPlugin');
const currentFileConstant = require('./my-plugins/current-file-constant');
const currentChecksumConstant = require('./my-plugins/current-checksum-constant');
const myJSX = require('./my-plugins/my-jsx');
const createSeparateTranspiledBundle = require('./my-plugins/create-separate-transpiled-bundle');
const onWriteBundleInfo = require('./my-plugins/on-write-bundle-info');
const makeIndexHTML = require('./my-plugins/rollup-make-index-html');
const indexHTMLTempalte = require('./my-plugins/index-html-template');

const OPTIONS = {
    inputFiles: [
        '../src/raffy.jsx'
    ],
    outputDir: '../dist/',
    basePaths: ['../src/']
};
rimraf.sync(OPTIONS.outputDir);

async function bundle(inputFile) {
    const inputOptions = {
        input:inputFile,
        // See: https://rollupjs.org/guide/en/#plugins-overview
        plugins:[
            nodeResolve(),            
            commonjs({
                include: OPTIONS.basePaths.map((bPath) => bPath + 'node_modules/**')
            }),
            // This is where you set you base paths
            // See: https://www.npmjs.com/package/rollup-plugin-includepaths
            includePaths({
                paths: OPTIONS.basePaths.map((bPath) => bPath)
            }),
            // See: https://github.com/thgh/rollup-plugin-scss 
            scss({
                output: (styles, styleNodes) => {
                    //console.log(styleNodes)
                    if (!! styles) {
                        let inputFilePath = (inputFile instanceof Array) ? inputFile[0] : inputFile,
                            name = (() => {
                                let filename = path.basename(inputFilePath),
                                    pieces = filename.split('.');
                                if (pieces.length === 1) { return filename; }
                                pieces.pop();
                                return pieces.join('.');
                            })(),
                            outputPath = OPTIONS.outputDir + `css/${ name }.css`;                    
                        jetpack.write(outputPath, styles);
                        console.log(chalk.hex('#D690E1')(`SASS BUILT: ${ outputPath }`));
                    }                
                }
            }),  
            simpleBuildPlugin(),         
            myJSX(babelCore, {
                piggyBack: (code, id) => {
                    code = currentFileConstant(code, OPTIONS.basePaths[0], id);
                    code = currentChecksumConstant(jetpack, code, id);
                    return code;
                }
            }),   
            createSeparateTranspiledBundle(babelCore, jetpack, chalk), 
            makeIndexHTML({
                chalk, jetpack,
                template: indexHTMLTempalte,
                outputFilePath: '../index.html'
            }),       
            terser({ mangle: false }),
            onWriteBundleInfo(chalk)
        ]
    };

    const outputOptions = {
        dir: OPTIONS.outputDir,
        sourcemap: true,
        // See: https://rollupjs.org/guide/en/#outputentryfilenames
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        // See: https://rollupjs.org/guide/en/#outputformat
        format: 'system' // See: https://github.com/rollup/rollup-starter-code-splitting
    };
    
    // Buid and Watch for Updates //
    const watchOptions = {
        ...inputOptions,
        output: [outputOptions],
        watch: {
            chokidar: true,
            exclude: OPTIONS.basePaths.map((bPath) => bPath + 'node_modules/**'),
            include: OPTIONS.basePaths.map((bPath) => bPath + '**')
        }
    };
    const watcher = rollup.watch(watchOptions);
    console.log(chalk.bgGreen('Watching for ' + inputFile + '...'));
    watcher.on('event', (e) => {
        if (e.code === 'ERROR') {
            console.log(chalk.bgRed('encountered an error while bundling...'));
            console.log(e);
        }  
        if (e.code === 'FATAL') {
            console.log(chalk.bgRed('encountered an unrecoverable error...'));
        }    
    });
}

// Bundle all files //
OPTIONS.inputFiles.forEach((file) => {
    bundle(file);
});





