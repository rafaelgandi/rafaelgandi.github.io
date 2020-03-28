

module.exports = function (jetpack, code, id) {
    let details = jetpack.inspect(id, {
        checksum: 'md5',
        times: true,
        absolutePath: true
    });
    let checksum = (!! details.md5) ? `"${ details.md5 }"` : 'null';
    return code.replace(/__CHECKSUM/ig, checksum);
};