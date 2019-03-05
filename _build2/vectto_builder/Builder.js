/*
    Build script for vectto <\3
    @author: Rafael Gandionco <www.rafaelgandi.tk>
*/ 
"use strict";  
const babel = require("babel-core"); // See: https://babeljs.io/docs/usage/api/
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
        this.modules.push(this.entryModule);
        this.getModuleDependencies(this.entryFile);
        this.babelPresetPath = '';
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
    getModuleDependencies(_file = '') {
        let modArr = [],
            //cjsRequireRegExp = /\s*require\s*\(\s*["\']([^\'"\s]+)["\']\s*\)/g;
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
        if (! jetpack.exists(_file)) { 
            console.log('\x1b[31m%s\x1b[0m', 'File does not exists! ' + _file);
            return; 
        }
        let content = jetpack.read(_file, 'utf8');
        try {
            content = stripComments(content);
        } catch(err) {}
        content.replace(cjsRequireRegExp, (match, dep) => {
            dep = dep.replace('es!', '').replace('./', '');
            if (
                dep.indexOf('domReady') == -1 && 
                dep.indexOf('senju') == -1 && 
                dep.indexOf('module') == -1 && 
                dep.indexOf('jquery') == -1
            ) {
                if (this.modules.indexOf(dep) == -1 && modArr.indexOf(dep) == -1) {
                    modArr.push(dep);
                }                
            }            
        });
        if (modArr.length) {
            modArr.forEach((dep) => {
                this.modules.push(dep);
                this.getModuleDependencies(this._makeFilename(dep));
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
                if (code.indexOf('@!dontReplaceDefine@') == -1) { // Identifier if you dont want define() to be modified
                    code = ';' + code.replace('define(', 'define("'+mod+'",') + ';';
                }  
            }                               
            try {
                returnCode += stripComments(code);
            } catch(err) {}
        });  
        // LM: 2018-05-14
        returnCode = this.customTransform(returnCode);       
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
        this.babelPresetPath = _presetPath;  
        return this;
    }
    babelTranspile(_code) {
        let that = this,
            es5Code = babel.transform(_code, { 
                presets: [that.babelPresetPath],
                minified: true
            }).code;     
        jetpack.write(this.es5Out, es5Code);  
        console.log('\x1b[33m%s\x1b[0m', 'Transpiled ES5: ' + this.es5Out, this.getTime());  
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