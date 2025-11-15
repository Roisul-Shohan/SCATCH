const mongoose = require('mongoose');

const dbgr = require('debug')('development:mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.DATABASE_URL;
    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }
    await mongoose.connect(mongoURI);
    dbgr('✅ MongoDB Connected Successfully');
  } catch (err) {
    dbgr('❌ MongoDB Connection Error:', err);
    throw err;
  }
};

connectDB();

module.exports = mongoose.connection;
