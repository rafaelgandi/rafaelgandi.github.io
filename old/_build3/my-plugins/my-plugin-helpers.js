const fs = require('fs');

function _getFileSize(file) {
    let bytes = fs.statSync(file).size;
    return `[${ Math.ceil(bytes/1024) }kb]`;
}

function _getTime() {
    const date = new Date();
    return `[${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }]`;
}

module.exports = {
    getBundleDetails(bundle, filename) {
        for (let f in bundle) {
            if (f === filename.trim()) {
                return bundle[f];
            }
        }
    },
    echo(chalk, color, msg) {
        console.log(chalk.hex(color)(msg));
    },
    sizeAndTime(path) {
        return _getFileSize(path) + _getTime();
    }
};