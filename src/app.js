const express = require('express');
const dotenv = require('dotenv');
const sweetRoutes = require('./routers/sweetRouters');

dotenv.config();

const app = express();

app.use(express.json());

// Route setup
app.use('/api/sweets', sweetRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
