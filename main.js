'use strict';
const http = require ('node:http');
const port = 9999;
const statusNotFound = 404;
const statusBadRequest = 400;
const statusOk = 200;

let nextId = 1;
const posts = [];

const methods = new Map();
methods.set('/posts.get', function({response}){
    response.writeHead(statusOk, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(posts));
});
methods.set('/posts.getById', function(){});
methods.set('/posts.post', function({response, searchParams}){
    //const url = new URL(request.url, `http://${request.headers.host}`);
    //const searchParams = url.searchParams;

    if (!searchParams.has('content')) {
        response.writeHead(statusBadRequest);
        response.end();
        return;
    }
    
    const content = searchParams.get('content');

    const post = {
        id:nextId++,
        content: content,
        create: Date.now(),
    };

    posts.unshift(post);
    response.writeHead(statusOk, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(post));

});
methods.set('/pos ts.edit', function(){});
methods.set('/posts.delete', function(){});

const server = http.createServer(function(request, response) {
    //const url = new URL(request.url, `http://${request.headers.host}`);
    //const searchParams = url.searchParams;
    //response.end(searchParams.get('query'));

    const {pathname, searchParams} = new URL(request.url, `http://${request.headers.host}`);

    //const pathname = url.pathname;
    //const searchParams = url.searchParams;

    const method = methods.get(pathname);
    if (method === undefined) {
        response.writeHead(statusNotFound);
        response.end();
        return;
    }

    const params = {
        request,
        response,
        pathname,
        searchParams,
    }
    //method(request, response);
    method(params);
});

server.listen(port);

/*class Demo {
    get property() {
        console.log('get');
        return 'property';
    }
    set property(value) {
        console.log(`set${value}`);
    }
}

const demo = new Demo();
const property = demo.property;
demo.property = 'new value';*/

 