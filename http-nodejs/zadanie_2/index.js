const http = require('http');

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Strona głowna - Przepisy</h1>
            <a href='/sniadanie'>Sniadanie</a>
            <a href='/obiad'>Obiad</a>
            <a href='/kolacja'>Kolacja</a>
            `);
    } 
    else if(req.method === 'GET' && req.url === '/sniadanie'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Przepis na jajecznice</h1>
            <ol>
                <li>Rozgrzej patelnię i posmaruj olejem (możesz dodać jakąś cebule, czy szynkę)</li>
                <li>Rozbij jajka</li>
                <li>Poczekaj aż się zetną</li>
            </ol>
            `);
    }
    else if(req.method === 'GET' && req.url === '/obiad') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Przepis na kotlety schabowe</h1>
            <ol>
                <li>Rozbij kotlety</li>
                <li>Zamocz w jajku</li>
                <li>Obtocz w bułce</li>
                <li>Smarz na rozgrzanym oleju</li>
            </ol>
            `);
    } else if(req.method === 'GET' && req.url === '/kolacja') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`
            <h1>Przepis na owsiankę</h1>
            <ol>
                <li>Wsyp owsiankę do garnka</li>
                <li>Zalej mlekiem i włącz palnik</li>
                <li>Mieszaj do uzyskania gładkiej masy</li>
            </ol>
            `);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
})

server.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
})