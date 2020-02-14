// package.json > "scripts" : node index.js 커맨드를 npm start 커맨드로 대체

const express = require('express')
const app = express();
const PORT = 4000;

function handleListening(){
    console.log(`Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);

// respond with hello world when GET request is made to the homepage
// app.get("/", function(req, res){
//     res.send('hello world')
// })