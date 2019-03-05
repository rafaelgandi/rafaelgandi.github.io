module.exports = function (_code) {
    _code = _code.replace(/this\.props\.([a-zA-Z0-9_$]+)/g, 'this.getProps(\'$1\')');         
    _code = _code.replace(/\.props\.([a-zA-Z0-9_$]+)/g, '.getProps(\'$1\')');  
    return _code;
};