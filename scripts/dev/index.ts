/*
 * @Author: tackchen
 * @Date: 2022-08-03 20:32:39
 * @Description: Coding something
 */

// localhost:3000?uml_xx='gh:theajack.cnchar/url-module.js'
// localhost:3000?uml='gh:theajack.cnchar/uml.module.js'
// localhost:3000?uml_event='npm:tc-event'
// localhost:3000?uml_custom='https://'

// function urlModuleLoaderRegister(){

// }

// urlModuleLoader().then((module) => {
     
// });

const GH_HEAD = 'gh:theajack/cnchar';
const NPM_HEAD = 'npm:';
const NPM_UP_HEAD = 'npm(unpkg):';

function urlModuleLoader (value: string) {
}

function tramsformUrl (value: string) {
    if (value.indexOf(GH_HEAD) === 0) {
        value = value.substring(GH_HEAD.length);
        if (value.lastIndexOf('/') === value.indexOf('/')) {
            value += `/uml.module.js`;
        }
        return `https://cdn.jsdelivr.net/gh/${value}`;
    } else if (value.indexOf(NPM_HEAD) === 0) {
        value = value.substring(NPM_HEAD.length);
        return `https://cdn.jsdelivr.net/npm/${value.substring(4)}`;
    } else if (value.indexOf(NPM_UP_HEAD) === 0) {
        value = value.substring(NPM_UP_HEAD.length);
        return `https://unpkg.com/${value}`;
    } else {
        return value;
    }
}

function matchParamters () {
    const modules = [];
    const res = decodeURIComponent(location.search).matchAll(/(\\?|&)uml_?([_a-zA-Z0-9\$]*)*=(.*?)(&|$)/g);
    let next = res.next();
    while (!next.done) {
        const item = next.value;
        const name = item[2];
        const value = item[3];
        console.log(`${name}=${value}`);
        next = res.next();
    }
}

interface IJson {
    [prop: string]: any;
}


function importScript (url: string, modules: IJson<>) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            const loader = (window as any).urlModuleLoaderRegister;
            if (typeof loader === 'function') {
                (window as any).urlModuleLoaderRegister = null;
                const dependencies = (loader as any).dependencies;
                resolve({success: true, message: '', module: loader()});
                return;
            }
            resolve({success: true, message: 'No Register Found'});
        };
        script.onerror = () => {
            resolve({success: false, message: 'Script Load Error'});
        };
    });
}
