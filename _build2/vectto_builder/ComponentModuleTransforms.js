module.exports = function (_code) {
    // Transfrom to props method //
    _code = _code.replace(/this\.props\.([a-zA-Z0-9_$]+)/g, 'this.getProps(\'$1\')');         
    _code = _code.replace(/\.props\.([a-zA-Z0-9_$]+)/g, '.getProps(\'$1\')');  
    // Minify styles inside style tags
    _code = _code.replace(/<style>([^<]+)<\/style>/igm, (match, css) => {
        return `<style>${ css.replace(/\s+/ig, ' ') }</style>`;
    });
    return _code;
};