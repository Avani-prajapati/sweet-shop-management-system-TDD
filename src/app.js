const express = require('express');
const dotenv = require('dotenv');
const sweetRoutes = require('./routers/sweetRouters');
const mongoose = require('mongoose');
const { connectDB ,disconnectDB} = require('./config/mongodb');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/sweets', sweetRoutes);

// Global error handler (optional)
const NODE_ENV = 'test';
if (NODE_ENV !== 'test') {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  });
}

module.exports = app;
