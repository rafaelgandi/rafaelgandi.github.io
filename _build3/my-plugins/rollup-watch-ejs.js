// Plugin the triggers a rebuild if an ejs file from src/ejs-templates/ is modified
const path = require('path');
const glob = require('glob'); // See: https://dustinpfister.github.io/2017/11/28/nodejs-glob/
module.exports = () => {
    return {
        name: 'rollup-watch-ejs',
        buildStart() {
            // Need path to be absolute so that "this.addWatchFile" would work
            glob(path.resolve('../public/src/ejs-templates/*.ejs'), (error, files) => {
                if (! error) {
                    files.forEach((file) => {
                        this.addWatchFile(file);
                    });
                }
            });
        }
    };
};
