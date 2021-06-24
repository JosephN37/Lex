const express = require("express");
const app = express();

//connecting Firebase Realtime Database to Node.js + Express backend, after generating a private key
var admin = require("firebase-admin");

var serviceAccount = require("../Main/src/config/firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lex-login-page-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// basic Rest API
app.get('/', function(req, res){
    return res.json({
        message: "Hello there",
        success: true
    })
});

app.post('/', function(req, res){
    return res.json({
        message: "Welcome",
        success: true
    })
});

app.listen(3000, () => console.log ('Example app listening on port 3000'),);