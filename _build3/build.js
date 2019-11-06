const rollup = require('rollup');
const rimraf = require('rimraf');
const chalk = require('chalk'); // See: https://www.npmjs.com/package/chalk
const babel = require('rollup-plugin-babel');
const includePaths = require('rollup-plugin-includepaths');
const resolve = require('rollup-plugin-node-resolve'); // See: https://github.com/rollup/rollup-plugin-node-resolve
const simpleBuildPlugin = require('./my-plugins/simpleBuildPlugin');


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
                minified: true,
                comments: false 
            }),
            // This is where you set you base paths
            // See: https://www.npmjs.com/package/rollup-plugin-includepaths
            includePaths({
                paths: OPTIONS.basePaths
            }),
            simpleBuildPlugin(),
            resolve()
        ]
    };

    const outputOptions = {
        dir: OPTIONS.outputDir,
        // See: https://rollupjs.org/guide/en/#outputentryfilenames
        entryFileNames: '[name]-[format].js',
        // See: https://rollupjs.org/guide/en/#outputformat
        format: 'system' // See: https://github.com/rollup/rollup-starter-code-splitting
    };

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
        }  
        if (e.code === 'FATAL') {
            console.log(chalk.bgRed('encountered an unrecoverable error...'));
        }    
    });
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);
    //console.log(bundle.watchFiles); // an array of file names this bundle depends on
    // generate code
    const { output } = await bundle.generate(outputOptions);
    // or write the bundle to disk
    await bundle.write(outputOptions);
    console.log(chalk.hex('#63BEEF')('BUILT: ' + inputFile));
}

// Bundle all files //
OPTIONS.inputFiles.forEach((file) => {
    bundle(file);
});





