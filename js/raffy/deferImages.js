
define(['vendor/domReady!', 'jqplugins/jquery.inview.min'], function (domReady, undef) {
	// Load images only when scrolled
	// See: https://github.com/protonet/jquery.inview
	$(document).on('inview', 'img[data-raf-src]', function (e) {
		var $this = $(this);
		$this.attr("src", $this.attr("data-raf-src")).hide().load(function () {
			$(this).fadeIn('slow'); // image fadin effect, just like mashable...				
		});
		// Remove it from the set of matching elements in order to avoid re-executing the handler
		$this.removeAttr("data-raf-src");			
	});	
});