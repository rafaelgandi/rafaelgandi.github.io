/* 
	raffy.js
	LM: 2015-11-27
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
    paths: {}
});

// Array.prototype.forEach() shiv //
// See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;if(this==null)throw new TypeError(" this is null or not defined");var e=Object(this),f=e.length>>>0;if(typeof a!="function")throw new TypeError(a+" is not a function");arguments.length>1&&(c=b),d=0;while(d<f){var g;d in e&&(g=e[d],a.call(c,g,d,e)),d++}});
window.$ = window.jQuery; // Explicitly map the "$" sign to jQuery.
define(['raffy/globals', 'raffy/navigate', 'util/isMobileFrame'], function (globals, navigate, isMobileFrame) {
	// Breakout of frame if in mobile and in frameset (.tk) //
	isMobileFrame.ifTrue(function () {
		alert('is in frame and mobile');
		//self.location.href = globals.GITHUB_URI;
	});
	// Load intro page scripts //
	require(['raffy/introPage']);
	var pageModules = {
		'photograffy_page': 'raffy/photograffyPage',
		'weapons_page': 'raffy/weaponsPage',
		'projects_page': 'raffy/projectsPage',
		'contact_page': 'raffy/contactPage'
	};
	// Load contents for the page //
	globals.root.on('pagechange', function (e, $page) {
		if ($page.hasClass(globals.PAGE_NO_CONTENTS_CLASS)) {
			var pageId = $page.attr('id');
			if (!! pageModules[pageId]) {
				require([pageModules[pageId]]);
				delete pageModules[pageId];
			}
		}
	});
});