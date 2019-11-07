//import foo from 'foo.js';
import { func1 } from 'mod1';
import mod2 from 'mod2.js';
import 'styles.scss';

export const bar = 1;

export function food () {  
  console.log('food');   
  
  
  
}

console.log(func1());
//console.log(foo);
console.log(mod2);// hrhrhr

console.log(__CURRENT_MODULE_PATH)

(async () => {
    let foo = await import('foo.js');
    console.log(foo);
})();
