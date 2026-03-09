const { response } = require('express')
const http = require('http')

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
http.createServer((request,response) => {
    // response.setHeader('Content-Type' , 'Applicaton/json')
    response.write(JSON.stringify(userData));
    response.end()
}).listen(111)