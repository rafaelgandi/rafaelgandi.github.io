/* 
	raffy.js
	LM: 2017-03-29
	Author: Rafael Gandionco
		
		    __         __
           /.-'       `-.\
          //             \\
         /j_______________j\
        /o.-==-. .-. .-==-.o\
        ||      )) ((      ||
         \\____//   \\____//   
          `-==-'     `-==-'
*/
requirejs.config({
    baseUrl: 'js',
	// See: http://stackoverflow.com/questions/13626715/load-timeout-for-module-domready-unnormalized2
	// See: http://stackoverflow.com/questions/14279962/require-js-error-load-timeout-for-modules-backbone-jquerymobile
	waitSeconds: 200,
    paths: {}
});
window.$ = window.jQuery; // Explicitly map the "$" sign to jQuery.

// LM: 2016-10-19 [Started using twitter emoji library]
// See: http://twitter.github.io/twemoji/
jQuery(function ($) {
	twemoji.parse(document.body);
    var url = (parent !== window) ? document.referrer : document.location;
    console.log(url);
    console.log(location.href);
});

require([
	'util/Array.forEach', 
	'raffy/globals', 
	'raffy/navigate', 
	'util/isMobileFrame',
	'raffy/route'
], function (undef, globals, navigate, isMobileFrame, router) {
    // LM: 2017-03-29 [Add checking for "/blog" on the url] //
    var url = (parent !== window) ? document.referrer : document.location; // See: http://stackoverflow.com/a/7739035
    if (url.indexOf('/blog') !== -1) {
        // Redirect to my blog website instead. //
        window.top.location.href = globals.BLOG_URI;
        return;
    }
	// Breakout of frame if in mobile and in frameset (.tk) //
	isMobileFrame.ifTrue(function () {
		window.top.location.href = globals.GITHUB_URI;
	});
	var pageModules = {
		'intro_page': 'raffy/page/introPage',
		'photograffy_page': 'raffy/page/photograffyPage',
		'weapons_page': 'raffy/page/weaponsPage',
		'projects_page': 'raffy/page/projectsPage',
		'contact_page': 'raffy/page/contactPage'
	};
	// Show main navigation //
	require(['raffy/showMainNav']);	
	// Load contents for the page //
	globals.root.on('pagechange', function (e, $page) {
		if ($page.hasClass(globals.PAGE_NO_CONTENTS_CLASS)) {
			var pageId = $page.attr('id');
			if (!! pageModules[pageId]) {
				// Load the page modules //
				require([pageModules[pageId]]);
				delete pageModules[pageId];
			}			
		}
	});
	
	// LM: 2016-10-19 [Started using twitter emoji library]
	globals.root.on('markupbuilt', function () {		
		twemoji.parse(document.body);
	});
	
	// Set the onload routes //
	router.setDefaultLanding('intro_page');
	router.init({
		'/welcome': 'intro_page',
		'/photography': 'photograffy_page',
		'/weapons': 'weapons_page',
		'/projects': 'projects_page',
		'/contact': 'contact_page'
	});	
	
});