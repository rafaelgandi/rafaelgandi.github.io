
module.exports = (env) => {
    let returnEnvVars = {},
        notAllowed = ['SERVER_PORT'];
    for (let p in env) {
        if (notAllowed.indexOf(p) !== -1) { continue; }
        returnEnvVars[`process.env.${ p }`] = JSON.stringify(env[p]);
    }
    return returnEnvVars;
};