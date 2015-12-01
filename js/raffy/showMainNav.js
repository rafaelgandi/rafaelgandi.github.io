define([
	'vendor/domReady!', 
	'raffy/globals',
	'jqplugins/jquery.easing.1.3'	
], function (domReady, globals, undef) {
	// show naviation menu //
	globals.$navigationCon.animate({
		'bottom' : '10px'
	}, 1e3, 'easeInOutElastic');
});