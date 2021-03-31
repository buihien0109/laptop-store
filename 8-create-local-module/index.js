// Import core module của Nodejs
const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate')

// Read template html
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-laptop.html`,
    'utf-8'
);

// Đọc file data.json
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Tạo server
const server = http.createServer((req, res) => {
    const parse = url.parse(req.url, true);
    let pathname = parse.pathname;
    let query = parse.query;

    // PRODUCTS
    if (pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%CARDS%}', cardsHtml);
        res.end(output);
    } 
    
    // LAPTOP DETAIL
    else if (pathname === '/laptop') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
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

const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening on port : ${PORT}`);
});


