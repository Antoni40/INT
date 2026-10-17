const http = require('http');

const server = http.createServer((req, res) => {
    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Wynik dzielenia dwóch losowych liczb wynosi: ${a} / ${b} = ${a/b}`);
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
