const fs = require('fs').promises;
const fsconstants = require('fs').constants;
const http = require('http');
const mime = require('mime-types');
const path = require('path');
const url = require('url');

const server = http.createServer(async function (request, response) {
    const url = request.url === '/' ? '/index.html' : request.url;
    const fullPath = path.join(__dirname, ...(url.split('/')));

    try {
        await fs.access(fullPath, fsconstants.F_OK);
    } catch (error){
        console.log('[404] ', fullPath);
        response.writeHead(404);
        return response.end('No such file');
    }

    try {
        const contents = await fs.readFile(fullPath);
        const type = mime.lookup(fullPath);
        console.log('type', type);

        response.setHeader("Content-Type", type);
        response.writeHead(200);
        response.end(contents);
        console.log('[200] ', fullPath);
    } catch (err) {
        console.log('error serving file ', err.message);
        console.log('[500] ', fullPath);
        response.writeHead(500);
        return response.end('Internal error');
    }
});

server.listen(3000);