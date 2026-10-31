const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  const products = req.query.produkty || null;
  if(!products) {
    res.send(`
        <a href="/?produkty=owoce">przejdz do owocow</a><br>
        <a href="/?produkty=warzywa">przejdz do warzyw</a>
      `)
  } else {
    const data = JSON.parse(fs.readFileSync("products.json", "utf-8"));
    if (data[products]) {
      res.json(data[products]);
    } else {
      res.send('brak produktów w wybranej kategori');
    }
  } 
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})