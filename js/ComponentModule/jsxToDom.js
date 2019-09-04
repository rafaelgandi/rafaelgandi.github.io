import helpers from 'ComponentModule/helpers';

export default (function () {
	
	function  _normalizeTypeName(type = '') {
        let dirtyType = helpers.typeOf(type);
        if (dirtyType.indexOf('element') !== -1) { return 'dom'; }
        if (dirtyType === 'numeric') { return 'number'; }
        if (dirtyType === 'bool') { return 'boolean'; }
        return dirtyType;
    }
	
	function _checkPropTypes(comp) {
		// LM: 2019-01-16 [Type checking added to component properties]
		// NOTE: Type checking is done last and is inside a rAF function to make it async and more performant.
		requestAnimationFrame(() => {
			if (helpers.typeOf(comp.propTypes) === 'function') {
				let propTypeMap = comp.propTypes();
				for (let prop in propTypeMap) {
					let p = comp.props[prop];
					if (helpers.typeOf(p) !== 'undefined') {
						if (helpers.typeOf(propTypeMap[prop]) !== 'array') {
							propTypeMap[prop] = [propTypeMap[prop]];
						} 
						if (propTypeMap[prop].indexOf('any') === -1) {
							if (propTypeMap[prop].indexOf(_normalizeTypeName(p)) === -1) {
								throw `[PROP TYPE ERROR] Component property "${ prop }" is expecting "${ propTypeMap[prop].join(' or ') }" but is assigned "${ helpers.typeOf(p) }" with value:(${ p }) on component "${ comp.$element.attr('data-component-type') }"`;
							}    
						}                                                                                           
					}    
				}
			} 
		});  
	}
	
	function _callComponentLifeCycleCallbacks($componentElement) {
		//if (! $componentElement.data('cm-renderedAready')) {
		if (! helpers.dom.data($componentElement, 'cm-renderedAready')) {
			let comp = $componentElement.cm,
				componentId = comp.$element.getAttribute('data-component-type');
			if (componentId.trim() === '') {
				let errorMsg = 'No data-component-type attribute found on component element.';
				console.trace(errorMsg);
				throw errorMsg;
			}					
			// Call its child components onAfterInitialRender() first //	
			comp.$element.querySelectorAll('[data-component-type]').forEach((elem) => _callComponentLifeCycleCallbacks(elem));					
			// Then call its own onAfterInitialRender() function //
			if (helpers.typeOf(comp.onAfterInitialRender) !== 'undefined') {
				comp.onAfterInitialRender();                        
			} 	  
            // Setup synthetic events for component here //
            comp.processSyntheticEvents(componentId); 
            if (helpers.typeOf(comp.events) !== 'undefined') {
                comp.events();
            }  
			_checkPropTypes(comp);
			helpers.dom.data($componentElement, 'cm-renderedAready', true);
			$componentElement.removeAttribute('data-not-in-dom-yet');
			$componentElement.setAttribute('data-cholo', 'true');
		}        
	}
	
    function _triggerElementInitialRenderMethods(element) {	
		function _traverse(elem) {
			if (elem.getAttribute('data-component-type')) {
				_callComponentLifeCycleCallbacks(elem);
			}
			else {
				element.querySelectorAll('[data-component-type]').forEach((elem) => _callComponentLifeCycleCallbacks(elem));    
			} 		
		}
		if (element.length) {
			element.forEach(_traverse);
		}
		else {
			_traverse(element);
		}		
    }
    
    function html($element, $container) {
		helpers.dom.empty($container);
		helpers.dom.append($container, $element);
        _triggerElementInitialRenderMethods($element);
        return $container;
    }
    
    function append($element, $container) {
        helpers.dom.append($container, $element);
        _triggerElementInitialRenderMethods($element);
        return $container;
    }
    
    function prepend($element, $container) {
		helpers.dom.prepend($container, $element);
        _triggerElementInitialRenderMethods($element);
        return $container;
    }
    
    function replaceWith($oldElement, $element) {
		helpers.dom.replaceWith($oldElement, $element);
        _triggerElementInitialRenderMethods($element);
    }
	
	function after($element, $baseElement) {
        $baseElement.after($element);
        _triggerElementInitialRenderMethods($element);
    }
	
	function before($element, $baseElement) {
        $baseElement.before($element);
        _triggerElementInitialRenderMethods($element);
    }
    
    return { html, append, prepend, replaceWith, after, before };
})();