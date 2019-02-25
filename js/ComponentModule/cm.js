define((require) => {
    "use strict";
    require('domReady!');
    const ComponentModule = require('./ComponentModule');
    return function (_modId) {
        let _cm = new ComponentModule(_modId),
            essentials = _cm.getEssentialModules();
        return {
            cm: _cm,
            globals: essentials.globals, 
            helpers: essentials.helpers, 
            comms: essentials.comms, 
            runwhen: essentials.runwhen, 
            componentHtml: essentials.componentHtml, 
            ixr: (_val) => _cm.ixr(_val),
            pint: essentials.helpers.pint,
            typeOf: essentials.helpers.typeOf
        };    
    };
});