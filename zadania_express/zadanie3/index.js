const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Add user</h1>
    <form method="POST" action="/">
        <label>Name:
            <input type="text" name="name">
        </label><br/>
        <label>Surname:
            <input type="text" name="surname">
        </label><br/>
        <label>Age
            <input type="number" name="age">
        </label><br/>
        <label>Password
            <input type="password" name="password">
        </label><br/>
        <button type="submit">Submit</button>
    </form>
  `);
})

app.post('/', (req, res) => {
  const newUser = req.body;
  const passwordRegEx = /(?=.*[0-9])(?=.*[^A-Z0-9a-z])(?=.*[A-Z]).{8,}/;

  if(passwordRegEx.test(newUser.password) && newUser.age >= 18) { 
    const jsonData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    jsonData.push({id: jsonData.length > 0 ? jsonData[jsonData.length - 1].id + 1 : 0, ...newUser});

    fs.writeFileSync('users.json', JSON.stringify(jsonData, null, 2));

    res.send(`User added ${newUser.name} ${newUser.surname} <a href='/users'>see all users</a>`);
  } else {
    res.send(`
      <div>
        <span style='color: red'>Niepoprawnie wypełniono formularz</span>
        <form method="POST" action="/">
            <label>Name:
                <input type="text" name="name">
            </label>
            <label>Surname:
                <input type="text" name="surname">
            </label>
            <label>Age
                <input type="number" name="age">
            </label>
            <label>Password
                <input type="password" name="password">
            </label>
            <button type="submit">Submit</button>
        </form>
      </div>`
    );
  }
})

app.get('/users', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync('users.json', "utf8"));
  res.send(`
    ${jsonData.map(user => `<a href="/user/${user.id}">${user.name} ${user.surname}</a><br>`)}
    `);
})

app.get('/user/:id', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
  const id = Number(req.params.id);
  if(!Number.isInteger(id)) {
    return res.status(400).send(`Invalid id provided ${id}`);
  }
  const user = jsonData.find(u => u.id === id);
  if(!user) {
    return res.status(404).send(`user not found`);
  }
  res.json(user);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})