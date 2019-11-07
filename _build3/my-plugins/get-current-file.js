
function _getFromTheBasePath(basePath, filePath) {
    basePath = basePath.replace(/\.\.\//ig, '/').replace(/\/\/+/ig, '/'); // Remove "../" from paths
    let startingIndex = filePath.indexOf(basePath);
    if (startingIndex === -1) { return filePath; }
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    return filePath.substring(startingIndex)
    .replace(/^\//, '') // Remove leading "/"
    .replace(/\.js$/ig, ''); //  Remove .js from file path name
}

module.exports = function (basePath) {
    return {
        name: 'get-current-file',
        transform: function (code, id) {
            return {
                code: code.replace(/__CURRENT_MODULE_PATH/ig, '"' + _getFromTheBasePath(basePath, id) + '"'),
                map: null
            };
        }
    };
};