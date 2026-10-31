const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Strona głowna - Przepisy</h1>
    <a href="/jajecznica">przejdz do sniadania</a><br>
    <a href="/schabowe">przejdz do obiadu</a><br>
    <a href="/owsianka">przejdz do kolacji</a>
    `)
})
app.get('/jajecznica', (req, res) => {
  res.send(`
    <h1>Przepis na jajecznicę</h1>
      <ol>
          <li>Rozgrzej patelnię i posmaruj olejem (możesz dodać jakąś cebule, czy szynkę)</li>
          <li>Rozbij jajka</li>
          <li>Poczekaj aż się zetną cały czas mieszając</li>
          <li>Gotowe</li>
      </ol>
      <a href="/">Powrót</a>
    `)
})
app.get('/schabowe', (req, res) => {
  res.send(`
    <h1>Przepis na kotlety schabowe</h1>
    <ol>
        <li>Rozbij kotlety</li>
        <li>Zamocz w jajku</li>
        <li>Obtocz w bułce</li>
        <li>Smaż na rozgrzanym oleju</li>
    </ol>
    <a href="/">Powrót</a>
  `)
})
app.get('/owsianka', (req, res) => {
  res.send(`
    <h1>Przepis na owsiankę</h1>
    <ol>
        <li>Wsyp owsiankę do garnka</li>
        <li>Zalej mlekiem i włącz palnik</li>
        <li>Mieszaj do uzyskania gładkiej masy</li>
    </ol>
    <a href="/">Powrót</a>
  `)
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})