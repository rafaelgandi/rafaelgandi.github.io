define((require) => {    
    "use strict";
    // Make sure the dom is ready //
    require('domReady!');
    const { cm, componentHtml, $, ixr, helpers } = (require('./ComponentModule/cm'))(require('module').id); 
    const ParagraphComponent = require('./ParagraphComponent');
    cm.componentStyle(componentHtml`
        <style>
        .@ixr(con) {
            border: 1px solid red;
        }
        </style>
    `);
    
    class CounterComponent extends cm.ComponentElement { 
        constructor(c) { 
            super(c);       
            this.state = {
                count: 0
            };
            this.setContextData({
                foo: 'this is from context'
            });
        }  
        render() {  
            return componentHtml`
            <div class="${ ixr('con') }">0</div> 
            <Component-x 
            type="ParagraphComponent" 
            classNames="hohoh" 
            greet="Hooooo"></Component-x>`;
        } 
        onAfterInitialRender() {    
            setInterval(() => {
                this.setState('count', ++this.state.count);
            }, 1e3);
            this.$ParagraphComponent = ParagraphComponent.renderAllComponents(this.$element);
        }   
        onStateChange(_stateName) {
            if (this.isIn('count', _stateName)) {
                this.$element.querySelector(`.${ ixr('con') }`).textContent = this.state.count;
            }
        }
        fromMethod() {
            console.log('from method');
        }
        events() {
            helpers
            .on(this.$element, 'click', `.${ ixr('con') }`, function (e) {
                alert(1);
            })
            .on(this.$element, 'mouseover', function (e) {
                console.log('no delegation');
            });
        }
    }      
    return cm.createComponent(CounterComponent, 'div');
});