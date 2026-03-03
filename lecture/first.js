// http ماڈیول کو درآمد کریں
const http = require('http');

// سرور بنائیں
const server = http.createServer((req, res) => {
  // HTTP ہیڈر سیٹ کریں (status 200 اور content-type text/plain)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // کلائنٹ کو جواب بھیجیں
  res.end('Hello, World! Welcome to Node.js!\n');
});

// پورٹ نمبر (مثلاً 3000) پر سرور سننے لگے
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});