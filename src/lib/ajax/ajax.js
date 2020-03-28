//import logging from '@lib/logging';
import trans from '@lib/transports';
import notif from '@lib/notification';


function getHeaders() {
    let headers = {
        'Accept': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
    };
    if (!!trans.accessToken) {
        headers['Authorization'] = 'Bearer ' + trans.accessToken;
    }
    return headers;
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
export async function doFetch(uri, options = {}) {
    options = Object.assign({
        method: 'post',
        headers: getHeaders()
    }, options);
    if (options.body) {
        if (typeof options.body !== 'string') {
            options.body = JSON.stringify(options.body);
        }    
    }    
    return await fetch(uri, options).then(res => res.json());
} 

export async function httpPost(uri, options = {}) {
    return doFetch(uri, Object.assign(options, {
        method: 'post'
    }));
}

export async function httpGet(uri, options = {}) {
    return doFetch(uri, Object.assign(options, {
        method: 'get'
    }));
}

function _error(msg = null) {
    //let user = (!! trans.uid) ? trans.uid : 'none found';
    //logging(`"${ msg }" | User: ${ user }`);
    if (msg !== null) {
        notif.error(msg);
    }    
}

export async function fetchGraphQL(uri, data = {}) {
    // See: https://www.prisma.io/tutorials/build-react-graphql-app-with-fetch-ct19
    const res = await fetch(uri, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
    return new Promise((resolve, reject) => {
        if (typeof res.data !== 'undefined' && res.data !== null) {
            resolve(res.data);
        }
        else {
            reject(res);
        }
    });
}

export function hasErrors(res, msg = 'Something went wrong. Please try again') {
    if (res === null || typeof res === 'string') {            
        _error(msg);
        return true;
    }
    if (typeof res['error'] !== 'undefined') {
        _error(msg);
        console.warn(res['message']);
        return true;
    }
    if (typeof res['errors'] !== 'undefined') {
        _error(msg);
        console.warn(res['errors']);
        return true;
    }
    if (typeof res['payload'] === 'undefined') {
        _error(msg);
        return true;
    }
    else {
        return false;
    }
}