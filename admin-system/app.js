const express = require('express');
const dotenv = require('dotenv');
const { protect, isAdmin } = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(express.json());

// Admin Routes
app.get('/api/admin/users', protect, isAdmin, require('./controllers/adminController').getAllUsers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));