const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'application/json'});

    const data = JSON.parse(fs.readFileSync('urzadzenia.json', 'utf-8'));
    const type = parsedUrl.query.type || 'all';

    if(type === 'all') {
        res.end(JSON.stringify(data));
    }
    else if(type === 'phones'){
        res.end(JSON.stringify(data.phones));
    }
    else if(type === 'laptops'){
        res.end(JSON.stringify(data.laptops));
    }
})

server.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
})