const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
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
            </form>`
        );
    }
    else if(req.method === 'POST' && req.url === '/'){
        let body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            const requestData = querystring.parse(body);
            const jsonData = JSON.parse(fs.readFileSync('users.json', 'utf8'));

            const passwordRegEx = /(?=.*[0-9])(?=.*[^A-Z0-9a-z])(?=.*[A-Z]).{8,}/;

            if(passwordRegEx.test(requestData.password) && requestData.age >= 18) {
                requestData.id = (jsonData.length > 0) ? jsonData[jsonData.length - 1].id + 1 : 0; 
                
                jsonData.push(requestData);
                fs.writeFileSync('users.json', JSON.stringify(jsonData, null, 2));
                res.writeHead(201, {'Content-Type': 'text/html'});
                res.end(`User ${requestData.name} ${requestData.surname} added, <a href='/users'>see all users</a>`);
            } else {
                res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'});
                res.end(`
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
                    </form>`); 
            }
        });
        
    }
    else if(req.method === 'GET' && req.url === '/users') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        const jsonData = JSON.parse(fs.readFileSync('users.json', "utf8"), (key) => key === 'id' ? undefined : true);
        res.end(JSON.stringify(jsonData));
    }
})

server.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
})