module.exports = {
    getBundleDetails(bundle, filename) {
        for (let f in bundle) {
            if (f === filename.trim()) {
                return bundle[f];
            }
        }
    }
};