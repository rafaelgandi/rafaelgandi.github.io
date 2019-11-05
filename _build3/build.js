const rollup = require('rollup');
const rimraf = require('rimraf');
const babel = require('rollup-plugin-babel');
const includePaths = require('rollup-plugin-includepaths');
const iife = require('rollup-plugin-iife');
const simpleBuildPlugin = require('./my-plugins/simpleBuildPlugin');
 


// ./node_modules/.bin/rollup rollup -h

const inputOptions = {
    input:[
        '../testb/src/index.js',
        '../testb/src/index2.js'
    ],
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
            paths: ['../testb/src']
        }),
        // See: https://github.com/eight04/rollup-plugin-iife
        iife(),
        simpleBuildPlugin()
    ]
};

const outputOptions = {
    dir: '../testb/dest/',
    // See: https://rollupjs.org/guide/en/#outputentryfilenames
    entryFileNames: '[name]-[format].js',
    // See: https://rollupjs.org/guide/en/#outputformat
    format: 'esm' 
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
console.log('Watching...');
watcher.on('event', (e) => {
    //console.log(e);
    console.log(new Date());
});


async function build() {
    rimraf.sync(outputOptions.dir);
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);
    //console.log(bundle.watchFiles); // an array of file names this bundle depends on
    // generate code
    const { output } = await bundle.generate(outputOptions);
    for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
        // For assets, this contains
        // {
        //   fileName: string,              // the asset file name
        //   source: string | Buffer        // the asset source
        //   type: 'asset'                  // signifies that this is an asset
        // }
        console.log('Asset', chunkOrAsset);
    } 
    else {
        // For chunks, this contains
        // {
        //   code: string,                  // the generated JS code
        //   dynamicImports: string[],      // external modules imported dynamically by the chunk
        //   exports: string[],             // exported variable names
        //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
        //   fileName: string,              // the chunk file name
        //   imports: string[],             // external modules imported statically by the chunk
        //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
        //   isEntry: boolean,              // is this chunk a static entry point
        //   map: string | null,            // sourcemaps if present
        //   modules: {                     // information about the modules in this chunk
        //     [id: string]: {
        //       renderedExports: string[]; // exported variable names that were included
        //       removedExports: string[];  // exported variable names that were removed
        //       renderedLength: number;    // the length of the remaining code in this module
        //       originalLength: number;    // the original length of the code in this module
        //     };
        //   },
        //   name: string                   // the name of this chunk as used in naming patterns
        //   type: 'chunk',                 // signifies that this is a chunk
        // }
        //console.log('Chunk', chunkOrAsset.code);
        //console.dir(chunkOrAsset.facadeModuleId);
    }
  }

  // or write the bundle to disk
  await bundle.write(outputOptions);
}
build();





