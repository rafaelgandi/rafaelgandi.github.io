define([
	'vendor/domReady!', 
	'util/helpers', 
	'raffy/globals'
], function (domReady, helpers, globals) {
	
	function loadTemplate(_tplPath, _$pageCon, _callback) {
		_callback = _callback || function () {};
		$.get(_tplPath, function (res) {
			_$pageCon
			.html(res)
			.removeClass(globals.PAGE_NO_CONTENTS_CLASS);
			globals.root.trigger('markupbuilt');
			_callback();
		});
	}
	
	function buildListMarkup(_options) {
		var html = '',
			listTemplate = '';
		_options.afterBuild = _options.afterBuild || function () {};
		loadTemplate(_options.pageTemplatePath, _options.$pageContainer, function () {
			listTemplate = document.getElementById(_options.listTemplateId).innerHTML
			_options.data.forEach(function (data) {
				html += helpers.tpl(listTemplate, data);
			});
			document.getElementById(_options.listContainerId).innerHTML = html;
			_options.afterBuild();
			globals.root.trigger('markupbuilt');
		});
	}
	
	return {
		buildListMarkup: buildListMarkup,
		loadTemplate: loadTemplate
	};
});