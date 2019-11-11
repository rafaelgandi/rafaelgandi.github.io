//import foo from 'foo.js';
import { func1 } from 'mod1';
import mod2 from 'mod2.js';
import 'styles.scss';

// import 'jquery-1.12.4.min';
// import 'jquery.jrumble.1.3.min';
import 'lega';

export const bar = 1;

export function food () {  
  console.log('food');    
  
  
  
}

Lega.hey();

//console.log('jQuery: ', typeof jQuery.fn.jrumble)

console.log((() => 'HOHOHOHOHO')() );

console.log(func1() + ' 0000    ff ');
//console.log(foo);
console.log(mod2);// hrhrhr  

console.log(__CURRENT_MODULE_PATH);     

console.log(__CHECKSUM);  

(async () => {
    let foo = await import('foo.js'); // -->
    console.log(foo);
})();
