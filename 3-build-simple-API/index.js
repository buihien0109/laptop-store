// Import core module của Nodejs
const http = require('http');
const url = require('url');
const fs = require('fs');

// Đọc file data.json
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf8');

// Tạo server
const server = http.createServer((req, res) => {
    const parse = url.parse(req.url, true);
    console.log(parse);

    let pathname = parse.pathname;

    if (pathname === '/') {
        res.end('Home page');
    } else if (pathname === '/laptop') {
        res.end('Laptop page');
    } else if (pathname === '/api') {
        // fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err, data) => {
        //     res.writeHead(200, { 'Content-type' : 'application/json'})
        //     res.end(data);
        // })

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    } else {
        res.end('Page not found!');
    }
});

// Lắng nghe server
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
