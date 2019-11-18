function _isJs(id) {
    let extension = id.split(/\./).pop();
    return ['js', 'mjs', 'jsx'].indexOf(extension.toLowerCase()) !== -1;
}

module.exports = function (babelCore, opt) {
    return {
        name: 'my-jsx',
        transform: function (code, id) {
            if (! _isJs(id)) { return; }
            let content = '',
                map = null;
            try {
                // transform jsx
                let babelOutput = babelCore.transform(code, { 
                    plugins: [
                        // For JSX
                        // See: https://itnext.io/lessons-learned-using-jsx-without-react-bbddb6c28561
                        '@babel/plugin-syntax-jsx',
                        ['@babel/plugin-transform-react-jsx', { 'pragma': 'cm.cholo' }],
                        '@babel/plugin-syntax-dynamic-import'
                    ],
                    sourceMaps: true,
                    comments: false,
                    minified: true 
                });
                content = babelOutput.code;
                map = babelOutput.map;
            }
            catch (err) {
                let errorMsg = err.toString();
                if (errorMsg.indexOf("'dynamicImport'") !== -1) { // Allow dynamic import errors
                    content = code;   
                }
                else { this.error(errorMsg); }                    
            }
            if (! map) {
                this.warn('Unable to generate map from babel for ' + id);
            }  
            if (typeof opt.piggyBack === 'function') {
                content = opt.piggyBack(content, id);
            }          
            return {
                code: content,
                map: map
            };
        }
    };
};