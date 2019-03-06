define((require) => {    
    "use strict";
    const { cm, componentHtml, $, ixr, helpers, typeOf } = (require('ComponentModule/cm'))(require('module').id); 
	const HeaderComponent = require('raffy/HeaderComponent');
	const ListComponent = require('raffy/ListComponent');
	const EmailLinkComponent = require('raffy/EmailLinkComponent');
    const simpleRouter = require('raffy/simpleRouter');
    const projectItems = require('raffy/projects');
    const openSourceProjects = require('raffy/openSourceProjects');
    const weapons = require('raffy/weapons');
    const constants = require('raffy/constants');
    class LayoutComponent extends cm.ComponentElement { 
        constructor(c) { 
            super(c);       
            this.state = {
                uriIdChange: null
            };
            this.currentUri = (parent !== window) ? document.referrer : document.location; // See: http://stackoverflow.com/a/7739035
            this.$body = document.getElementsByTagName('body')[0];
            this.setContextData({
                constants: constants
            });
        }  
        render() {  
            return componentHtml`
    		<Component-x type="raffy/HeaderComponent"></Component-x>            
            <section id="raffy-page-home" class="raffy-page-sections">
    			<p style="margin-top: 2.6em;">
    				Hi, my name's Rafael Gandionco and I'm a minimalist, photographer and web developer from the Philippines.
                </p>
                <p>    
                    Both photography and web development are an integral part of who I am. Both are an ongoing passion of mine 
                    and each complements one another. One enables me to express how I see the world around me in a more organic 
                    and abstract way, while the other helps me express my creativity and love of building through technology. 	
                </p> 
                <p>   
                    While pursuing these passions I discovered minimalism. It has helped me gain clarity in the world around me 
                    and in turn, brought a sense of happiness and contentment back to my life. Everything in my life now either 
                    brings me joy and love or has a meaningful purpose. Living by these values has truly opened up possibilities 
                    for me to grow as a person. This is an ongoing process I'm taking with my life and I'm constantly learning.
                </p>
                <p>				
                    Through my photography and web development with the help of the values I gained from minimalism, I hope to 
                    help people discover the beauty in the ordinary and mundane things we find in our everyday lives and hopefully 
                    add value and a meaningful impact in their lives whether it be a client of mine or an ordinary person who 
                    happens to see my work.
                </p>  
    		</section>
    		<section id="raffy-page-projects" class="raffy-page-sections">
                <div class="raffy-text  text-center" style="margin-top: 80px;"><h1>Tools I use for web development.</h1></div>      
    			<Component-x type="raffy/ListComponent" items="${ weapons }"></Component-x>
    			<div class="raffy-text text-center"><h1>Some of my personal open source projects on <a href="${ this.context.constants.uri.github }" target="_blank">github.</a></h1></div>
                <Component-x type="raffy/ListComponent" items="${ openSourceProjects }"></Component-x>
    			<div class="raffy-text  text-center"><h1>A few client projects I was a part of building.</h1></div>            
    			<Component-x type="raffy/ListComponent" items="${ projectItems }"></Component-x>
    		</section>
    		<section id="raffy-page-contact" class="raffy-page-sections">
    			<Component-x type="raffy/EmailLinkComponent"></Component-x>
    			<div id="raffy-contact-links">
    				<a href="${ this.context.constants.uri.instagram }" target="_blank">Instagram</a>
    				<a href="${ this.context.constants.uri.facebook }" target="_blank">Facebook</a>
    				<a href="${ this.context.constants.uri.linkedin }" target="_blank">LinkedIn</a>
    				<a href="${ this.context.constants.uri.zerothreetwo }" target="_blank">032</a>
    				<a href="${ this.context.constants.uri.medium }" target="_blank">Medium</a>
    				<a href="${ this.context.constants.uri.flickr }" target="_blank">Flickr</a>
    				<a href="${ this.context.constants.uri.fiveHundredPx }" target="_blank">500px</a>
    				<a href="${ this.context.constants.uri.eyeem }" target="_blank">EyeEm</a>
    				<a href="${ this.context.constants.uri.github }" target="_blank">Github</a>
    			</div>
    		</section>`;
        } 
        onAfterInitialRender() { 
            // Breakout of frame if in mobile and in frameset (.tk) //   
            if (this._isInsideFrame() && this._isMobile()) {
                window.top.location.href = this.context.constants.uri.myGithubPageUri;
            }   
            this.$element.id = 'raffy-wrapper';
            this.$HeaderComponent = HeaderComponent.renderAllComponents(this.$element);
            ListComponent.renderAllComponents(this.$element);
            EmailLinkComponent.renderAllComponents(this.$element);
            this.$pagesContainers = this.$element.querySelectorAll('.raffy-page-sections'); 
            this.$body.classList.add('raffy-opacity-1');                    
        }
        onStateChange(_stateName) {
            if (this.isIn('uriIdChange', _stateName)) {
                this._hideAllPages();
                let $pageCon = document.getElementById(this.state.uriIdChange);
                $pageCon.classList.add('raffy-show-page');
                setTimeout(() => {
                    $pageCon.classList.add('raffy-opacity-1');
                }, 50);
                this.$HeaderComponent.cm.setLinkAsActive(this.state.uriIdChange);
            }
        }    
        _hideAllPages() {
            this.$pagesContainers.forEach(function (elem) {
                elem.classList.remove('raffy-show-page', 'raffy-opacity-1');
            });
            this.$body.scrollTop = 0;
        }  
        _isInsideFrame() {
            // See: http://stackoverflow.com/a/326076
            try { return window.self !== window.top; } 
            catch (e) { return true; }
        }
        _isMobile() {
            // See: http://stackoverflow.com/a/14301832
            return typeof window.orientation !== 'undefined';
        } 
        _setInitialPage() {
            if (typeOf(this.currentUri) === 'string') {
                if (this.currentUri.indexOf(this.context.constants.routes.projects) !== -1) {
                    simpleRouter.navigate(this.context.constants.routes.projects); 
                    return;
                }
                else if (this.currentUri.indexOf(this.context.constants.routes.contact) !== -1) {
                    simpleRouter.navigate(this.context.constants.routes.contact); 
                    return;
                }
                else if (this.currentUri.indexOf(this.context.constants.routes.blog) !== -1) {
                    window.top.location.href = this.context.constants.uri.medium;
                    return;
                }
                else if (this.currentUri.indexOf(this.context.constants.routes.photography) !== -1) {
                    window.top.location.href = this.context.constants.uri.googlePhotosPage;
                    return;
                }
                else {
                    simpleRouter.navigate(this.context.constants.routes.home); 
                    return;
                }
            }        
            simpleRouter.navigate(window.location.pathname); 
        }
        events() {
            simpleRouter
            .route(this.context.constants.routes.home, (_data) => this.setState('uriIdChange', 'raffy-page-home'))
            .route(this.context.constants.routes.projects, (_data) => this.setState('uriIdChange', 'raffy-page-projects'))
            .route(this.context.constants.routes.contact, (_data) => this.setState('uriIdChange', 'raffy-page-contact'));
            this._setInitialPage();
            helpers.on(document.getElementById('raffy-main-navigation'), 'click', 'a[rel]', function (e) {
                e.preventDefault();
                simpleRouter.navigate(e.target.rel); 
                return false;
            });   
        }
    }      
    return cm.createComponent(LayoutComponent, 'div');
});