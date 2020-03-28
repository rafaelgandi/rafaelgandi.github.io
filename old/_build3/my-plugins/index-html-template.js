function tagTemplateHtml(_strings, ..._values) {
    // See: http://wesbos.com/tagged-template-literals/
    let str = '';
    _strings.forEach((_strings, i) => {
       str += _strings + (_values[i] || '');
    });
    return str;
}

module.exports = function (data) {
    return tagTemplateHtml`
    <!doctype html> 
    <html lang="en">
    <head>
    	<meta charset="utf-8"> 
    	<title>Rafael Gandionco</title>
    	<meta name="description" content="rafael gandionco website portfolio web development photography @rafaelgandi photographer filipino street photography streetphotography rafaelgandi gandi rafael developer cebu philippines asia minimalist minimalism cholo 🐶💚">
    	<meta name="author" content="rafael gandionco">
    	<meta name="msapplication-tap-highlight" content="no">
    	<meta name="theme-color" content="#8E9A9C">
    	<meta name="apple-mobile-web-app-capable" content="yes" />
    	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    	<!-- See: http://debugfix.com/2011/11/android-browser-css-position-fixed-bug-solved/ -->
    	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    	<!-- https://photos.app.goo.gl/GUWrbDCsQtn28T3t6 -->
    	<link rel="shortcut icon" href="images/to_Cholo_the_best_dog_in_the_world__thank_you_for_your_unconditional_love__we_love_and_miss_you_soo_much__06-19.ico??v20190425" class="We love and miss you Cholo 🐕 2006-2019">
    	<!-- CSS: implied media="all" -->
    	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&font-display=swap">
    	<link rel="stylesheet" href="dist/css/${ data.mainCSS }">
    	<style type="text/css">body { opacity: 0; }</style>
    	<script>
    	(function () {
    		// See: https://www.smashingmagazine.com/2016/08/sghpa-single-page-app-hack-github-pages/
    		var redirect = sessionStorage.redirect;
    		delete sessionStorage.redirect;
    		if (redirect && redirect != location.href) {
    			history.replaceState(null, null, redirect);
    		}
    	})();
    	</script>		
    </head>
    <body>
    	<div id="placeholder-raffy-layout-component">Loading...</div>
    	<script>
            ${ data.systemJSCode }
    		document.addEventListener('DOMContentLoaded', function () {
                var mainScriptPath = './dist/${ data.mainJS }';
                try { eval("(async () => {})();"); } 
                catch (err) {
                    mainScriptPath = './dist/es5/${ data.mainJS }';
                }
    			System.import(mainScriptPath).catch(function (e) {
    				console.log("Error with SystemJS.import ${ data.mainJS }", e);
    			});
    		}); 		
    	</script>
    </body>
    </html>`;
};