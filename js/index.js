

define(() => {
	"use strict";
    require('ComponentModule/cm');
    const LayoutComponent = require('raffy/LayoutComponent');
    document.addEventListener('DOMContentLoaded', () => { 
        LayoutComponent.renderAllComponents();
    });    
});


