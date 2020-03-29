const rollup = require('rollup');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk'); // See: https://www.npmjs.com/package/chalk
const babelCore = require("@babel/core"); // See: https://babeljs.io/docs/usage/api/
const includePaths = require('rollup-plugin-includepaths'); // See: https://www.npmjs.com/package/rollup-plugin-includepaths
const nodeResolve = require('@rollup/plugin-node-resolve'); // See: https://github.com/rollup/rollup-plugin-node-resolve
const { terser } = require('rollup-plugin-terser'); // See: https://www.npmjs.com/package/rollup-plugin-uglify-es
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias'); // See: https://github.com/rollup/plugins/tree/master/packages/alias
const jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack#writepath-data-options
//const utils = require('@rollup/pluginutils'); // See: https://github.com/rollup/plugins/tree/master/packages/pluginutils
const currentFileConstant = require('./my-plugins/current-file-constant');
const currentChecksumConstant = require('./my-plugins/current-checksum-constant');
const myJSX = require('./my-plugins/my-jsx');
const createSeparateTranspiledBundle = require('./my-plugins/create-separate-transpiled-bundle');
const onWriteBundleInfo = require('./my-plugins/on-write-bundle-info');
const ixrCss = require('./my-plugins/rollup-vectto-ixr-css');
const testing = require('./my-plugins/rollup-vectto-testing');
const vecttoResolveNamedDirectory = require('./my-plugins/rollup-vectto-resolve-named-directory');
const vecttoGraphQL = require('./my-plugins/rollup-vectto-graphql');
const progress = require('rollup-plugin-progress'); // See: https://github.com/jkuri/rollup-plugin-progress
const cssPurge = require('css-purge'); // See: https://rbtech.github.io/css-purge/#getStarted
const slash = require('slash'); // See: https://github.com/sindresorhus/slash#readme

const OPTIONS = {
    // Entry Scripts //
    inputFiles: [
        '../src/index.jsx'
    ],
    outputDir: '../dist/',
    basePaths: ['../src/']
};
rimraf.sync(OPTIONS.outputDir);

async function bundle(inputFile) {
    const inputOptions = {
        input:inputFile,
        external: ['jquery', 'jquery-slim', 'prop-types', 'bootstrap', 'react-bootstrap-orig'],
        // See: https://rollupjs.org/guide/en/#plugins-overview
        plugins:[
            alias({
                entries: [
                    { find: 'react', replacement: 'third-party/react/dummy/react.js' },
                    { find: 'react-dom', replacement: 'third-party/react/dummy/react-dom.js' },
                    { find: 'react-bootstrap', replacement: 'third-party/bootstrap/js/react-bootstrap-dummy.js' }
                ]            
            }),
            vecttoResolveNamedDirectory(OPTIONS.basePaths, { slash }),
            nodeResolve(),            
            commonjs({
                include: OPTIONS.basePaths.map((bPath) => bPath + 'node_modules/**'),
                sourceMap: false
            }),
            // This is where you set your base paths
            // See: https://www.npmjs.com/package/rollup-plugin-includepaths
            includePaths({
                paths: OPTIONS.basePaths.map((bPath) => bPath)
            }),
            ixrCss(inputFile, OPTIONS.outputDir, jetpack, chalk, cssPurge, slash),   
            vecttoGraphQL(jetpack, slash), 
            myJSX(babelCore, {
                piggyBack: (code, id) => {
                    code = currentFileConstant(code, OPTIONS.basePaths[0], id);
                    code = currentChecksumConstant(jetpack, code, id);
                    return code;
                }
            }),   
            createSeparateTranspiledBundle(babelCore, jetpack, chalk), 
            terser({ mangle: false }),
            progress({ clearLine: false }),
            onWriteBundleInfo(chalk)
        ],
        onwarn(warning, warn) {
            // See: https://github.com/rollup/rollup/issues/1518#issuecomment-321875784w
            // Suppress eval warnings //
            if (warning.code === 'EVAL') { return; }
            if (warning.code === 'THIS_IS_UNDEFINED') {
                console.log(chalk.bgRed(warning.message+ ' File: ' + warning.loc.file));
                console.log(warning.loc);
                console.log(chalk.bgRed(warning.url));
                return;
            }
            warn(warning);
        }
    };

    const outputOptions = {
        dir: OPTIONS.outputDir,
        sourcemap: true,
        // See: https://rollupjs.org/guide/en/#outputentryfilenames
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        // See: https://rollupjs.org/guide/en/#outputformat
        // See: https://github.com/rollup/rollup-starter-code-splitting
        format: 'system', 
        paths: {
            // See: https://engineering.mixmax.com/blog/rollup-externals/
            'jquery': path.resolve('/src/third-party/jquery/jquery-3.4.1.min.js'),
            'jquery-slim': path.resolve('/src/third-party/jquery/jquery-3.4.1.slim.min.js'),
            'prop-types': path.resolve('/src/third-party/react/prop-types.development.js'),
            'bootstrap': path.resolve('/src/third-party/bootstrap/js/bootstrap.min.js'),
            'react-bootstrap-orig': path.resolve('/src/third-party/bootstrap/js/react-bootstrap.min.js')
        }
    };
    
    // Buid and Watch for Updates //
    const watchOptions = {
        ...inputOptions,
        output: [outputOptions],
        watch: {
            chokidar: true,
            exclude: [
                ...OPTIONS.basePaths.map((bPath) => bPath + 'node_modules/**')
            ],
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
        if (e.code === 'BUNDLE_END') {
            console.log(chalk.bgYellow(`bundle end for ...${ inputFile }`));
        }     
    });
}

// Bundle all files //
let welcomeAscii = `
=======================     
 __                __       
|__)   .| _| _ _    _)      
|__)|_|||(_|(-|    __)      
=======================     
Powered by: rollupjs ${ rollup.VERSION } 
and gulp                    
Starting build...           `;
console.log(chalk.bgCyan(welcomeAscii));                                                                                                                                                    
OPTIONS.inputFiles.map((file) => {
    bundle(file);
});
console.log(chalk.bgRed(`${ OPTIONS.inputFiles.length } watched instances found`));





