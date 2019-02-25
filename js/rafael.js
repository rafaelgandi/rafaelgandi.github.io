requirejs.config({
    baseUrl: '/js',
	// See: http://stackoverflow.com/questions/13626715/load-timeout-for-module-domready-unnormalized2
	// See: http://stackoverflow.com/questions/14279962/require-js-error-load-timeout-for-modules-backbone-jquerymobile
	waitSeconds: 200,
    paths: {
		'domReady': './ComponentModule/domReady'
	}
	// Smart caching //
	,urlArgs: "bust=" + (new Date()).getTime()
});

define((require) => {
	"use strict";
	require('domReady!');
	const { cm, componentHtml } = require('./ComponentModule/cm');
	const CounterComponent = require('./CounterComponent');
	const $CounterComponent = CounterComponent.renderAllComponents();
	setTimeout(() => {
		$CounterComponent.cm.fromMethod();
	}, 5000);
});