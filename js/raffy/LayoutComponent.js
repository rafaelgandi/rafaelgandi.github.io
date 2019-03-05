define((require) => {    
    "use strict";
    const { cm, componentHtml, $, ixr, helpers } = (require('ComponentModule/cm'))(require('module').id); 
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
            
            console.dir(window.top.history);
            requestAnimationFrame(() => {
                window.top.history.pushState({}, null, '/foo');
            });
            
             
            this.$element.id = 'raffy-wrapper';
            this.$HeaderComponent = HeaderComponent.renderAllComponents(this.$element);
            ListComponent.renderAllComponents(this.$element);
            EmailLinkComponent.renderAllComponents(this.$element);
            this.$pagesContainers = this.$element.querySelectorAll('.raffy-page-sections'); 
            this.$body.classList.add('raffy-opacity-1');   
            
            
            console.log(this.currentUri);
                 
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
        events() {
            simpleRouter
            .route('/', (_data) => this.setState('uriIdChange', 'raffy-page-home'))
            .route('/projects', (_data) => this.setState('uriIdChange', 'raffy-page-projects'))
            .route('/contact', (_data) => this.setState('uriIdChange', 'raffy-page-contact'));
            simpleRouter.navigate(window.location.pathname); 
            helpers.on(document.getElementById('raffy-main-navigation'), 'click', 'a[rel]', function (e) {
                e.preventDefault();
                simpleRouter.navigate(e.target.rel); 
                return false;
            });   
        }
    }      
    return cm.createComponent(LayoutComponent, 'div');
});