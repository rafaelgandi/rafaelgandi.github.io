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
    _code.replace(/component\([\S]+,\s+([\S]+)\);/g, (match, tag) => {
        replaceWithHtmlTag = tag;
    });  
    _code.replace(/class\s+([a-zA-Z0-9_$]+)\s+extends\s+cm.ComponentElement/g, (match, className) => {
        _code = `${ _code } ; return cm.createComponent(${ className }, ${ replaceWithHtmlTag });`;
    });      
    _code = `define(() => { "use strict"; const component = require('ComponentModule/cm'); ${ _code }});`;
    return _code;
};