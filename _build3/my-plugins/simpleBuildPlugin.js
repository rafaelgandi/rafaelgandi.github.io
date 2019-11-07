
// See: https://rollupjs.org/guide/en/#plugins-overview
// See: https://github.com/rollup/awesome
// Samples: https://github.com/GoogleChromeLabs/proxx/tree/master/lib
module.exports = function (options) {
    return {
        name: 'simple-build-plugin',
        resolveId: function (file, origin) {
            //console.log(file, origin);
            return null;
        },
        renderChunk: function (code, chunk, options) {
            // console.log('===========================');
            // console.log(chunk.facadeModuleId);
            
        },
        transform: function (code, id) {
            
        },
        load(id, code) {
            // console.log('===========================');
            // console.log(id)
            // console.log('===========================');
        }
    };
};