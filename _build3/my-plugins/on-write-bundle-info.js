// Used to show bundle details on rebuild 
const fs = require('fs');

function _getFileSize(file) {
    let bytes = fs.statSync(file).size;
    return `[${ Math.ceil(bytes/1024) }kb]`;
}

function _getTime() {
    const date = new Date();
    return `[${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }]`;
}

module.exports = function (chalk) {
    let outDir = '';
    return {
        name: 'on-write-bundle-info',
        generateBundle: function (options) {
            outDir = options.dir;
        },
        writeBundle: function (bundle) {
            for (let f in bundle) {
                let path = outDir + bundle[f].fileName;                
                console.log(chalk.hex('#F7C14D')('BUILT: ' + bundle[f].fileName + _getFileSize(path) + _getTime()));    
            }
        }
    };
};