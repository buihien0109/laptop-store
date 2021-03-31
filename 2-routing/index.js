// Import core module của Nodejs
const http = require('http');
const url = require('url');

// Tạo server
const server = http.createServer((req, res) => {
    const parse = url.parse(req.url, true);
    console.log(parse);

    let pathname = parse.pathname;

    if (pathname === '/') {
        res.end('Home page');
    } else if (pathname === '/laptop') {
        res.end('Laptop page');
    } else {
        res.end('Page not found!');
    }
});

// Lắng nghe server
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
