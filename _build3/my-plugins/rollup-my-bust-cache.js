const { echo, sizeAndTime } = require('./my-plugin-helpers');

module.exports = function ({ chalk, jetpack }) {
    return {
        name: 'rollup-my-bust-cache',
        generateBundle: function () {
            let indexFilePath = __dirname + '/../../index.html',
                indexHtmlCode = jetpack.read(indexFilePath),
                html = indexHtmlCode.replace(/\?cache=[\d]+/igm, '?cache=' + (new Date()).getTime());
            jetpack.write(indexFilePath, html);
            echo(chalk, '#00B82C', 'BUST CACHE OF INDEX HTML ' + sizeAndTime(indexFilePath)); 
        }
    };
};