/*
    Component Module Helper 
    @author: Rafael Gandionco <www.rafaelgandi.tk>
    @version: 2.0 (vanilla js)
    LM: 2019-09-06
*/
import 'ComponentModule/Polyfills';
import comms from 'ComponentModule/comms';  
import helpers from 'ComponentModule/helpers';    
import eventNames from 'ComponentModule/eventNames';    
import 'ComponentModule/runwhen';  
import jsxToDom from '/ComponentModule/jsxToDom';
let _componentSyntheticEventHandlers = {},
    funcKey = '%FUNC_Cholo%';   
// Babel cant support extending es6 native class syntax thats why we are 
// using es5 style class syntax here because this class is meant to be
// extended.
// See: https://github.com/babel/babel/issues/4269 
function ComponentElement() {
    this.context = {};
    this.state = {};     
    this.helpers = helpers;                       
    this.runwhen = runwhen;                       
}
ComponentElement.prototype.setState = function (_name, _value) {
    if (typeof _name === 'object') {
        let calledStateProps = [];
        for (let p in _name) {
            this.state[p] = _name[p];  
            calledStateProps.push(p);
        }
        if (typeof this.onStateChange === 'function') { 
            this.onStateChange(calledStateProps);
        }       
    }
    else {
        this.state[_name] = _value;
        if (typeof this.onStateChange === 'function') {
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
ComponentElement.prototype.getChildComponentElements = function (_moduleId) {
    return this.$element.querySelectorAll(`[data-component-type="${ _moduleId }"]`);
};
ComponentElement.prototype.setContextData = function (_data = {}) {
    this.context = Object.assign(this.context, _data);
    return this;
};
//  LM: 2019-04-25
// Synthetic events //
ComponentElement.prototype.processSyntheticEvents = function (_moduleId) {
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
                        helpers.dom.data($me, `syntheticEventHandler-${ eventType }`,  _componentSyntheticEventHandlers[attrFuncKey]);                     
                        delete _componentSyntheticEventHandlers[attrFuncKey];
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
        this.jsxToDom = jsxToDom;
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
    ixr(_name) {
        let mod = this.moduleId.replace(/\//ig, '_');
        return mod + '8__' + _name + '__8';
    }
    componentStyle(_css) {
        // See: https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
        let style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute('data-from', this.moduleId);    
        if (_css instanceof Array) { _css = _css.join(''); }
        _css = _css.replace(/@ixr\s*\(\s*([^'"\s]+)\s*\)/g, (match, ixrStr) => { // for normal css file use @ixr(<string>)
            return this.ixr(ixrStr.trim());
        });  
        _css = _css.replace(/__ixr\s*\[\s*([^'"\s\]]+)\s*\]/g, (match, ixrStr) => { // for sass files use __ixr[<string>]
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
    async componentStyleFrom(_url, _callback) {
        // See: https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
        let response = await fetch(_url, {
                cache: 'no-cache'
            }),
            css = await response.text();
        this.componentStyle(css);
        _callback && _callback();
        return css;
    }
    getEssentialModules() {
        return { helpers, comms, runwhen, componentHtml: this.tagTemplateHtml, html:  this.tagTemplateHtml };
    }
    elementReplaceWith(_oldElement, _newElement) {
        // See: https://usefulangle.com/post/82/pure-javascript-replace-element
        if (! Element.prototype.replaceWith && typeof _newElement === 'object') { // For old browers
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
                for (let prop in _obj) {
                    if (_obj.hasOwnProperty(prop)) {
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
    _normalizeComponentPropertyTypes(props) {
        for (let p in props) {
            if (props.hasOwnProperty(p)) {
                if (props[p] === 'false') {
                    props[p] = false;
                }
                else if (props[p] === 'true') {
                    props[p] = true;
                }
                else if (/^[0-9\.]+$/.test(props[p])) {
                    props[p] = parseFloat(props[p]);
                }
            }
        }
        return props;
    }
    cholo(tag, props, ...children) {
        if (helpers.typeOf(tag) !== 'string') { 
            const comp = new tag(children, props);            
            if (!! props) {
                if ('context' in props) {
                    comp.context = Object.assign(comp.context, props.context);
                }
                props = this._normalizeComponentPropertyTypes(props);
            }
            comp.props = props;
            comp.children = children;
            comp.$element = comp.render();
            if (!! props && ('ref' in props) && helpers.typeOf(props.ref) === 'function') {
                props.ref(comp.$element);
            }
            comp.$element.cm = comp;
            comp.$element.setAttribute('data-from-jsx', 'true');
            comp.$element.setAttribute('data-not-in-dom-yet', 'true');
            if (! this.isEmptyObject(comp.context)) {
                comp.$element.setAttribute('data-component-hasContext', true);	
            }            
            if (!! props) {
                if (helpers.typeOf(props.classNames) !== 'undefined') {
                    comp.$element.classList.add(props.classNames);
                }
                if (helpers.typeOf(props.className) !== 'undefined') {
                    comp.$element.classList.add(props.className);
                }
            }
            return comp.$element;
        }
        else { // regular html tags will be strings to create the elements
            // fragments to append multiple children to the initial node
            const fragments = document.createDocumentFragment();
            const element = document.createElement(tag);
            children.forEach(function handleAppends(child) {            
                if (child instanceof HTMLElement) { 
                    fragments.appendChild(child);
                } 
                else if (helpers.typeOf(child) === 'string' || helpers.typeOf(child) === 'number'){
                    const textnode = document.createTextNode(child);
                    fragments.appendChild(textnode);
                }
                else if (NodeList.prototype.isPrototypeOf(child)) { // See: https://stackoverflow.com/a/36857902
                    // Convert NodeList to Array 
                    // See: https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
                    child = Array.prototype.slice.call(child);
                    child.forEach(handleAppends);
                }
                else if (child instanceof Array) {
                    child.forEach(handleAppends);
                }
                // For text nodes
                // See: https://stackoverflow.com/questions/24971177/javascript-check-if-child-node-is-element-or-text-node
                // See: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
                else if (typeof child === 'object' && ('nodeType' in child) && child.nodeType === Node.TEXT_NODE) {
                    fragments.appendChild(child);
                }
            });
            element.appendChild(fragments);        
            for (let p in props) {
                // Handle synthetic event properties //
                if (p.indexOf('_on') !== -1) {
                    p.replace(/_on([A-Z][a-zA-Z]+)/igm, (match, eventName) => {
                        element.setAttribute('data-cm-hasEvent', true);
                        element.setAttribute('data-cm-event-parentComp', this.moduleId);
                        let key = funcKey + '_' + Math.random().toString(36).substr(2, 9) + (new Date()).getTime(); 
                        if (helpers.typeOf(props[p]) === 'function') {
                            _componentSyntheticEventHandlers[key] = props[p];
                        }                        
                        element.setAttribute('data-cm-event-' + eventName.toLowerCase(), key);
                    });                
                }
                else {
					if (p === 'defaultChecked') { // Special cases for input checkbox. 
						element.checked = props[p];
					}
					else if (p === 'defaultSelected') { // Special cases for input radio.
						element.selected = props[p];
					}
                    else if (p === 'className') { // If passing className instead of class
						element.className = props[p];
					}
                    else if (p === 'htmlFor') { // If passing htmlFor instead of for on labels
						element.htmlFor = props[p];
					}
                    else if (p === 'ref') { // For the special "ref" property to get a reference to this element
                        if (helpers.typeOf(props[p]) === 'function') {
                            props[p](element);
                        }
                    }
					else {
						// Merge element with attributes
						element.setAttribute(p, props[p]);
					}                   
                }
            }
            return element;
        }
    }   
}
export default ComponentModule;
