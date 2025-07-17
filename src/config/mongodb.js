const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const dbLink = process.env.MONGO_TEST_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/sweet-shop-test';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbLink);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB Connection Failed:', err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log(' MongoDB Disconnected');
  } catch (err) {
    console.error(' Disconnection Error:', err);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
