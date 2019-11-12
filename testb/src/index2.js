import 'styles.scss';
import foo from './foo.js';
import { func1 } from 'mod1';   


export default function () {
    console.log(func1());  
    
    let x = "asdfsdafsadfd_____safdsafads  ooo";  
    
    return (
        <div className="hehehe" num={ 0 } onHey={ () => 1} bar={ x } pop={ foo }>
            heyy <span>fooo</span>
        </div>
    );
}