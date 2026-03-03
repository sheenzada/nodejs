// Express ماڈیول کو درآمد کریں
const express = require('express');
const fs = require('fs').promises; // فائل سسٹم ماڈیول (promises ورژن)

// Express ایپ بنائیں
const app = express();
const PORT = 3000;

// JSON ڈیٹا پارس کرنے کے لیے middleware
app.use(express.json());

// سادہ GET روٹ (ہوم پیج)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Node.js Lecture 2</h1><p>Express server is running!</p>');
});

// GET روٹ کے ساتھ URL پیرامیٹرز
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;  // URL سے id حاصل کریں
  res.json({ message: `User ID: ${userId}` });
});

// GET روٹ کے ساتھ query string
app.get('/search', (req, res) => {
  const query = req.query.q;     // ?q=something
  res.json({ searchTerm: query || 'No query provided' });
});

// POST روٹ (ڈیٹا وصول کرنے کے لیے)
app.post('/api/data', (req, res) => {
  const receivedData = req.body;  // کلائنٹ سے بھیجا گیا JSON ڈیٹا
  res.json({
    message: 'Data received successfully!',
    data: receivedData
  });
});

// فائل سسٹم کا استعمال: فائل پڑھنا
app.get('/read-file', async (req, res) => {
  try {
    // example.txt پڑھیں (پہلے اس فائل کو بنانا ہو گا)
    const data = await fs.readFile('./example.txt', 'utf8');
    res.send(`File content: ${data}`);
  } catch (error) {
    res.status(500).send('Error reading file');
  }
});

// فائل سسٹم کا استعمال: فائل میں لکھنا
app.post('/write-file', async (req, res) => {
  const content = req.body.content;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  try {
    await fs.writeFile('./example.txt', content, 'utf8');
    res.json({ message: 'File written successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error writing file' });
  }
});

// سرور شروع کریں
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});