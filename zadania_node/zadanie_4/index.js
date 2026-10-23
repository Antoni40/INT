const crypto = require("crypto");
const fs = require("fs");

const text = "Hello World";
console.log(`Plain text: ${text}`);

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypter = crypto.createCipheriv(algorithm, key, iv);
let encrypted = encrypter.update(text, "utf-8", "hex");
encrypted += encrypter.final('hex');
const data = {encryptedText: encrypted}


fs.writeFile("encryptedText.json", JSON.stringify(data, null, 4), (err) => {
    if(err) console.log("Error writing file", err);
    else {
        console.log("Encrypted text was saved")

        fs.readFile("encryptedText.json", (err, data) => {
            if(err) console.log(`Error while reading a file ${err}`);

            const jsonData = JSON.parse(data);
            const {encryptedText} = jsonData;
            
            console.log(`Encrypted text: ${encryptedText}`);
        });
    }
});