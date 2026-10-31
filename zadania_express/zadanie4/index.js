const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`
    <a href='/artykuly'>All articles</a><br/>
    <a href='/add'>Add article</a><br/>
    `);
})

app.get('/artykuly', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync('articles.json', "utf8")); 
  res.send(`
    ${jsonData.map((article) => `<a href='/artykuly/${article.id}'>${article.title}</a>`).join('<br/>')}        
  `);
})

app.get('/add', (req, res) => {
  res.send(`
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
    `)
})

app.get('/artykuly/:id', (req, res) => {
  const id = Number(req.params.id);
  if(!Number.isInteger(id)) {
    return res.status(400).send(`Invalid id`);
  }

  const articles = JSON.parse(fs.readFileSync('articles.json', "utf-8"));
  const article = articles.find(a => a.id === id);
  if(!article) {
    return res.status(404).send("Article was not found <a href='/'>Back home</a><br/>");
  } 

  res.send(`
    <a href='/'>Back home</a><br/>
    <h2>${article.title}</h2>
    <h3>${article.subtitle}</h3>
    <p>${article.body}</p>
    <p>${article.footer}</p>`);

})

app.post('/', (req, res) => {
  const bodyData = req.body;
  const jsonData = JSON.parse(fs.readFileSync('articles.json'));
      
  bodyData.id = (jsonData.length > 0) ? jsonData[jsonData.length - 1].id + 1 : 0;
  jsonData.push(bodyData);

  fs.writeFileSync('articles.json', JSON.stringify(jsonData, null, 2));
  
  res.send(`
    <p>Article added: <a href='/artykuly/${bodyData.id}'>${bodyData.title}</a>
    <a href='/'>Back home</a><br/>
  `);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})