/*
    Transforms:
    vectto/pages/home/TimerContainer ====> vectto/pages/home/TimerContainer/TimerContainer.jsx
*/

const fs = require('fs');
const path = require('path');
const os = require('os');

const VOLUME = /^([A-Z]:)/i;
const IS_WINDOWS = os.platform() === 'win32';


const fileExists = function (uri) {
    try {
        return fs.statSync(uri).isFile();
    } catch (e) {
        return false;
    }
};

const isDirectory = (path) => {
    try {
        return fs.statSync(path).isDirectory();
    }
    catch (e) {
        return false;
    }    
};

const removeLastForwardSlash = (path) => {
    return path.replace(/\/$/, '');
};

module.exports = function (baseDirPaths = [], { slash }) {
    // See: https://github.com/rollup/plugins/blob/master/packages/alias/src/index.js#L25
    const normalizeId = (id) => {
        if ((IS_WINDOWS && typeof id === 'string') || VOLUME.test(id)) { 
            return slash(id.replace(VOLUME, ''));
        }
        return id;
    };
    const makeAbsPath = (id) => {
        return slash(path.resolve(__dirname + '../../', id));
    };
    const isRelativePath = (id) => {
        let dir = path.dirname(id).trim();
        return /^\./.test(dir);
    };
    const resolveRelativePathToAbs = (id, importer) => {
        let dirPath = path.dirname(importer),
            dir = id.replace(/^.\//, '').trim();
        return slash(path.resolve(dirPath + path.sep + dir));
    };
    return {
        name: 'rollup-vectto-resolve-named-directory',
        resolveId(id, importer) {
            id = normalizeId(id);
            for (let i = 0; i < baseDirPaths.length; i++) {                    
                let baseDirPath = removeLastForwardSlash(baseDirPaths[i]);
                if (isRelativePath(id) && importer) {
                    id = resolveRelativePathToAbs(id, importer);
                }
                else {
                    id = makeAbsPath(baseDirPath + path.sep + id);
                }                
                if (isDirectory(id)) {
                    //console.log(isDirectory, id);
                    let moduleName = removeLastForwardSlash(id).split(path.sep).pop(),
                        moduleFile = slash(id + path.sep + moduleName),
                        updatedId = '';
                    if (fileExists(moduleFile + '.jsx')) {                            
                        updatedId = moduleFile + '.jsx';                            
                    }
                    else if (fileExists(moduleFile + '.js')) {
                        updatedId =  moduleFile + '.js';
                    }                                         
                    updatedId = makeAbsPath(updatedId); // Make it an absolute path                        
                    // See: https://github.com/rollup/plugins/blob/master/packages/alias/src/index.js#L93
                    return this.resolve(updatedId, importer, { skipSelf: true }).then((resolved) => {
                        let finalResult = resolved;
                        if (!finalResult) {                                 
                            finalResult = { id: updatedId };
                        }
                        return finalResult;
                    });                      
                }
            }
            return;
        }
    };
};