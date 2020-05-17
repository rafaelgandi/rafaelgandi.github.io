const { echo, sizeAndTime } = require('./my-plugin-helpers');
//const { resolve, parse } = require('path');
const ejs = require('../node_modules/ejs'); // See: https://ejs.co/
const jetpack = require('../node_modules/fs-jetpack');
const path = require('path');
// Plugin the triggers a rebuild if an ejs file from src/ejs-templates/ is modified
const glob = require('glob'); // See: https://dustinpfister.github.io/2017/11/28/nodejs-glob/

function ejsAsset(inPath, outPath, data = {}, { chalk }) {
    function reCrawlEjsTemplates(data) {
        let _data = {};
        //console.log(data)
        for (let p in data) {
            if (data[p] instanceof Array) {
                if (data[p][0] === '@') {
                    let d = (!!data[p][2]) ? data[p][2] : {};
                    _data[p] = ejsAsset.getTemplate(data[p][1], d);
                    continue;
                }
            }
            _data[p] = data[p];
        }
        return _data;
    }
    return {
        name: 'rollup-ejs-asset',
        buildStart() {
            // Need path to be absolute so that "this.addWatchFile" would work
            glob(path.resolve('../src/ejs/*.ejs'), (error, files) => {
                if (! error) {
                    files.forEach((file) => {
                        this.addWatchFile(file);
                    });
                }
            });
        },
        generateBundle: function () {
            const template = jetpack.read(inPath);
            //console.log(data)
            const html = ejs.render(template, reCrawlEjsTemplates(data)); 
            if (jetpack.exists(outPath)) { jetpack.remove(outPath); }    
            jetpack.write(outPath, html);            
            echo(chalk, '#00B82C', `EJS WRITE TO FILE ${ outPath } ` + sizeAndTime(outPath));
        }
    };
}

ejsAsset.getTemplate = (inPath, data = {}) => {
    const template = jetpack.read(inPath);
    return ejs.render(template, data);  
};

module.exports = ejsAsset;