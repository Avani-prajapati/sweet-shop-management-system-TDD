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
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  });
}

module.exports = app;
