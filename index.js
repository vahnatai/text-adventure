const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const fsconstants = require('fs').constants;

const server = http.createServer(function (request, response) {
    const path = request.url === '/' ? '\\index.html' : request.url;
    const fullPath = __dirname + path;

    fs.access(fullPath, fsconstants.F_OK)
        .then(function (err) {
            return fs.readFile(fullPath)
                .then(contents => {
                    response.setHeader("Content-Type", "text/html");
                    response.writeHead(200);
                    response.end(contents);
                    console.log('[200] ', fullPath);
                })
                .catch(err => {
                    console.log('error serving file ', err.message);
                    console.log('[500] ', fullPath);
                    response.writeHead(500);
                    return response.end('Internal error');
                });
            ;
        })
        .catch(err => {
            console.log('[404] ', fullPath);
            response.writeHead(404);
            response.end('No such file');
        })
    ;
});

server.listen(3000);