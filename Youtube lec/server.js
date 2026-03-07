const { response } = require('express');
const http = require('http');
http.createServer((request , response) => {
    response.write("<h1> I'm InamUllah Khan </h1>")
    response.write("<u> Machuluvi </u>")
response.end("Helloooooo")
}) .listen(4800)