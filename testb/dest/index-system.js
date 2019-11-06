System.register([], function (exports, module) {
    'use strict';
    return {
        execute: function () {

            exports('food', food);

            function func1(){return "func1"}

            var mod2 = "module 2 here!";

            var bar= exports('bar',1);function food(){console.log('hoooooo');}console.log(func1());console.log(mod2);console.log(2222);module.import('./foo-77e17db4.js').then(function(foo){console.log(foo);});

        }
    };
});
