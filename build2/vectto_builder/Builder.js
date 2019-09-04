/*
    Build script for vectto <\3
    @author: Rafael Gandionco <www.rafaelgandi.tk>
*/ 
// See: https://babeljs.io/docs/en/babel-core/#options
// See: https://hackernoon.com/using-babel-7-with-node-7e401bc28b04
const babel = require("@babel/core"); // See: https://babeljs.io/docs/usage/api/
const fs = require('fs');
const jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack#writepath-data-options
class Builder {
    constructor(_data, _modules = []) {
        this.entryFile = _data.entryFile;
        this.out = _data.out;
        this.es5Out = _data.es5Out;
        this.basePath = _data.basePath;
        this.entryModule = _data.entryModule;
        this.noFollow = _data.noFollow || [];
        this.modules = [];
        this.addModules(_modules);
        this.getModuleDependencies(this.entryFile);
        this.modules.push(this.entryModule);
        this.babelPresetPath = [];
        this.babelPluginsPaths = [];
        this.customTransform = (_code) => _code;   
    }
    _getTime() {
        const date = new Date();
        return `[${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }]`;
    }
    _makeFilename(mod) {
        if ((/\.jsx$/ig).test(mod)) { // for jsx files
            return this.basePath + mod.trim();
        }
        return this.basePath + mod.replace(/\.js$/ig, '') + '.js';
    }
    addModules(modules = []) {
        if (! modules.length) { return this; }
        modules.forEach((mod) => {
            this.modules.push(mod);
        });
        return this;
    }
    uniqueOnly(arr) {
        // See: http://stackoverflow.com/a/14438954
        return arr.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    }
    _simpleTransformEs2015Modules(code, wrapWithDefine = true) {
        code = code.replace(/import\s+([a-zA-Z0-9_$]+)\s+from\s+(\S+)/img, (_match, _vars, _path) => { // [Sample:]-> import myModule from '/modules/my-module.js';
            return `const ${ _vars } = require(${ _path.replace(';', '') });`;
        });
        code = code.replace(/import\s+\*\s+as\s+([a-zA-Z0-9_$]+)\s+from\s+(\S+)/img, (_match, _vars, _path) => { // [Sample:]-> import * as myModule from '/modules/my-module.js';
            return `const ${ _vars } = require(${ _path.replace(';', '') });`;
        });
        code = code.replace(/import\s+([\'\"]\S+[\'\"])/img, (_match,_path) => { // [Sample:]-> import '/modules/my-module.js';
            return `require(${ _path.replace(';', '') })`;
        });
        code = code.replace(/^export default\s+/igm, 'return ');
        code = code.replace(/^export\s+/igm, 'return ');  
        if (wrapWithDefine) {
            code = `define((require, __import) => { "use strict";\n ${ code } \n});`;
        }          
        return code;
    }
    getModuleDependencies(file = '') {
        let modArr = [],
            //cjsRequireRegExp = /\s*require\s*\(\s*["\']([^\'"\s]+)["\']\s*\)/g;
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
        if (! jetpack.exists(file)) { 
            console.log('\x1b[31m%s\x1b[0m', 'File does not exists! ' + file);
            return; 
        }
        let content = jetpack.read(file, 'utf8');
        content = this._simpleTransformEs2015Modules(content);  // So that we can use require() to get the module paths/names
        try {
            content = babel.transform(content, { 
                plugins: [
                    // For JSX
                    // See: https://itnext.io/lessons-learned-using-jsx-without-react-bbddb6c28561
                    __dirname + '/node_modules/@babel/plugin-syntax-jsx',
                    __dirname + '/node_modules/@babel/plugin-transform-react-jsx'
                ],
                comments: false 
            }).code;    
        } catch (err) {
            console.log(content);
            throw err;            
        }
        content.replace(cjsRequireRegExp, (match, dep) => {
            dep = dep.replace('es!', '').trim();
            if (
                dep.indexOf('domReady!') === -1 && 
                dep.indexOf('!domReady') === -1 &&  
                dep !== 'jquery' &&  dep !== 'moment' && 
                this.noFollow.indexOf(dep) === -1
            ) {            
                if (this.modules.indexOf(dep) === -1 && modArr.indexOf(dep) === -1) {
                    modArr.push(dep);
                }                
            }  
        });
        if (modArr.length) {
            modArr.forEach((dep) => {
                this.getModuleDependencies(this._makeFilename(dep));
                this.modules.push(dep);
            });
        }
    }
    getAllDependencyFiles() {
        return this.uniqueOnly(this.modules).map((dep) => {
            return this._makeFilename(dep);
        });
    } 
    setCustomTransform(callback) {
        this.customTransform = callback;
    }
    _removeDuplicateModules(_arr) {
        // See: http://stackoverflow.com/a/14438954
        return _arr.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    }
    concat() {
        if (! this.modules.length) { return; }
        let returnCode = '';
        this.modules = this._removeDuplicateModules(this.modules);
        this.modules.forEach((mod) => {
            let file = this._makeFilename(mod),
                code = jetpack.read(file, 'utf8');                  
            if (typeof code === 'string') {
                code = this.customTransform(code); // LM: 2019-04-18
                code = this._simpleTransformEs2015Modules(code, code.indexOf('define(') === -1); // LM: 2019-05-21
                code = ';' + code.replace('define(', "\n"+'define("'+mod+'",') + ';';
                code = code.replace(/__CURRENT_MODULE_PATH/ig, '"' + mod + '"');
            }                               
            returnCode += "\n" + code + "\n";
        });  
        try {
            return babel.transform(returnCode, { 
                plugins: [
                    // For JSX
                    // See: https://itnext.io/lessons-learned-using-jsx-without-react-bbddb6c28561
                    __dirname + '/node_modules/@babel/plugin-syntax-jsx',
                    [__dirname + '/node_modules/@babel/plugin-transform-react-jsx', { 'pragma': 'cm.cholo' }]
                ],
                minified: true,
                comments: false 
            }).code;
        } catch (err) {
            console.log('\x1b[31m%s\x1b[0m', err);
        }
    }
    setBabelPresetPath(_presetPath) {
        if (! (_presetPath instanceof Array)) {
            _presetPath = [_presetPath];
        }
        this.babelPresetPath = _presetPath;  
        return this;
    }
    setBabelPluginPaths(_plugins = []) {
        this.babelPluginsPaths = [...this.babelPluginsPaths, ..._plugins];
        return this;
    }
    _getFileSize(file) {
        let bytes = fs.statSync(file).size;
        return `[${ Math.ceil(bytes/1024) }kb]`;
    }
    babelTranspile(_code) {
        // Needed to make async/await feature work. //
        // See: https://babeljs.io/docs/en/babel-polyfill#usage-in-browser
        let polyfillCode = jetpack.read(__dirname + '/node_modules/@babel/polyfill/dist/polyfill.min.js', 'utf8'),
            that = this,
            es5Code = babel.transform(_code, { 
                presets: that.babelPresetPath,
                plugins: that.babelPluginsPaths,
                minified: true,
                // See: https://stackoverflow.com/questions/34973442/how-to-stop-babel-from-transpiling-this-to-undefined-and-inserting-use-str
                sourceType: 'script'
            }).code;     
        jetpack.write(this.es5Out, ';' + polyfillCode + ';' + es5Code);  
        console.log('\x1b[33m%s\x1b[0m', 'Babel ' + babel.version + ' Transpiled ES5: ' + this.es5Out, this._getFileSize(this.es5Out),  this._getTime());  
    }
    compile() {
        let code = this.concat(),
            modList = '\n\n/*' + this.modules.join(', ') + '*/';
        code = code + modList;    
        jetpack.write(this.out, code);
        // See: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        console.log('\x1b[36m%s\x1b[0m', 'Concat ES6: ' + this.out, this._getFileSize(this.out), this._getTime()); 
        this.babelTranspile(code);
    }
    static fileMapAdapter(fileMapJson) {
        let adaptedFileMapJson = [];
        fileMapJson.forEach((fileObj) => {
            if (typeof fileObj.group !== 'undefined') {
                fileObj.files.forEach((file) => {
                    let tempFileObj = {};
                    tempFileObj.basePath = fileObj.basePath;
                    tempFileObj.out = `${ fileObj.basePath }${ fileObj.outDir }${ file.name }`;
                    tempFileObj.es5Out = `${ fileObj.basePath }${ fileObj.outDir }es5/${ file.name }`;
                    tempFileObj.entryFile = (file.entryModule.indexOf('.jsx') === -1) 
                    ? `${ fileObj.basePath }${ file.entryModule }.js` 
                    : `${ fileObj.basePath }${ file.entryModule }`;
                    tempFileObj.entryModule = file.entryModule;
                    if (typeof file.noFollow !== 'undefined') {
                        tempFileObj.noFollow = file.noFollow;
                    }
                    adaptedFileMapJson.push(tempFileObj);
                });
            }
            else {
                adaptedFileMapJson.push(fileObj);
            }
        });
        return adaptedFileMapJson;
    }
}
module.exports = Builder;
