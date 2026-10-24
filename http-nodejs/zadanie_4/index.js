const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const id = parsedUrl.query.id || null;
  
  if(req.method === 'GET' && id !== null) {    
    const article = JSON.parse(fs.readFileSync('articles.json', 'utf-8')).find(article => article.id === Number(id));

    if(!article) {
      res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
      res.end("Article was not found <a href='/'>Back home</a><br/>");
    } else {
      res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
      res.end(`
        <a href='/'>Back home</a><br/>
        <h2>${article.title}</h2>
        <h3>${article.subtitle}</h3>
        <p>${article.body}</p>
        <p>${article.footer}</p>
        `)
    }
  }
  else if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const jsonData = JSON.parse(fs.readFileSync('articles.json', "utf8"));

    res.end(`
        <a href='/add'>Add new article</a><br/>
        ${jsonData.map((article) => `<a href='/?id=${article.id}'>${article.title}</a>`).join('<br/>')}        
      `)
  }
  else if(req.method === 'GET' && req.url === '/add') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end(`
      <a href='/'>Back home</a><br/>  
      <form method="POST" action="/">
          <label>Title:
              <input type="text" name="title">
          </label>
          <label>Subtitle:
              <input type="text" name="subtitle">
          </label>
          <label>Body
              <input type="text" name="body">
          </label>
          <label>Footer
              <input type="text" name="footer">
          </label>
          <button type="submit">Submit</button>
      </form>
    `);
  }
  else if(req.method === 'POST' && req.url === '/') {
    let body = "";
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const bodyData = querystring.parse(body);

      const jsonData = JSON.parse(fs.readFileSync('articles.json'));
      
      bodyData.id = (jsonData.length > 0) ? jsonData[jsonData.length - 1].id + 1 : 0;

      jsonData.push(bodyData);

      fs.writeFileSync('articles.json', JSON.stringify(jsonData, null, 2));
      res.writeHead(201, {'Content-Type': 'text/html; charset=UTF-8'});
      res.end(`
        <p>Article added: <a href='/?id=${bodyData.id}'>${bodyData.title}</a>
        <a href='/'>Back home</a><br/>
      `);
    })

  }
});

server.listen(8080, () => {
  console.log(`Server is running on: http://localhost:8080`);
})