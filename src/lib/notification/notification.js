// See: https://hackernoon.com/the-last-toast-library-youll-ever-need-8629e61b8e91
// See: https://github.com/caroso1222/notyf
import { Notyf } from 'notyf'; 
import css from './notification.css';

const notyf = new Notyf({
    duration: 3e3,
    types: [
        {
            type: 'warning',
            className: css['notification-con'],
            backgroundColor: 'orange',
            icon: false
        },
        {
            type: 'info',
            className: css['notification-con'],
            backgroundColor: '#57C9EE',
            icon: false
        },
        {
            type: 'error',
            className: css['notification-con'],
            backgroundColor: 'indianred',
            icon: false            
        },
        {
            type: 'success',
            className: css['notification-con'],
            icon: false            
        }
    ]
});

export function success(msg, config = {}) {
    notyf.open(Object.assign({
        type: 'success',
        message: msg
    }, config));
}

export function error(msg, config = {}) {
    notyf.open(Object.assign({
        type: 'error',
        message: msg
    }, config));
}

export function warning(msg, config = {}) {
    notyf.open(Object.assign({
        type: 'warning',
        message: msg
    }, config));
}

export function info(msg, config = {}) {
    notyf.open(Object.assign({
        type: 'info',
        message: msg
    }, config));
}

export const NotyfClass = Notyf;
export default { success, error, warning, info };                 