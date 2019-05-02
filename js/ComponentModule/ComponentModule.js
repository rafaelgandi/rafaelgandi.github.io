/*
    Component Module Helper 
    @author: Rafael Gandionco <www.rafaelgandi.tk>
    @version: 1.0 (vanilla js)
    LM: 2019-05-02
*/
define(() => {
    "use strict"; 
    require('ComponentModule/Polyfills');  
    const comms = require('ComponentModule/comms');  
    const helpers = require('ComponentModule/helpers');    
    const eventNames = require('ComponentModule/eventNames');    
    require('ComponentModule/runwhen');  
    let _componentHtmlFunctions = {},
        _componentHtmlObj = {},
        funcKey = '%FUNC_Cholo%',
        objKey = '%OBJ_Cholo%';    
    // Babel cant support extending es6 native class syntax thats why we are 
    // using es5 style class syntax here because this class is meant to be
    // extended.
    // See: https://github.com/babel/babel/issues/4269 
    function ComponentElement($componentElem) {
        let that = this;
        this._$compElem = $componentElem;
        this._propsCache = {};
        this.context = {};
        // See: https://ponyfoo.com/articles/es6-proxies-in-depth  
        if (typeof Proxy !== 'undefined') {
            this.props = new Proxy({}, {
                get(target, key) {                                                 
                    return that.getProps(key);    
                },
                set(target, key, value) {
                    console.warn(`Warning! ${ key } is a readonly props value and should not be assigned "${ value }"`);
                    return true;
                }
            });
        }
        this.state = {};     
        this.helpers = helpers;                       
        this.runwhen = runwhen;              
        // LM: 2018-10-09 [ Get any context data passed by parent component ] //
        if (this._$compElem.closest('[data-component-hasContext]')) {
            let $parent = this._$compElem.closest('[data-component-hasContext]');
            this.context = Object.assign(this.context, this.helpers.dom.data($parent, '_componentContextData_'));
        }               
    }
    ComponentElement.prototype.getProps = function (_attr) {   
        let that = this;
        if (typeof this._propsCache[_attr] == 'undefined') {                       
            this._propsCache[_attr] = (() => {
                if (typeof that._$compElem.getAttribute(_attr) !== 'undefined') {
                    let prop = that._$compElem.getAttribute(_attr);
                    if (! prop) {
                        return undefined;
                    }
                    if (prop.toLowerCase().trim() == 'false') { // Check if boolean
                        prop = false;
                    }  
                    else if (prop.toLowerCase().trim() == 'true') { // Check if boolean
                        prop = true;
                    } 
                    else if (prop.indexOf(funcKey) !== -1) { // Check if function
                        if (typeof _componentHtmlFunctions[prop] !== 'undefined') {
                            prop = _componentHtmlFunctions[prop];
                            delete _componentHtmlFunctions[prop];
                        }                        
                    }  
                    else if (prop.indexOf(objKey) !== -1) { // Check if object
                        if (typeof _componentHtmlObj[prop] !== 'undefined') {
                            prop = _componentHtmlObj[prop];
                            delete _componentHtmlObj[prop];
                        }                        
                    }  
                    else if (/^[0-9\.]+$/.test(prop)) { // Check if is a number. See: https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits/1779019
                        return parseFloat(prop);
                    } 
                    return prop;      
                }
                else { 
                    if (_attr == 'classNames') {
                        return '';
                    }                   
                    return undefined;
                }
            })();
        }                                         
        return this._propsCache[_attr];
    };
    ComponentElement.prototype.setState = function (_name, _value) {
        if (typeof _name == 'object') {
            let calledStateProps = [];
            for (let p in _name) {
                this.state[p] = _name[p];  
                calledStateProps.push(p);
            }
            if (typeof this.onStateChange == 'function') { 
                this.onStateChange(calledStateProps);
            }       
        }
        else {
            this.state[_name] = _value;
            if (typeof this.onStateChange == 'function') {
                this.onStateChange([_name]);
            }    
        }
        return this;
    };
    ComponentElement.prototype.isIn = function (_arrayNeedle, _arrayHaystack) {
        if (! (_arrayNeedle instanceof Array)) {
            _arrayNeedle = [_arrayNeedle];
        }
        for (let x = 0, lenX = _arrayNeedle.length; x < lenX; x++) {
            if (_arrayHaystack.indexOf(_arrayNeedle[x]) !== -1) {
                return true;
            }
        }
        return false;
    };
    ComponentElement.prototype.getParentComponentElements = function (_moduleId) {
        return this.$element.closest(`[data-component-type="${ _moduleId }"]`);
    };
    ComponentElement.prototype.getChildComponentElements = function (_moduleId) {
        return this.$element.querySelectorAll(`[data-component-type="${ _moduleId }"]`);
    };
    ComponentElement.prototype.setContextData = function (_data = {}) {
        this.context = Object.assign(this.context, _data);
        return this;
    };
    //  LM: 2019-04-25
    // Synthetic events //
    ComponentElement.prototype._processSyntheticEvents = function (_moduleId) {
        if (this.$element) {
            eventNames.forEach((eventName) => {
                helpers.on(this.$element, eventName, `[data-cm-hasEvent="true"][data-cm-event-parentComp="${ _moduleId }"]`, (e) => {
                    let $me = e.target,
                        eventType = e.type,
                        attrFuncKey,                      
                        eventHandler = helpers.dom.data($me, `syntheticEventHandler-${ eventType }`);                                              
                    if (eventHandler) { return eventHandler(e); }  
                    else {
                        attrFuncKey = $me.getAttribute(`data-cm-event-${ eventType }`);
                        if (!! attrFuncKey) {
                            $me.removeAttribute(`data-cm-event-${ eventType }`);
                            helpers.dom.data($me, `syntheticEventHandler-${ eventType }`,  _componentHtmlFunctions[attrFuncKey]);                     
                            delete _componentHtmlFunctions[attrFuncKey];
                            eventHandler = helpers.dom.data($me, `syntheticEventHandler-${ eventType }`);
                            return eventHandler(e);
                        }         
                    }       
                });
            });
        }            
    };
    // LM: 2018-10-29
    // Store class for sharing data between components. Inspired by Unstated(https://github.com/jamiebuilds/unstated) 
    function Store(_storeName) {
        this.comms = new comms.Channel(_storeName);        
    }
    Store.prototype.onStoreChange = function (_name, _callback) {
        this.comms.listen(_name, _callback);
        return this;
    };
    Store.prototype.setStore = function (_name, _value, _extraData = null, _emit = true) {
        this.store = { name: _name, value: _value };
        if (_emit) {
            this.comms.say(_name, {
                value: _value,
                extraData: _extraData
            });
        }              
        return this;
    };
    class ComponentModule { 
        constructor(_moduleId) { 
            this.moduleId = _moduleId.trim(); 
            this.ComponentElement = ComponentElement; 
            this.Store = Store; 
            this.$head = document.head || document.getElementsByTagName('head')[0];
        }
        tagTemplateHtml(_strings, ..._values) {
            // See: http://wesbos.com/tagged-template-literals/
			let str = '';
			_strings.forEach((_strings, i) => {
			   str += _strings + (_values[i] || '');
			});
			return str;
        }
        componentHtml(_strings, ..._values) {
            // See: http://wesbos.com/tagged-template-literals/
			let str = '';
            _strings.forEach((string, i) => {
                if (typeof _values[i] == 'function') {
                    let key = funcKey + '_' + Math.random().toString(36).substr(2, 9) + (new Date()).getTime(); 
                    _componentHtmlFunctions[key] = _values[i];
                    _values[i] = key;                    
                }
                else if (typeof _values[i] == 'object') {
                    let key = objKey + '_' + Math.random().toString(36).substr(2, 9) + (new Date()).getTime(); 
                    _componentHtmlObj[key] = _values[i];                
                    _values[i] = key;
                }
                else if (typeof _values[i] == 'boolean') {
                    _values[i] = _values[i].toString();
                }
                // Make sure to convert into string on printing out to the browser //
                try {
                    _values[i] = _values[i].toString();
                } catch (err) {}
                str += string + (_values[i] || '');            
            });
            // Handle synthetic events //
            str = str.replace(/_on([A-Z][a-zA-Z]+)=/igm, (match, eventName) => {
                return `data-cm-hasEvent="true" data-cm-event-parentComp="${ this.moduleId }" data-cm-event-${ eventName.toLowerCase() }=`;
            });
			return str;
        }
        ixr(_name) {
            var mod = this.moduleId.replace(/\//ig, '_');
			return mod + '8__' + _name + '__8';
        }
        componentStyle(_css) {
            // See: https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
			let style = document.createElement('style');
            style.type = 'text/css';
            style.setAttribute('data-from', this.moduleId);    
            if (_css instanceof Array) { _css = _css.join(''); }
            _css = _css.replace(/@ixr\s*\(\s*([^'"\s]+)\s*\)/g, (match, ixrStr) => {
                return this.ixr(ixrStr.trim());
            });    
            _css = _css
            .replace(/<style>/ig, '')
            .replace(/<\/style>/ig, '')  
            .replace(/\s+/ig, ' ');  
            if (style.styleSheet){
                // This is required for IE8 and below.
                style.styleSheet.cssText = _css;
            } 
            else {
                style.appendChild(document.createTextNode(_css));
            }    
            this.$head.appendChild(style);
            return this;
		}
        parentSelector(_parentSelector, _childrenCss = '') {            
            return _childrenCss.replace(/__PARENT__/ig, _parentSelector);
        }
        declareCommEvents(_events = []) {
            return this;
        }
        getEssentialModules() {
            const that = this;
            return { helpers, comms, runwhen, componentHtml: that.componentHtml };
        }
        iterateComponentTag(_callback) {
            let $components = document.querySelectorAll(`Component-x[type="${ this.moduleId }"]`);
            if (! $components.length) { return; } 
            $components.forEach((elem) => {
                // LM: 2017-10-19
                // We only render top level(parent) components, its up to the component 
                // themselves to manually render any child components. 
                let $closest = elem.closest('Component-x');
                if (! $closest || $closest === elem) {
                    _callback(elem);
                }	
            });
        }
        elementReplaceWith(_oldElement, _newElement) {
            // See: https://usefulangle.com/post/82/pure-javascript-replace-element
            if (! Element.prototype.replaceWith && typeof _newElement == 'object') { // For old browers
                let parent = _oldElement.parentNode;
                parent.replaceChild(_newElement, _oldElement);
            }
            else {
                _oldElement.replaceWith(_newElement);
            }            
        }
        isEmptyObject(_obj) {
            // See: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            try {
                return Object.entries(_obj).length === 0 && _obj.constructor === Object;
            }
            catch (err) {
                try {
                    return Object.keys(_obj).length === 0 && _obj.constructor === Object;
                } catch (err2) {
                    for(var prop in _obj) {
                        if(_obj.hasOwnProperty(prop)) {
                            return false;
                        }                            
                    }
                    return JSON.stringify(_obj) === JSON.stringify({});
                }            
            }
        }
        getComponentElements(_context = null) {
            _context = _context || document.getElementsByTagName('body')[0];
            return _context.querySelectorAll(`[data-component-type="${ this.moduleId }"]`);
        }
        createComponent(_componentClass, _containerElementTag) {
            let _doCreation = () => {
                let $containerElement = null;
                this.iterateComponentTag(($tag) => {
                    let comp = new _componentClass($tag),
                        markUp = '';                       
                    $containerElement = document.createElement(_containerElementTag);             
                    if (typeof comp.render !== 'undefined') {  // Check if render() function is available                     
                        markUp = comp.render($containerElement, true);       
                    }                      
                    $containerElement.innerHTML = markUp;
                    $containerElement.setAttribute('data-component-type', $tag.getAttribute('type'));
                    // LM: 2018-10-09 [ Set any context data found ]
                    if (! this.isEmptyObject(comp.context)) {                        
                        helpers.dom.data($containerElement, '_componentContextData_', comp.context);
                        $containerElement.setAttribute('data-component-hasContext', true);
                    }         
                    this.elementReplaceWith($tag, $containerElement);                 
                    comp.$element = $containerElement;
                    if (typeof comp.onAfterInitialRender !== 'undefined') {
                        comp.onAfterInitialRender($containerElement);                        
                    } 
                    $containerElement.cm = comp;
                    // See: https://stackoverflow.com/questions/1988514/javascript-css-how-to-add-and-remove-multiple-css-classes-to-an-element                                        
                    if (comp.getProps('classNames')) {
                        comp.$element.classList.add(...comp.getProps('classNames').trim().split(/\s+/));
                    }
                    // Setup synthetic events for component here //
                    comp._processSyntheticEvents(this.moduleId); 
                    if (typeof comp.events !== 'undefined') {
                        comp.events();
                    }
                    // LM: 2019-01-16 [Type checking added to component properties]
                    // NOTE: Type checking is done last and is inside a rAF function to make it async and more performant.
                    requestAnimationFrame(() => {
                        if (helpers.typeOf(comp.propTypes) == 'function') {
                            let propTypeMap = comp.propTypes();
                            for (let prop in propTypeMap) {
                                let p = comp.getProps(prop);
                                if (helpers.typeOf(p) !== 'undefined') {
                                    if (helpers.typeOf(propTypeMap[prop]) !== 'array') {
                                        propTypeMap[prop] = [propTypeMap[prop]];
                                    }
                                    if (propTypeMap[prop].indexOf(helpers.typeOf(p)) == -1) {
                                        throw `[PROP TYPE ERROR] Component property "${ prop }" is expecting "${ propTypeMap[prop].join(' or ') }" but is assigned "${ helpers.typeOf(p) }" on component "${ this.moduleId }"`;
                                    }                                
                                }    
                            }
                        }
                    });                   
                });
            }
            _doCreation();
            return {
                getComponentElements: (_context = null) => this.getComponentElements(_context),
                getModuleId: () => this.moduleId,
                renderAllComponents: (_context = null) => {
                    _doCreation();
                    let $elements = this.getComponentElements(_context);
                    return ($elements.length === 1) ? $elements[0] : $elements;
                }
            }; 
        }    
    }
    return ComponentModule;
});