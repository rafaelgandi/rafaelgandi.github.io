/*
    Image loading placeholder component
*/
import component from 'ComponentModule/cm';
const { cm, componentHtml, ixr } = component(__CURRENT_MODULE_PATH); 
cm.componentStyle(componentHtml`<style>
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
</style>`);

export default class ImageLoadingComponent extends cm.ComponentElement { 
    constructor() { 
        super();
        this.state = {};        
    }  
    render() {  
        return (
            <div data-component-type={__CURRENT_MODULE_PATH} className={`${ixr('container')} ${ixr('pulsate')}`}>
                <img 
                    src="about:blank" 
                    alt={ this.props.alt || '' } 
                    className={`${ this.props.classNames || '' } ${ cm.ixr('hide') } ${ cm.ixr('img') }`} 
                    loading="lazy" 
                />
            </div>
        );
    }  
    onAfterInitialRender() {    
        this.props.containerClass && this.$element.classList.add(this.props.containerClass);
        this.$img = this.$element.querySelector('img');            
        this.$img.setAttribute('src', this.props.src);
        this.$img.addEventListener('load', () => {
            this.$img.classList.remove(cm.ixr('hide'));
            this.$element.classList.remove(cm.ixr('pulsate'));
        });
    } 
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        // See: https://opensourcehacker.com/2011/12/01/calculate-aspect-ratio-conserving-resize-for-images-in-javascript/
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth*ratio, height: srcHeight*ratio };
    }
    updateSrc(_src, _aspectRatioOptions = {}) {
        this.$img.setAttribute('src', _src);
        if (!! _aspectRatioOptions.maxWidth && !! _aspectRatioOptions.maxHeight && !! _aspectRatioOptions.width && !! _aspectRatioOptions.height) {
            let size = this.calculateAspectRatioFit(_aspectRatioOptions.width, _aspectRatioOptions.height, this.helpers.pint(_aspectRatioOptions.maxWidth), this.helpers.pint(_aspectRatioOptions.maxHeight));
            this.$img.style.width = size.width + 'px';
            this.$img.style.height = size.height + 'px';   
        }            
    }  
}      