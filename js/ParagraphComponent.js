define((require) => {    
    "use strict";
    // Make sure the dom is ready //
    require('domReady!');
    const { cm, componentHtml, $, ixr, helpers } = (require('./ComponentModule/cm'))(require('module').id); 
    cm.componentStyle(componentHtml`
        <style>
        .@ixr(paragraph) {
            border: 1px solid green;
            font-size: 1.5em;
            transition: background-color 0.5s ease-out;
        }
        .@ixr(iden) {
            text-decoration: underline;
        }
        .@ixr(bg) {
            background-color: yellow;
        }
        </style>
    `);
    
    class ParagraphComponent extends cm.ComponentElement { 
        constructor(c) { 
            super(c);       
            this.state = {};
        }  
        render() {  
            return componentHtml`
            <span class="${ ixr('iden') }">${ this.props.greet }</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
            took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 
            1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
            publishing software like Aldus PageMaker including versions of <span id="${ ixr('context_test') }">heheheheh</span>.`;
        } 
        propTypes() {
            return {
                greet: 'string'
            };
        }
        onAfterInitialRender() {  
            this.$element.classList.add(ixr('paragraph'));
            setTimeout(() => {
                document.getElementById(ixr('context_test')).textContent = this.context.foo;
            }, 3000);
        }   
        events() {
            helpers.on(this.$element, 'click', function (e) {
                e.preventDefault();
                this.classList.toggle(ixr('bg'));
            });
        }
    }      
    return cm.createComponent(ParagraphComponent, 'p');
});