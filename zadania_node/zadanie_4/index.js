const crypto = require("crypto");
const fs = require("fs");

const text = "Hello World";
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypter = crypto.createCipheriv(algorithm, key, iv);
let encrypted = encrypter.update(text, "utf-8", "hex");
encrypted += encrypter.final('hex');
const data = {encryptedText: encrypted}


fs.writeFile("cypheredText.json", JSON.stringify(data, null, 4), (err) => {
    if(err) console.log("Error writing file", err);
    else console.log("Encrypted text was saved")
})
