const rollup = require('rollup');
const rimraf = require('rimraf');
const chalk = require('chalk'); // See: https://www.npmjs.com/package/chalk
const babel = require('rollup-plugin-babel');
const includePaths = require('rollup-plugin-includepaths');
const resolve = require('rollup-plugin-node-resolve'); // See: https://github.com/rollup/rollup-plugin-node-resolve
const scss = require('rollup-plugin-scss'); // See: https://github.com/thgh/rollup-plugin-scss
const { uglify } = require('rollup-plugin-uglify'); // See: https://github.com/TrySound/rollup-plugin-uglify
const replace = require('rollup-plugin-replace');
const simpleBuildPlugin = require('./my-plugins/simpleBuildPlugin');
const getCurrentFile = require('./my-plugins/get-current-file');

const OPTIONS = {
    inputFiles: [
        '../testb/src/index.js',
        '../testb/src/index2.js'
    ],
    outputDir: '../testb/dest/',
    basePaths: ['../testb/src']
};
rimraf.sync(OPTIONS.outputDir);

function _getTime() {
    const date = new Date();
    return `[${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }]`;
}

async function bundle(inputFile) {
    const inputOptions = {
        input:inputFile,
        // See: https://rollupjs.org/guide/en/#plugins-overview
        plugins:[
            babel({
                presets: ['@babel/preset-env'],
                plugins: [
                    '@babel/plugin-transform-async-to-generator',
                    '@babel/plugin-syntax-jsx',
                    ['@babel/plugin-transform-react-jsx', { 'pragma': 'cm.cholo' }]
                ],
                runtimeHelpers: true,
                minified: true,
                comments: false
            }),
            // This is where you set you base paths
            // See: https://www.npmjs.com/package/rollup-plugin-includepaths
            includePaths({
                paths: OPTIONS.basePaths
            }),
            resolve(),
            scss({
                output: OPTIONS.outputDir + 'css/bundle.css'
            }),
            simpleBuildPlugin(),
            getCurrentFile(OPTIONS.basePaths[0]),
            uglify()
        ]
    };

    const outputOptions = {
        dir: OPTIONS.outputDir,
        sourcemap: true,
        // See: https://rollupjs.org/guide/en/#outputentryfilenames
        entryFileNames: '[name]-[format].js',
        // See: https://rollupjs.org/guide/en/#outputformat
        format: 'system' // See: https://github.com/rollup/rollup-starter-code-splitting
    };
    
    // Buid and Watch for Updates //
    const watchOptions = {
        ...inputOptions,
        output: [outputOptions],
        watch: {
            chokidar: true,
            exclude: 'node_modules/**',
            include: '../testb/src/**'
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
});





