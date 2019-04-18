module.exports = function (_code) {
    // Transfrom to props method //
    _code = _code.replace(/this\.props\.([a-zA-Z0-9_$]+)/g, 'this.getProps(\'$1\')');         
    _code = _code.replace(/\.props\.([a-zA-Z0-9_$]+)/g, '.getProps(\'$1\')');  
    // Minify styles inside style tags
    _code = _code.replace(/<style>([^<]+)<\/style>/igm, (match, css) => {
        return `<style>${ css.replace(/\s+/ig, ' ') }</style>`;
    }); 
    // Transform component shortcut //
    if (_code.indexOf('"use component";') == -1) { return _code; }
    let replaceWithHtmlTag = '';
    _code = _code.replace('"use component";', '');   
    _code.replace(/component\([\S]+, ([\S]+)\);/g, (match, tag) => {
        replaceWithHtmlTag = tag;
    });  
    _code.replace(/class ([a-zA-Z0-9_$]+) extends cm.ComponentElement/g, (match, className) => {
        _code = `${ _code } ; return cm.createComponent(${ className }, ${ replaceWithHtmlTag });`;
    });      
    _code = `AMD.define((require) => { "use strict"; require('domReady!'); const component = require('vectto/util/ComponentModule/cm'); ${ _code }});`;
    //console.log(_code);
    return _code;
};