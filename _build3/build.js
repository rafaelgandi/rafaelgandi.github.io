const rollup = require('rollup');
const rimraf = require('rimraf');
const chalk = require('chalk'); // See: https://www.npmjs.com/package/chalk
const babel = require('rollup-plugin-babel');
const includePaths = require('rollup-plugin-includepaths');
const nodeResolve = require('rollup-plugin-node-resolve'); // See: https://github.com/rollup/rollup-plugin-node-resolve
const scss = require('rollup-plugin-scss'); // See: https://github.com/thgh/rollup-plugin-scss
const { uglify } = require('rollup-plugin-uglify'); // See: https://github.com/TrySound/rollup-plugin-uglify
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const fs = require('fs');
const jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack#writepath-data-options
const simpleBuildPlugin = require('./my-plugins/simpleBuildPlugin');
const getCurrentFile = require('./my-plugins/get-current-file');
const addBabelPolyfillToBundle = require('./my-plugins/add-babel-polyfill-to-bundle');


const asyncAwait = require('rollup-plugin-async');

const OPTIONS = {
    inputFiles: [
        '../testb/src/index.js',
        '../testb/src/index2.js'
    ],
    outputDir: '../testb/dest/',
    basePaths: ['../testb/src/']
};
rimraf.sync(OPTIONS.outputDir);

function _getTime() {
    const date = new Date();
    return `[${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }]`;
}

function _getFileSize(file) {
    let bytes = fs.statSync(file).size;
    return `[${ Math.ceil(bytes/1024) }kb]`;
}

async function bundle(inputFile) {
    const inputOptions = {
        input:inputFile,
        // See: https://rollupjs.org/guide/en/#plugins-overview
        plugins:[
            nodeResolve(),
            babel({
                presets: [
                    ['@babel/preset-env', {
                        //"useBuiltIns": "usage"
                    }]
                ],
                plugins: [
                    '@babel/plugin-transform-async-to-generator', // Not using the babel-plugin-transform-runtime for many reasons. See: https://babeljs.io/docs/en/babel-plugin-transform-runtime
                    '@babel/plugin-syntax-jsx',
                    ['@babel/plugin-transform-react-jsx', { 'pragma': 'cm.cholo' }]
                ],
                minified: true,
                comments: false
            }),
            commonjs({
                include: OPTIONS.basePaths.map((bPath) => bPath + 'node_modules/**')
            }),
            asyncAwait(),
            // Needed to make async/await feature work. //
            // See: https://babeljs.io/docs/en/babel-polyfill#usage-in-browser  
            addBabelPolyfillToBundle(),      
            // This is where you set you base paths
            // See: https://www.npmjs.com/package/rollup-plugin-includepaths
            includePaths({
                paths: OPTIONS.basePaths
            }), 
            scss({
                output: OPTIONS.outputDir + 'css/bundle.css'
            }),           
            simpleBuildPlugin(),
            getCurrentFile(OPTIONS.basePaths[0]),            
            uglify({
                mangle: false
            })
        ]
    };

    const outputOptions = {
        dir: OPTIONS.outputDir,
        sourcemap: false,
        // See: https://rollupjs.org/guide/en/#outputentryfilenames
        entryFileNames: '[name].js',
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
        if (e.code === 'BUNDLE_END') {
            console.log(chalk.hex('#F7C14D')('REBUILT: ' + e.input + ' at ' + e.duration + 'ms ' + _getTime()));
        }
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
    bundle(file, true);
});





