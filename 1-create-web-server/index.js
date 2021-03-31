// File index.js

// Import core module http của Nodejs
const http = require('http');

// Tạo server
const server = http.createServer((req, res) => {
    res.end('Hello Server');
})

// Lắng nghe server
server.listen(3000, () => {
    console.log('Server listening on port 3000')
})