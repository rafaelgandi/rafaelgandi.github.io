/*
    Build script for vectto <\3
    @author: Rafael Gandionco <www.rafaelgandi.tk>
*/ 
"use strict";  
// See: https://babeljs.io/docs/en/babel-core/#options
// See: https://hackernoon.com/using-babel-7-with-node-7e401bc28b04
const babel = require("@babel/core"); // See: https://babeljs.io/docs/usage/api/
const fs = require('fs');
const stripComments = require('strip-comments'); // See: https://www.npmjs.com/package/strip-comments
const jetpack = require('fs-jetpack'); // See: https://github.com/szwacz/fs-jetpack#writepath-data-options
class Builder {
    constructor(_data, _modules = []) {
        this.entryFile = _data.entryFile;
        this.out = _data.out;
        this.es5Out = _data.es5Out;
        this.basePath = _data.basePath;
        this.entryModule = _data.entryModule;
        this.modules = [];
        this.addModules(_modules);
        this.getModuleDependencies(this.entryFile);
        this.modules.push(this.entryModule);        
        this.babelPresetPath = [];
        this.babelPluginsPaths = [];
        this.customTransform = (_code) => _code;    
    }
    getTime() {
        const date = new Date();
        return `[${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }]`;
    }
    _makeFilename(_module) {
        return this.basePath + _module + '.js';
    }
    addModules(_modules = []) {
        if (! _modules.length) { return this; }
        _modules.forEach((mod) => {
            this.modules.push(mod);
        });
        return this;
    }
    uniqueOnly(_arr) {
        // See: http://stackoverflow.com/a/14438954
        return _arr.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    }
    _simpleTransformEs2015Modules(code) {
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
        code = `define(() => { "use strict"; ${ code } });`;
        return code;
    }
    getModuleDependencies(_file = '') {
        let modArr = [],
            //cjsRequireRegExp = /\s*require\s*\(\s*["\']([^\'"\s]+)["\']\s*\)/g;
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
        if (! jetpack.exists(_file)) { 
            console.log('\x1b[31m%s\x1b[0m', 'File does not exists! ' + _file);
            return; 
        }
        let content = jetpack.read(_file, 'utf8');
        content = this._simpleTransformEs2015Modules(content);  // So that we can use require() to get the module paths/names
        try {
            content = stripComments(content);
        } catch(err) {}
        content.replace(cjsRequireRegExp, (match, dep) => {
            if (this.modules.indexOf(dep) == -1 && modArr.indexOf(dep) == -1) {
                modArr.push(dep);
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
    setCustomTransform(_callback) {
        this.customTransform = _callback;
    }
    concat() {
        if (! this.modules.length) { return; }
        let returnCode = '';
        this.modules.forEach((mod) => {
            let file = this._makeFilename(mod),
                code = jetpack.read(file, 'utf8');                  
            if (typeof code == 'string') {
                code = this.customTransform(code); // LM: 2019-04-18
                code = this._simpleTransformEs2015Modules(code); // LM: 2019-05-21                
                if (code.indexOf('@!dontReplaceDefine@') == -1) { // Identifier if you dont want define() to be modified
                    code = ';' + code.replace('define(', 'define("'+mod+'",') + ';';
                }  
            }                               
            try {
                returnCode += stripComments(code);
            } catch(err) {}
        });    
        try {
            return babel.transform(returnCode, { 
                minified: true,
                comments: false 
            }).code;
        } catch (err) {
            console.log('\x1b[31m%s\x1b[0m', err);
        }
    }
    setBabelPresetPath(_presetPath) {
        if (! _presetPath instanceof Array) {
            _presetPath = [_presetPath];
        }
        this.babelPresetPath = _presetPath;  
        return this;
    }
    setBabelPluginPaths(_plugins = []) {
        this.babelPluginsPaths = [...this.babelPluginsPaths, ..._plugins];
        return this;
    }
    babelTranspile(_code) {
        // Needed to make async/await fetaure to work. //
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
        console.log('\x1b[33m%s\x1b[0m', 'Babel ' + babel.version + ' Transpiled ES5: ' + this.es5Out, this.getTime());
    }
    compile() {
        let code = this.concat();
        jetpack.write(this.out, code);
        // See: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        console.log('\x1b[36m%s\x1b[0m', 'Concat ES6: ' + this.out, this.getTime()); 
        this.babelTranspile(code);
        //console.dir(this.modules);
    }
}

module.exports = Builder;
