// console.log("Allah");\

// let a = 20;
// let b = 0;

// setTimeout(() => {
    // b=20
// console.log(a+b+c);
// }, 2000);
// console.log("Rahim");


// console.log(a+b);


const { error } = require('console')
const fs  = require('fs')
// fs.readFile('dummy.txt' , 'utf-8' , (error, data) => {
//     if(error){
//         return false;
//     }
//     console.log(data);
    
// })

const data = fs.readFileSync('dummy.txt' , 'utf-8',)
console.log(data);


console.log('End Script');


