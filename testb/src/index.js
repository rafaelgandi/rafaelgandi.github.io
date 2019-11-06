//import foo from 'foo.js';
import { func1 } from 'mod1';
import mod2 from 'mod2.js';

export const bar = 1;

export function food () {  
  console.log(___COMP);   
  
  
  
}

console.log(func1());
//console.log(foo);
console.log(mod2);// hrhrhr

console.log(2222)


import('foo.js').then((foo) => {  
    console.log(foo)
});