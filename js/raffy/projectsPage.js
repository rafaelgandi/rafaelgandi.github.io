define([
	'vendor/domReady!', 
	'raffy/globals',
	'raffy/buildMarkup',
	'util/helpers',
	'raffy/deferImages'
], function (domReady, globals, markup, helpers, undefined) {
	markup.loadTemplate('templates/projects_page.html', globals.$pages.projectsPage, function () {
		var html = '',
			counter = 0,
			projetItemTpl = document.getElementById('project_item_tpl').innerHTML;
		$.getJSON('js/projects.json', function (projectData) {				
			html += '<div class="grid">';
			projectData.forEach(function (proj) {
				if (counter === 4) {
					counter = 0;
					html += '</div><div class="grid">';
				}
				html += helpers.tpl(projetItemTpl, proj);
				counter++;
			});	
			html += '</div>';
			
			$('#raffy_projects_wrapper').html(html);
		});
	});
	
});