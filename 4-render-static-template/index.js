// Import core module của Nodejs
const http = require('http');
const url = require('url');
const fs = require('fs');

// Đọc file data.json
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf8');

// Tạo server
const server = http.createServer((req, res) => {
    const parse = url.parse(req.url, true);
    let pathname = parse.pathname;

    // PRODUCTS
    if (pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        fs.readFile(`${__dirname}/overview.html`, 'utf-8', (err, data) => {
            res.end(data);
        });
    } 
    
    // LAPTOP DETAIL
    else if (pathname === '/laptop') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        fs.readFile(`${__dirname}/laptop.html`, 'utf-8', (err, data) => {
            res.end(data);
        });
    }

    // IMAGES
    else if (/\.(jpg|jpeg|png|gif)$/i.test(pathname)) {
        fs.readFile(`${__dirname}/data/img/${pathname}`, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(data);
        });
    } 
    
    // API
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    } 
    
    // NOT FOUND
    else {
        res.end('Page not found!');
    }
});

// Lắng nghe server
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
