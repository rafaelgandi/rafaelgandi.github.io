System.register([], function (exports) {
    'use strict';
    return {
        execute: function () {

            exports('default', index2);

            function func1(){return "func1"}

            function index2(){console.log(func1());return cm.cholo("div",{className:"hehehe",num:0,onHey:function onHey(){return 1}},"heyy ",cm.cholo("span",null,"fooo"))}

        }
    };
});
