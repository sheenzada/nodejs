const fs = require('fs').promises;

const checkFile = async () => {
    try {
        console.log("Process shuru ho raha hai..."); // Check ke liye
        
        // Agar file nahi hogi toh catch block mein jayega
        const data = await fs.readFile('test.txt', 'utf8');
        console.log("File ka data:", data);
        
    } catch (error) {
        console.log("Error pakra gaya:", error.message);
    }
};

// Yeh line likhna zaroori hai, warna kuch nahi chalega:
checkFile();