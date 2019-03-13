requirejs.config({
    baseUrl: '/js',
    // See: http://stackoverflow.com/questions/13626715/load-timeout-for-module-domready-unnormalized2
    // See: http://stackoverflow.com/questions/14279962/require-js-error-load-timeout-for-modules-backbone-jquerymobile
    waitSeconds: 200
});
define((require) => {
	"use strict";
	const LayoutComponent = require('raffy/LayoutComponent');
    document.addEventListener('DOMContentLoaded', () => {
        LayoutComponent.renderAllComponents();
    });    
});