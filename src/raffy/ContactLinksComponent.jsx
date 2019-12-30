import component from 'ComponentModule/cm';
const { cm } = component(__CURRENT_MODULE_PATH); 
export default class ContactLinksComponent extends cm.ComponentElement { 
    constructor() { 
        super();       
    }  
    render() {  
        return (
            <div data-component-type={__CURRENT_MODULE_PATH} id="raffy-contact-links">
                <a href={ this.context.constants.uri.instagram } target="_blank" rel="noreferrer" title="Go to my instagram page">Instagram</a>
                <a href={ this.context.constants.uri.facebook } target="_blank" rel="noreferrer" title="Add me on facebook">Facebook</a>
                <a href={ this.context.constants.uri.linkedin } target="_blank" rel="noreferrer" title="View my linkedin profile">LinkedIn</a>
                <a href={ this.context.constants.uri.zerothreetwo } target="_blank" rel="noreferrer" title="Read a photo essay I did for Zerothreetwo.com">032</a>
                <a href={ this.context.constants.uri.medium } target="_blank" rel="noreferrer" title="Check out my blog a medium">Medium</a>
                <a href={ this.context.constants.uri.flickr } target="_blank" rel="noreferrer" title="View my flickr profile">Flickr</a>
                <a href={ this.context.constants.uri.fiveHundredPx } target="_blank" rel="noreferrer" title="View my 500px profile">500px</a>
                <a href={ this.context.constants.uri.eyeem } target="_blank" rel="noreferrer" title="View my EyeEm profile">EyeEm</a>
                <a href={ this.context.constants.uri.github } target="_blank" rel="noreferrer" title="Checkout my open source projects at github.com">Github</a>
            </div>
        );
    }
}      