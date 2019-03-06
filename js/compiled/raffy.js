;requirejs.config({baseUrl:"/js",waitSeconds:200});define("index",require=>{"use strict";const LayoutComponent=require("raffy/LayoutComponent");document.addEventListener("DOMContentLoaded",()=>{LayoutComponent.renderAllComponents()})});;;define("raffy/LayoutComponent",require=>{"use strict";const{cm,componentHtml,$,ixr,helpers,typeOf}=require("ComponentModule/cm")(require("module").id);const HeaderComponent=require("raffy/HeaderComponent");const ListComponent=require("raffy/ListComponent");const EmailLinkComponent=require("raffy/EmailLinkComponent");const simpleRouter=require("raffy/simpleRouter");const projectItems=require("raffy/projects");const openSourceProjects=require("raffy/openSourceProjects");const weapons=require("raffy/weapons");const constants=require("raffy/constants");class LayoutComponent extends cm.ComponentElement{constructor(c){super(c);this.state={uriIdChange:null};this.currentUri=parent!==window?document.referrer:document.location;this.$body=document.getElementsByTagName("body")[0];this.setContextData({constants:constants})}render(){return componentHtml`
    		<Component-x type="raffy/HeaderComponent"></Component-x>            
            <section id="raffy-page-home" class="raffy-page-sections">
    			<p>
    				Hi, I'm Rafael Gandionco. A web developer and photographer from the 🌴Philippines. 
                </p>
                <p>    
                    I've been doing web development stuff professionally for more than 10 years now. 
                    I mainly specialize on web application development using Javascript (jQuery, Node.js, etc...), 
                    PHP (Laravel, Codeigniter, etc...), HTML 5 and other cool open web technologies.	
                </p> 
                <p>   
                    📷 I'm also an amature photographer. I mainly take images as a hobby. You can check out 
                    links to my work here. Or you can follow me on Instagram. 
                </p>  
                <p>  
                    I'm a big Pixar fan and hmmm... what else.. Oh yeah, I like eating french fries. French fries 
                    are awesome. 
    			</p>
    		</section>
    		<section id="raffy-page-projects" class="raffy-page-sections">
                <div class="raffy-text  text-center"><h1>Tools I use for web development.</h1></div>      
    			<Component-x type="raffy/ListComponent" items="${weapons}"></Component-x>
    			<div class="raffy-text text-center"><h1>Some of my personal open source projects on <a href="${this.context.constants.uri.github}" target="_blank">github.</a></h1></div>
                <Component-x type="raffy/ListComponent" items="${openSourceProjects}"></Component-x>
    			<div class="raffy-text  text-center"><h1>A few client projects I was a part of building.</h1></div>            
    			<Component-x type="raffy/ListComponent" items="${projectItems}"></Component-x>
    		</section>
    		<section id="raffy-page-contact" class="raffy-page-sections">
    			<Component-x type="raffy/EmailLinkComponent"></Component-x>
    			<div id="raffy-contact-links">
    				<a href="${this.context.constants.uri.instagram}" target="_blank">Instagram</a>
    				<a href="${this.context.constants.uri.facebook}" target="_blank">Facebook</a>
    				<a href="${this.context.constants.uri.linkedin}" target="_blank">LinkedIn</a>
    				<a href="${this.context.constants.uri.zerothreetwo}" target="_blank">032</a>
    				<a href="${this.context.constants.uri.medium}" target="_blank">Medium</a>
    				<a href="${this.context.constants.uri.flickr}" target="_blank">Flickr</a>
    				<a href="${this.context.constants.uri.fiveHundredPx}" target="_blank">500px</a>
    				<a href="${this.context.constants.uri.eyeem}" target="_blank">EyeEm</a>
    				<a href="${this.context.constants.uri.github}" target="_blank">Github</a>
    			</div>
    		</section>`}onAfterInitialRender(){if(this._isInsideFrame()&&this._isMobile()){window.top.location.href=this.context.constants.uri.myGithubPageUri}this.$element.id="raffy-wrapper";this.$HeaderComponent=HeaderComponent.renderAllComponents(this.$element);ListComponent.renderAllComponents(this.$element);EmailLinkComponent.renderAllComponents(this.$element);this.$pagesContainers=this.$element.querySelectorAll(".raffy-page-sections");this.$body.classList.add("raffy-opacity-1")}onStateChange(_stateName){if(this.isIn("uriIdChange",_stateName)){this._hideAllPages();let $pageCon=document.getElementById(this.state.uriIdChange);$pageCon.classList.add("raffy-show-page");setTimeout(()=>{$pageCon.classList.add("raffy-opacity-1")},50);this.$HeaderComponent.cm.setLinkAsActive(this.state.uriIdChange)}}_hideAllPages(){this.$pagesContainers.forEach(function(elem){elem.classList.remove("raffy-show-page","raffy-opacity-1")});this.$body.scrollTop=0}_isInsideFrame(){try{return window.self!==window.top}catch(e){return true}}_isMobile(){return typeof window.orientation!=="undefined"}_setInitialPage(){if(typeOf(this.currentUri)==="string"){if(this.currentUri.indexOf(this.context.constants.projects)!==-1){simpleRouter.navigate(this.context.constants.projects);return}else if(this.currentUri.indexOf(this.context.constants.contact)!==-1){simpleRouter.navigate(this.context.constants.contact);return}else if(this.currentUri.indexOf(this.context.constants.blog)!==-1){window.top.location.href=this.context.constants.uri.medium;return}else if(this.currentUri.indexOf(this.context.constants.photography)!==-1){window.top.location.href=this.context.constants.uri.googlePhotosPage;return}else{simpleRouter.navigate(this.context.constants.home)}}simpleRouter.navigate(window.location.pathname)}events(){simpleRouter.route(this.context.constants.home,_data=>this.setState("uriIdChange","raffy-page-home")).route(this.context.constants.projects,_data=>this.setState("uriIdChange","raffy-page-projects")).route(this.context.constants.contact,_data=>this.setState("uriIdChange","raffy-page-contact"));this._setInitialPage();helpers.on(document.getElementById("raffy-main-navigation"),"click","a[rel]",function(e){e.preventDefault();simpleRouter.navigate(e.target.rel);return false})}}return cm.createComponent(LayoutComponent,"div")});;;define("ComponentModule/cm",require=>{"use strict";const ComponentModule=require("ComponentModule/ComponentModule");return function(_modId){let _cm=new ComponentModule(_modId),essentials=_cm.getEssentialModules();return{cm:_cm,globals:essentials.globals,helpers:essentials.helpers,comms:essentials.comms,runwhen:essentials.runwhen,componentHtml:essentials.componentHtml,ixr:_val=>_cm.ixr(_val),pint:essentials.helpers.pint,typeOf:essentials.helpers.typeOf}}});;;define("ComponentModule/ComponentModule",require=>{"use strict";require("ComponentModule/Polyfills");const comms=require("ComponentModule/comms");const helpers=require("ComponentModule/helpers");require("ComponentModule/runwhen");let _componentHtmlFunctions={},_componentHtmlObj={},funcKey="%FUNC%",objKey="%OBJ%";function ComponentElement($componentElem){let that=this;this._$compElem=$componentElem;this._propsCache={};this.context={};if(typeof Proxy!=="undefined"){this.props=new Proxy({},{get(target,key){return that.getProps(key)},set(target,key,value){console.warn(`Warning! ${key} is a readonly props value and should not be assigned "${value}"`);return true}})}this.state={};this.helpers=helpers;this.runwhen=runwhen;if(this._$compElem.closest("[data-component-hasContext]")){let $parent=this._$compElem.closest("[data-component-hasContext]");this.context=Object.assign(this.context,this.helpers.dom.data($parent,"_componentContextData_"))}}ComponentElement.prototype.getProps=function(_attr){let that=this;if(typeof this._propsCache[_attr]=="undefined"){this._propsCache[_attr]=(()=>{if(typeof that._$compElem.getAttribute(_attr)!=="undefined"){let prop=that._$compElem.getAttribute(_attr);if(!prop){return undefined}if(prop.toLowerCase().trim()=="false"){prop=false}else if(prop.toLowerCase().trim()=="true"){prop=true}else if(prop.indexOf(funcKey)!==-1){if(typeof _componentHtmlFunctions[prop]!=="undefined"){prop=_componentHtmlFunctions[prop];delete _componentHtmlFunctions[prop]}}else if(prop.indexOf(objKey)!==-1){if(typeof _componentHtmlObj[prop]!=="undefined"){prop=_componentHtmlObj[prop];delete _componentHtmlObj[prop]}}else if(/^[0-9\.]+$/.test(prop)){return parseFloat(prop)}return prop}else{if(_attr=="classNames"){return""}return undefined}})()}return this._propsCache[_attr]};ComponentElement.prototype.setState=function(_name,_value){if(typeof _name=="object"){let calledStateProps=[];for(let p in _name){this.state[p]=_name[p];calledStateProps.push(p)}if(typeof this.onStateChange=="function"){this.onStateChange(calledStateProps)}}else{this.state[_name]=_value;if(typeof this.onStateChange=="function"){this.onStateChange([_name])}}return this};ComponentElement.prototype.isIn=function(_arrayNeedle,_arrayHaystack){if(!(_arrayNeedle instanceof Array)){_arrayNeedle=[_arrayNeedle]}for(let x=0,lenX=_arrayNeedle.length;x<lenX;x++){if(_arrayHaystack.indexOf(_arrayNeedle[x])!==-1){return true}}return false};ComponentElement.prototype.getParentComponentElements=function(_moduleId){return this.$element.closest(`[data-component-type="${_moduleId}"]`)};ComponentElement.prototype.getChildComponentElements=function(_moduleId){return this.$element.querySelectorAll(`[data-component-type="${_moduleId}"]`)};ComponentElement.prototype.setContextData=function(_data={}){this.context=Object.assign(this.context,_data);return this};function Store(_storeName){this.comms=new comms.Channel(_storeName)}Store.prototype.onStoreChange=function(_name,_callback){this.comms.listen(_name,_callback);return this};Store.prototype.setStore=function(_name,_value,_extraData=null,_emit=true){this.store={name:_name,value:_value};if(_emit){this.comms.say(_name,{value:_value,extraData:_extraData})}return this};class ComponentModule{constructor(_moduleId){this.moduleId=_moduleId.trim();this.ComponentElement=ComponentElement;this.Store=Store;this.$head=document.head||document.getElementsByTagName("head")[0]}tagTemplateHtml(_strings,..._values){let str="";_strings.forEach((_strings,i)=>{str+=_strings+(_values[i]||"")});return str}componentHtml(_strings,..._values){let str="";_strings.forEach((string,i)=>{if(typeof _values[i]=="function"){let key=funcKey+"_"+Math.random().toString(36).substr(2,9)+new Date().getTime();_componentHtmlFunctions[key]=_values[i];_values[i]=key}else if(typeof _values[i]=="object"){let key=objKey+"_"+Math.random().toString(36).substr(2,9)+new Date().getTime();_componentHtmlObj[key]=_values[i];_values[i]=key}else if(typeof _values[i]=="boolean"){_values[i]=_values[i].toString()}str+=string+(_values[i]||"")});return str}ixr(_name){var mod=this.moduleId.replace(/\//ig,"_");return mod+"8__"+_name+"__8"}componentStyle(_css){let style=document.createElement("style");style.type="text/css";style.setAttribute("data-from",this.moduleId);if(_css instanceof Array){_css=_css.join("")}_css=_css.replace(/@ixr\s*\(\s*([^'"\s]+)\s*\)/g,(match,ixrStr)=>{return this.ixr(ixrStr.trim())});_css=_css.replace(/<style>/ig,"").replace(/<\/style>/ig,"");if(style.styleSheet){style.styleSheet.cssText=_css}else{style.appendChild(document.createTextNode(_css))}this.$head.appendChild(style);return this}parentSelector(_parentSelector,_childrenCss=""){return _childrenCss.replace(/__PARENT__/ig,_parentSelector)}declareCommEvents(_events=[]){return this}getEssentialModules(){const that=this;return{helpers,comms,runwhen,componentHtml:that.componentHtml}}iterateComponentTag(_callback){let $components=document.querySelectorAll(`Component-x[type="${this.moduleId}"]`);if(!$components.length){return}$components.forEach(elem=>{let $closest=elem.closest("Component-x");if(!$closest||$closest===elem){_callback(elem)}})}elementReplaceWith(_oldElement,_newElement){if(!Element.prototype.replaceWith&&typeof _newElement=="object"){let parent=_oldElement.parentNode;parent.replaceChild(_newElement,_oldElement)}else{_oldElement.replaceWith(_newElement)}}isEmptyObject(_obj){try{return Object.entries(_obj).length===0&&_obj.constructor===Object}catch(err){try{return Object.keys(_obj).length===0&&_obj.constructor===Object}catch(err2){for(var prop in _obj){if(_obj.hasOwnProperty(prop)){return false}}return JSON.stringify(_obj)===JSON.stringify({})}}}getComponentElements(_context=null){_context=_context||document.getElementsByTagName("body")[0];return _context.querySelectorAll(`[data-component-type="${this.moduleId}"]`)}createComponent(_componentClass,_containerElementTag=null){let _doCreation=()=>{let $containerElement=null;this.iterateComponentTag($tag=>{let comp=new _componentClass($tag),markUp="";$containerElement=document.createElement(_containerElementTag);if(typeof comp.render!=="undefined"){try{markUp=comp.render($containerElement,true)}catch(err){markUp=comp.render(null,true)}}$containerElement.innerHTML=markUp;$containerElement.setAttribute("data-component-type",$tag.getAttribute("type"));if(!this.isEmptyObject(comp.context)){helpers.dom.data($containerElement,"_componentContextData_",comp.context);$containerElement.setAttribute("data-component-hasContext",true)}this.elementReplaceWith($tag,$containerElement);comp.$element=$containerElement;if(typeof comp.onAfterInitialRender!=="undefined"){comp.onAfterInitialRender($containerElement)}if(typeof comp.onAfterRender!=="undefined"){comp.onAfterRender($containerElement)}if($containerElement){$containerElement.cm=comp;if(comp.getProps("classNames")){comp.$element.classList.add(...comp.getProps("classNames").trim().split(/\s+/))}}if(typeof comp.events!=="undefined"){comp.events()}requestAnimationFrame(()=>{if(helpers.typeOf(comp.propTypes)=="function"){let propTypeMap=comp.propTypes();for(let prop in propTypeMap){let p=comp.getProps(prop);if(helpers.typeOf(p)!=="undefined"){if(helpers.typeOf(propTypeMap[prop])!=="array"){propTypeMap[prop]=[propTypeMap[prop]]}if(propTypeMap[prop].indexOf(helpers.typeOf(p))==-1){throw`[PROP TYPE ERROR] Component property "${prop}" is expecting "${propTypeMap[prop].join(" or ")}" but is assigned "${helpers.typeOf(p)}" on component "${this.moduleId}"`}}}}})})};_doCreation();return{getComponentElements:(_context=null)=>this.getComponentElements(_context),getModuleId:()=>this.moduleId,renderAllComponents:(_context=null)=>{_doCreation();let $elements=this.getComponentElements(_context);return $elements.length===1?$elements[0]:$elements}}}}return ComponentModule});;;;!function(e){var t=e.Element.prototype;"function"!=typeof t.matches&&(t.matches=t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),o=0;t[o]&&t[o]!==this;)++o;return Boolean(t[o])}),"function"!=typeof t.closest&&(t.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window);if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=Array.prototype.forEach}if(typeof Object.assign!="function"){Object.defineProperty(Object,"assign",{value:function assign(target,varArgs){"use strict";if(target==null)throw new TypeError("Cannot convert undefined or null to object");var to=Object(target);for(var index=1;index<arguments.length;index++){var nextSource=arguments[index];if(nextSource!=null)for(var nextKey in nextSource)Object.prototype.hasOwnProperty.call(nextSource,nextKey)&&(to[nextKey]=nextSource[nextKey])}return to},writable:!0,configurable:!0})};;define("ComponentModule/comms",require=>{"use strict";require("ComponentModule/pubsub.min");var calledOnceEvents={},eventData={},loopChecker=(()=>{const MAX_CALLS=10000;var check={};return _event=>{if(typeof check[_event]==="undefined"){check[_event]=0}check[_event]++;if(check[_event]>MAX_CALLS){throw"Comms Error: Possible infinite loop from event \""+_event+"\""}}})(),rememberEvent=(_event,_data)=>{if(!(_event in calledOnceEvents)){calledOnceEvents[_event]=typeof _data!=="undefined"?_data:null}};function _Channel(_channelName){this.channel=_channelName.trim()}function _normalzeEventName(_event){return this.channel+"->"+_event}_Channel.prototype.say=function(_event,_data){let eventName=_normalzeEventName.call(this,_event);loopChecker(eventName);PubSub.publish(eventName,_data);return this};_Channel.prototype.listen=function(_event,_callback){var that=this;if(!(_event instanceof Array)){_event=[_event]}_event.forEach(e=>{let eventName=_normalzeEventName.call(that,e);if(eventName in calledOnceEvents){_callback(calledOnceEvents[eventName]);return true}PubSub.subscribe(eventName,_callback)});return this};_Channel.prototype.listenOnce=function(_event,_callback){var that=this;if(!(_event instanceof Array)){_event=[_event]}_event.forEach(e=>{let eventName=_normalzeEventName.call(that,e);let handle=PubSub.subscribe(eventName,_data=>{_callback(_data);PubSub.unsubscribe(handle)})});return this};_Channel.prototype.sayOnce=function(_event,_data){let eventName=_normalzeEventName.call(this,_event);loopChecker(eventName);rememberEvent(eventName);PubSub.publish(eventName,_data);return this};_Channel.prototype.get=function(_event){let eventName=_normalzeEventName.call(this,_event);return eventData[eventName]()};_Channel.prototype.send=function(_event,_callback){let eventName=_normalzeEventName.call(this,_event);eventData[eventName]=_callback;return this};var comms={on:(_event,_callback)=>{_callback=_callback||function(){};PubSub.subscribe(_event,_callback)},trigger:(_event,_data)=>{PubSub.publish(_event,_data)},say:(_event,_data)=>{loopChecker(_event);comms.trigger(_event,_data)},listen:(_event,_callback)=>{if(!(_event instanceof Array)){_event=[_event]}_event.forEach(function(e){if(e in calledOnceEvents){_callback();return true}comms.on(e,_callback)})},sayOnce:(_event,_data)=>{loopChecker(_event);rememberEvent(_event,_data);comms.trigger(_event,_data)},Channel:_Channel};return comms});;;;(function(a){function b(){var b={},c=Function;return{publish:function(){var c=arguments,d=b[c[0]],e,f,g;if(d){e=d.length,f=c.length>1?Array.prototype.splice.call(c,1):[];for(g=0;g<e;g+=1)d[g].apply(a,f);d=a=f=null}},subscribe:function(a,d){if(typeof a!="string")throw"invalid or missing channel";if(d instanceof c)return b[a]||(b[a]=[]),b[a].push(d),{channel:a,callback:d};throw"invalid or missing callback"},unsubscribe:function(a,d){a.channel&&a.callback&&(d=a.callback,a=a.channel);if(typeof a!="string")throw"invalid or missing channel";if(!(d instanceof c))throw"invalid or missing callback";var e=b[a],f,g=e instanceof Array?e.length:0;for(f=0;f<g;f+=1)if(e[f]===d){e.splice(f,1);break}}}}"use strict",typeof define=="function"&&define.amd?define("ComponentModule/pubsub.min","pubsub",b):typeof module=="object"&&module.exports?module.exports=b():a.PubSub=b()})(window);;;define("ComponentModule/helpers",require=>{"use strict";let weakMap=new WeakMap;return{Image:{isValid:function(_filename){var imgExt="png,jpg,jpeg,gif".split(","),ext=_filename.trim().toLowerCase().split(".").pop();if($.inArray(ext,imgExt)===-1){return false}return true}},pint:function(_str){var num=parseInt(_str,10);if(isNaN(num)){return 0}return num},isEmail:function(_email){var emailRegExp=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,e=$.trim(_email);if(e.length>50){return false}return!!emailRegExp.test(e)},isNumeric:function(_num){var n=_num;return!isNaN(parseFloat(n))&&isFinite(n)},sc:function(){var elems={};return function(_selector){if(!elems[_selector]){elems[_selector]=$(_selector)}return elems[_selector]}}(),unescapeUnicode:function(_str){var r=/\\u([\d\w]{4})/gi;_str=(_str+"").replace(r,function(match,grp){return String.fromCharCode(parseInt(grp,16))});_str=unescape(_str);return _str},dom:{append:(_element,_appendThis)=>{return _element.appendChild(_appendThis)},prepend:(_element,_prependThis)=>{return _element.insertBefore(_prependThis,_element.firstChild)},data:(_element,_key,_value=null)=>{if(!weakMap.get(_element)){weakMap.set(_element,{})}let data=weakMap.get(_element);if(_value){data[_key]=_value;weakMap.set(_element,data);return _element}else{return data[_key]}}},css:function(_src,_callback){let $head=document.getElementsByTagName("head")[0],$link=document.createElement("link");$link.rel="stylesheet";$link.type="text/css";$link.href=_src+"?"+new Date().getTime();this.dom[_callback===true?"prepend":"append"]($head,$link);var img=document.createElement("img");img.onerror=function(){if(typeof _callback=="function"){_callback()}};img.src=_src},tpl:function(s,d){for(var p in d){s=s.replace(new RegExp("{"+p+"}","g"),d[p])}return s},log:function(_msg){console.log(_msg)},removeFromArray:function(_arr,_item){var index=_arr.indexOf(_item);if(index===-1){return _arr}_arr.splice(index,1);return _arr},uniqueOnly:function(_arr){return _arr.filter(function(value,index,self){return self.indexOf(value)===index})},kcode:{arrowUp:38,arrowDown:40,enter:13,esc:27},isjQueryElem:_elem=>{return typeof _elem.attr!=="undefined"},isJson:function(_str){try{JSON.parse(_str);return true}catch(e){return false}},iterateComponentTag:function(moduleId,_callback){var type=moduleId.replace(/\//ig,"-");document.querySelectorAll(`Component[type="${type}"]`).forEach(elem=>{_callback(elem)})},tagTemplateHtml:function(_strings,..._values){let str="";_strings.forEach((_strings,i)=>{str+=_strings+(_values[i]||"")});return str},ixr:function(_modId,_name){var mod=_modId.replace(/\//ig,"_");return mod+"8__"+_name+"__8"},typeOf:function(_variable){return Object.prototype.toString.call(_variable).slice(8,-1).toLowerCase()},on:function(_element,_eventName,_selector,_callback=()=>{}){let that=this;_callback=this.typeOf(_selector)==="function"?_selector:_callback;_element.addEventListener(_eventName,function(e){if(that.typeOf(_selector)==="string"){if(e.target.matches(_selector)){_callback.call(e.target,e)}}else{_callback.call(this,e)}});return this}}});;;var runwhen=function(self){"use strict";var cachedChecks={},TIMEOUT=800,check=function(_checks){var i=_checks.length;while(i--){if(!!cachedChecks[_checks[i]]){continue}try{eval("if(typeof "+_checks[i]+" === 'undefined'){throw 'e';}");cachedChecks[_checks[i]]=!0}catch(e){return!1}}return!0};return function(_checks,_run,_suppressTimeoutError){var CHECK_DURATION=1,IS_FUNCTION_PASSED=typeof _checks==="function";if(!IS_FUNCTION_PASSED){if(!(_checks instanceof Array)){_checks=[_checks]}}(function loop(){var checking=!IS_FUNCTION_PASSED?check(_checks):_checks.call(self);if(checking){_run.call(self)}else{if(CHECK_DURATION>TIMEOUT){if(!_suppressTimeoutError){throw"RunWhen timeout reached"}return}CHECK_DURATION++;self.setTimeout(loop,10)}})()}}(self);;;define("raffy/HeaderComponent",require=>{"use strict";const{cm,componentHtml,$,ixr,helpers}=require("ComponentModule/cm")(require("module").id);class HeaderComponent extends cm.ComponentElement{constructor(c){super(c);this.state={}}render(){return componentHtml`
            <header id="raffy-main-navigation-mobile">
    			<div>
    				<a href="#" id="raffy-mobile-menu-trigger">Menu</a>
    				<a href="${this.context.constants.home}" id="raffy-profile-img-mobile">
                        <img src="images/profile_me.jpg">
                    </a>				
    			</div>			
    		</header>
    		<header id="raffy-main-navigation">
    			<a href="${this.context.constants.home}" id="raffy-profile-img" title="@rafaelgandi">
                    <img src="images/profile_me.jpg" alt="rafael gadionco">
                </a>
    			<nav>
    				<ul>
    					<li><a href="${this.context.constants.home}" rel="${this.context.constants.home}" data-page-container-id="raffy-page-home">Me</a></li>
    					<li><a href="${this.context.constants.uri.medium}" target="_top">Blog</a></li>
    					<li><a href="${this.context.constants.uri.googlePhotosPage}" target="_blank">Photography</a></li>
    					<li><a href="${this.context.constants.projects}" rel="${this.context.constants.projects}" data-page-container-id="raffy-page-projects">Web Developer Projects</a></li>
    					<li><a href="${this.context.constants.contact}" rel="${this.context.constants.contact}" data-page-container-id="raffy-page-contact">Contact</a></li>
    				</ul>
    				<div class="clr"></div>
    			</nav>
    			<div class="clr"></div>
    		</header>`}onAfterInitialRender(){this.$mainNavigationHeader=this.$element.querySelector("#raffy-main-navigation")}clearActiveLink(){this.$mainNavigationHeader.querySelectorAll("a[rel]").forEach($a=>{$a.classList.remove("raffy-active-page-link")})}setLinkAsActive(_id){this.clearActiveLink();this.$mainNavigationHeader.querySelector(`a[data-page-container-id="${_id}"]`).classList.add("raffy-active-page-link")}events(){helpers.on(this.$element,"click","#raffy-mobile-menu-trigger",e=>{e.preventDefault();this.$mainNavigationHeader.classList.toggle("raff-show-mobile-nav");return false}).on(this.$element,"click","#raffy-main-navigation a[rel]",e=>{this.$mainNavigationHeader.classList.remove("raff-show-mobile-nav")})}}return cm.createComponent(HeaderComponent,"div")});;;define("raffy/ListComponent",require=>{"use strict";const{cm,componentHtml,$,ixr,helpers,typeOf}=require("ComponentModule/cm")(require("module").id);const ImageLoadingComponent=require("raffy/ImageLoadingComponent");class ListComponent extends cm.ComponentElement{constructor(c){super(c);this.state={}}render(){return componentHtml`
            <ul class="raffy-list">
            ${this.getProps("items").map(item=>componentHtml`
                <li>
                    <a href="${item.link}" class="raffy-list-image-link" target="_blank">
                        <Component-x 
                        type="raffy/ImageLoadingComponent" 
                        containerClass="raffy-list-img-con" 
                        src="${item.image}"></Component-x>
                        
                        <div class="raffy-list-desc">
                            ${typeOf(item.desc)==="undefined"?item.header:item.desc}
                        </div>
                    </a>
                </li>
            `).join("")}                    
            </ul>
            <div class="clr"></div>`}onAfterInitialRender(){this.$element.classList.add("raffy-list-wrapper");ImageLoadingComponent.renderAllComponents(this.$element)}}return cm.createComponent(ListComponent,"div")});;;define("raffy/ImageLoadingComponent",require=>{"use strict";const{cm,componentHtml,$,ixr,helpers}=require("ComponentModule/cm")(require("module").id);cm.componentStyle(componentHtml`
        <style>
            .@ixr(img) {
                transition: opacity 1s ease-in-out;
            }
            .@ixr(hide) {
                opacity: 0;
            }
            .@ixr(container) {                
                box-sizing: border-box;
            }
            .@ixr(pulsate) {
                /* See: https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html */
                animation-duration: 1s;
                animation-fill-mode: forwards;
                animation-iteration-count: infinite;
                animation-name: pulse;
                animation-timing-function: linear;
                background: #f6f7f8;
                background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
                background-size: 800px 104px;
            }
            @keyframes pulse {
                0%{
                    background-position: -468px 0
                }
                100%{
                    background-position: 468px 0
                }
            }            
        </style>
    `);class ImageLoadingComponent extends cm.ComponentElement{constructor(c){super(c);let that=this;this.state={}}render(){return componentHtml`<img src="about:blank" alt="${this.getProps("alt")||""}" class="${this.getProps("classNames")||""} ${cm.ixr("hide")} ${cm.ixr("img")}">`}onAfterInitialRender(){let that=this;this.$element.classList.add(ixr("container"),ixr("pulsate"));this.getProps("containerClass")&&this.$element.classList.add(this.getProps("containerClass"));this.$img=this.$element.querySelector("img");this.$img.setAttribute("src",this.getProps("src"));this.$img.addEventListener("load",()=>{this.$img.classList.remove(cm.ixr("hide"));this.$element.classList.remove(cm.ixr("pulsate"))})}calculateAspectRatioFit(srcWidth,srcHeight,maxWidth,maxHeight){var ratio=Math.min(maxWidth/srcWidth,maxHeight/srcHeight);return{width:srcWidth*ratio,height:srcHeight*ratio}}updateSrc(_src,_aspectRatioOptions={}){this.$img.setAttribute("src",_src);if(!!_aspectRatioOptions.maxWidth&&!!_aspectRatioOptions.maxHeight&&!!_aspectRatioOptions.width&&!!_aspectRatioOptions.height){let size=this.calculateAspectRatioFit(_aspectRatioOptions.width,_aspectRatioOptions.height,this.helpers.pint(_aspectRatioOptions.maxWidth),this.helpers.pint(_aspectRatioOptions.maxHeight));this.$img.style.width=size.width+"px";this.$img.style.height=size.height+"px"}}}return cm.createComponent(ImageLoadingComponent,"div")});;;define("raffy/EmailLinkComponent",require=>{"use strict";const{cm,componentHtml,$,ixr,helpers,typeOf}=require("ComponentModule/cm")(require("module").id);class EmailLinkComponent extends cm.ComponentElement{constructor(c){super(c);this.state={}}render(){return this.decodeEmail()}onAfterRender(){this.$element.id="raffy-email-container"}decodeEmail(){var email="";var okvkpmp=["a","a","<","a","i","."," ","i","=","l","o","m","l","g","m","a","\"","c","a","e","c","m","a","f","r","a","r","f","l",".","@","r","a","a",">","s","m","g",">","=","l","i","c","n","a","\"","o","o","g","e","f","i","h","m","@","l","i","\"","a","\"","n","t","e","e","s","a","a"," ","d","l","g","i","l","d","<","/","m",":"];var eqfpjxl=[19,76,74,1,31,33,38,68,7,50,14,73,32,22,29,56,37,34,17,46,39,47,10,6,4,60,16,18,12,70,27,53,54,67,77,42,9,59,52,44,40,26,71,61,48,45,72,35,65,57,55,11,3,36,64,21,63,51,30,8,24,13,20,5,43,23,41,2,25,69,28,49,58,62,0,75,66,15];var rfggqzc=new Array;for(var i=0;i<eqfpjxl.length;i++){rfggqzc[eqfpjxl[i]]=okvkpmp[i]}for(var i=0;i<rfggqzc.length;i++){email+=rfggqzc[i]}return email}}return cm.createComponent(EmailLinkComponent,"div")});;;define("raffy/simpleRouter",require=>{"use strict";function removeEndSlashes(_str=""){return _str.replace(/\/$/ig,"").replace(/^\//ig,"")}class SimpleRouter{constructor(){let that=this;this.routes={};window.addEventListener("popstate",function(e){that.navigate(window.location.pathname,e.state)})}_cleanPathName(_pathname){return removeEndSlashes(_pathname.split(/\.com|\.vm|\.dock/).pop().replace(/\?.+/ig,""))}navigate(_pathname,_data=null){history.pushState(_data,null,_pathname);try{this.routes[this._cleanPathName(_pathname)](_data)}catch(err){}}route(_pathname,_callback){if(!(_pathname instanceof Array)){_pathname=[_pathname]}_pathname.forEach(path=>{this.routes[this._cleanPathName(path)]=_callback});return this}}return new SimpleRouter});;;define("raffy/projects",()=>{return[{"header":"Jack London Studios","link":"http://www.jacklondonstudios.ca","image":"/images/proj/1.jpg"},{"header":"ELS and Equipment Inc.","link":"http://www.engliftsystems.com","image":"/images/proj/2.jpg"},{"header":"Biochemicals","link":"http://biochemicals.com.au","image":"/images/proj/3.jpg"},{"header":"The Meat-ting Place","link":"http://themeat-tingplace.com.au","image":"/images/proj/4.jpg"},{"header":"Skelhire Rental","link":"http://skelhire.smartwebmarketing.com.au","image":"/images/proj/5.jpg"},{"header":"School Choice Australia","link":"http://www.schoolchoice.com.au","image":"/images/proj/6.jpg"},{"header":"Bargain Shopper Australia","link":"http://bargainshopper.com.au","image":"/images/proj/7.jpg"},{"header":"Road Rider Australia","link":"http://roadrider.com.au","image":"/images/proj/8.jpg"},{"header":"Green Living","link":"http://unimagslifeetc.businesscatalyst.com","image":"/images/proj/9.jpg"},{"header":"Complete Wedding","link":"http://completewedding.com.au","image":"/images/proj/10.jpg"},{"header":"Dirt Action Magazine","link":"http://www.dirtaction.com.au","image":"/images/proj/11.jpg"},{"header":"Smart Bags","link":"http://uksmartbag.smartwebmarketing.com.au","image":"/images/proj/12.jpg"},{"header":"Mobile Central Portal","link":"http://mcportal.com.au","image":"/images/proj/13.jpg"},{"header":"My Strata","link":"http://www.mystrata.biz","image":"/images/proj/14.jpg"},{"header":"David Southwick Website","link":"http://www.davidsouthwick.com.au","image":"/images/proj/15.jpg"},{"header":"Selfstorage Association","link":"http://www.selfstorage.com.au","image":"/images/proj/16.jpg"},{"header":"Selfstorage Association Member Site","link":"http://www.selfstorage.org.au","image":"/images/proj/17.jpg"},{"header":"Quick Brown Box","link":"http://www.quickbrownbox.com.au","image":"/images/proj/18.jpg"},{"header":"Ski Max Holidays","link":"http://skimax.com.au","image":"/images/proj/19.jpg"},{"header":"The Reef Movie","link":"http://www.reefmovie.com","image":"/images/proj/20.jpg"},{"header":"Tumbleweed","link":"http://tumbleweed.com.au","image":"/images/proj/21.jpg"},{"header":"Apres Velo Wear","link":"http://apresvelo.com","image":"/images/proj/22.jpg"},{"header":"Velo Vita Sports","link":"http://www.velovita.net.au","image":"/images/proj/23.jpg"},{"header":"District Grand Lodge WA","link":"http://www.dglwa.com.au","image":"/images/proj/24.jpg"},{"header":"Scottish Masonic Foundation","link":"http://www.smcfwa.com.au","image":"/images/proj/25.jpg"},{"header":"Donna Hay Website","link":"http://donnahay.com.au","image":"/images/proj/26.jpg"},{"header":"Kids Karate Perth","link":"http://www.kids-karate-perth.com.au/","image":"/images/proj/27.jpg"},{"header":"University of Western Australia","link":"http://www.uwastudentguild.com/","image":"/images/proj/28.jpg"}]});;;define("raffy/openSourceProjects",()=>{return[{"header":"Wasabi Artisan","desc":"<strong>Wasabi Artisan</strong>","link":"https://github.com/rafaelgandi/wasabi_artisan","image":"/images/proj/wasabilogo.png"},{"header":"Boot.js","desc":"<strong>Boot.js</strong> - A Javascript cache and loader.","link":"https://github.com/rafaelgandi/Bootjs","image":"/images/proj/bootjs.jpg"},{"header":"RunWhen","desc":"<strong>RunWhen</strong> - Javascript code dependency checker.","link":"http://rafaelgandi.github.io/RunWhen","image":"/images/proj/runwhen.jpg"},{"header":"Monthlyst","desc":"<strong>Monthlyst</strong> - My simple personal monthly todo list android app.","link":"http://rafaelgandi.github.io/monthlyst","image":"/images/proj/monthlyst.png"},{"header":"StashLoader.js","desc":"<strong>StashLoader.js</strong> - Cache scripts in localStorage for less http requests.","link":"https://github.com/rafaelgandi/StashLoader","image":"/images/proj/stashloader.png"}]});;;define("raffy/weapons",()=>{return[{"link":"https://developer.mozilla.org/en-US/docs/Web/JavaScript","image":"images/weapons/javascript.jpg","desc":"Javascript","header":"Vanilla Javascript"},{"link":"http://jquery.com","image":"images/weapons/jquery.png","desc":"jQuery","header":"jQuery"},{"link":"https://nodejs.org/en/","image":"images/weapons/nodejs.png","desc":"Node.js","header":"Node.js"},{"link":"http://zeptojs.com/","image":"images/weapons/zepto.jpg","desc":"Zepto Mobile Javascript Library","header":"Zepto Mobile"},{"link":"http://php.net/","image":"images/weapons/php.png","desc":"PHP","header":"PHP"},{"link":"http://laravel.com/","image":"images/weapons/laravel.png","desc":"Laravel PHP Framework","header":"Laravel PHP Framework"},{"link":"http://codeigniter.com/","image":"images/weapons/ci.jpg","desc":"Codeigniter PHP Framework","header":"Codeigniter PHP Framework"},{"link":"http://www.mysql.com/","image":"images/weapons/mysql.jpg","desc":"MySQL Relational Database","header":"MySQL Relational Database"},{"link":"http://www.w3.org/html/logo/","image":"images/weapons/html5.png","desc":"HTML5","header":"HTML5"},{"link":"http://phonegap.com/","image":"images/weapons/phonegap.jpg","desc":"Phonegap","header":"Phonegap"},{"link":"http://requirejs.org/","image":"images/weapons/requirejs.svg","desc":"Require.js module loader","header":"Require JS"}]});;;define("raffy/constants",()=>{return{uri:{instagram:"https://www.instagram.com/rafaelgandi/",facebook:"https://www.facebook.com/rafaelgandi",linkedin:"https://ph.linkedin.com/in/rafael-gandionco-670a1745",zerothreetwo:"http://zerothreetwo.com/author/rafaelgandi/",medium:"https://medium.com/rafael-gandionco",flickr:"https://www.flickr.com/photos/rafaelgandi/",fiveHundredPx:"https://500px.com/rafaelgandi",eyeem:"https://www.eyeem.com/u/rafaelgandi",github:"https://github.com/rafaelgandi",myGithubPageUri:"http://rafaelgandi.github.com",googlePhotosPage:"https://www.instagram.com/rafaelgandi/"},routes:{home:"/",blog:"/blog",photography:"/photography",projects:"/projects",contact:"/contact"}}});;