const { echo, sizeAndTime } = require('./my-plugin-helpers');

module.exports = function ({ template, chalk, jetpack, outputFilePath }) {
    return {
        name: 'rollup-make-index-html',
        generateBundle: function (options, bundle) {
            let data = {};
            for (let f in bundle) {    
                if (! bundle[f].isDynamicEntry) {
                    data.mainJS = bundle[f].fileName;
                    data.mainCSS = bundle[f].name + '.css?mainjs='+data.mainJS.replace('.js', '');
                }
            }
            data.systemJSCode = jetpack.read(__dirname + '/system.2.0.0.s.min.js');
            let html = template(data);
            jetpack.write(outputFilePath, html);
            echo(chalk, '#00B82C', 'BUILT INDEX: ' + outputFilePath + sizeAndTime(outputFilePath)); 
        }
    };
};