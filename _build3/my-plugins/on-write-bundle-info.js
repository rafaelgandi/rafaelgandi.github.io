// Used to show bundle details on rebuild 
const { echo, sizeAndTime } = require('./my-plugin-helpers');

module.exports = function (chalk) {
    let outDir = '';
    return {
        name: 'on-write-bundle-info',
        generateBundle: function (options) {
            outDir = options.dir;
        },
        writeBundle: function (options, bundle) {
            for (let f in bundle) {
                let path = outDir + bundle[f].fileName;                
                echo(chalk, '#EA884A', 'BUILT: ' + path + sizeAndTime(path));    
            }
        }
    };
};