const { response } = require('express');
const http = require('http');

const userData = [
    {
        name:'Inam-Ullah',
        age:18,
        email:'sheenzada7@gmail.com'
    },
    {
        name:'Najmul-Akash',
        age:18,
        email:'najmulbalghari80@gmail.com'
    },
    {
        name:'Yaseen-Malik',
        age:18,
        email:'ya7830485@gmail.com'
    },{
        name:'Tajwar-Shaheen',
        age:18,
        email:'tajwar7@gmail.com'
    },
]

const age = 18;
const server = http.createServer((request , response)=> {
    response.setHeader('Content-Type' , 'text/html')
    response.write(JSON.stringify(userData));
    // response.setHeader('Content-Type' , 'Applicaton/json')

    response.write(`
        <html>
        <head>
        <title>Code step by setep
        </title>
        </head>
        <body>
        <h1>Hello I'm Inamullah Khan KHP </h1>
        <h2> `+age+` </h2>
        <h2> `+new Date()+` </h2>
        </body>
        </html?
        `)
    response.end()
    // process.exit()
})
server.listen(4800)