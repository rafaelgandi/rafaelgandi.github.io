/*
    /!\ NOTE: 
    - When removing a css import you need to re-run "npm run build" for it to reflect 
    on the generated css file.
    - For now when you edit a single scss file, it would trigger all of the scss files 
    to be rebuilt. Need to look more into this.
*/

const { echo, sizeAndTime } = require('./my-plugin-helpers');
const path = require('path');

function _ixr(name, componentIdPath) { // Same ixr() as the one on vectto/util/ComponentModule/ComponentModule.js
    let mod = componentIdPath.trim();
    mod = mod
    .replace(/\.jsx$/ig, '')
    .replace(/\.js$/ig, '')
    .replace(/\//ig, '_')
    .replace(/\./ig, '_');
    return mod + '_cho8__' + name + '__8lo';
}

function _getUniqueIdFromPath(componentIdPath) {
    let cid = componentIdPath.replace(/^.+public\//ig, ''),
        { dir, name } = path.parse(cid),
        dirPieces = dir.split(path.sep);
    let newDirPieces = dirPieces.filter((d) => 'styles' !== d.trim());
    return newDirPieces.join(path.sep) + path.sep + name;
}

function ixrReplacer(stylesObj) { 
    let styles = '';   
    for (let cssFileName in stylesObj) {
        let componentIdPath = _getUniqueIdFromPath(cssFileName);
        styles = styles + "\n\n" + `/****** ${ path.basename(cssFileName) } ******/` + "\n" + stylesObj[cssFileName].replace(/__ixr\s*\[\s*([^'"\s\]]+)\s*\]/g, (match, ixrStr) => {
            return _ixr(ixrStr.trim(), componentIdPath);
        });
        // Remove source map comment markers //
        styles = styles.replace(/\/\*#\s+sourceMappingURL=.+\*\//ig, '');
    }
    return styles;
}

function writeCssFile(css, inputFile, outputDir, jetpack, chalk, cssPurge) { 
    if (css.trim() === '') { return; }
    inputFile = (inputFile instanceof Array) ? inputFile : [inputFile];
    inputFile.map((inputFilePath) => {
        let name = (() => {
                let filename = path.basename(inputFilePath),
                    pieces = filename.split('.');
                if (pieces.length === 1) { return filename; } 
                pieces.pop();
                return pieces.join('.');
            })(),
            outputPath = outputDir + `css/${ name }.css`; 
        // See: https://rbtech.github.io/css-purge/#getStarted    
        cssPurge.purgeCSS(css, {
            'trim': false,
            'trim_comments': false,
            'trim_breaklines': true,
            'shorten': true
        }, (error, result) => {
            if (! error){
                // Add newlines before and after comments to make them readable. //
                result = result
                .replace(/\/\*/ig, "\n\n/*")
                .replace(/\*\//ig, "*/\n")
                .trim();
                jetpack.writeAsync(outputPath, result).then(() => {                    
                    echo(chalk, '#D690E1', `CSS BUILT: ${ outputPath } ${ sizeAndTime(outputPath) }`);
                });
            }            
            else { 
                console.log(chalk.bgRed('CSS-PURGE ERROR:')); 
                console.log(chalk.bgRed(error)); 
            }            
        });                                           
    });    
}

function _getIxrObj(css, cssFileName) {
    let cssModuleObj = {};   
    let uniqueId = _getUniqueIdFromPath(cssFileName);
    css.replace(/__ixr\s*\[\s*([^'"\s\]]+)\s*\]/g, (match, ixrStr) => {
        cssModuleObj[ixrStr.trim()] = _ixr(ixrStr.trim(), uniqueId);
        return _ixr(ixrStr.trim(), uniqueId);
    });
    return cssModuleObj;
}

module.exports = function (inputFiles, outputDir, jetpack, chalk, cssPurge, slash) {
    const isCss = (id) => id.split('.').pop().toLowerCase() === 'css';
    let styleNodes = {},
        changes = 0;
    return {
        name: 'rollup-vectto-ixr-css',
        transform (code, id) { 
            id = slash(id);             
            if (! isCss(id)) { return; }  
            // See: https://github.com/thgh/rollup-plugin-css-only/blob/master/src/index.js   
            if (styleNodes[id] !== code.trim() && (styleNodes[id] || code)) {
                styleNodes[id] = code.trim();
                changes++;
            }                    
            let cssObj = _getIxrObj(code, id);     
            return {
                code: `export default ${ JSON.stringify(cssObj) }`,
                map: { mappings: '' }
            }; 
        },
        generateBundle() {
            if (! changes) { return; }              
            writeCssFile(
                ixrReplacer(Object.assign({}, styleNodes)), 
                inputFiles, 
                outputDir,
                jetpack, 
                chalk,
                cssPurge
            );
        }
    };
};