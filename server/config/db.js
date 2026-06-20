const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    // Mongoose v6+ and the underlying MongoDB driver no longer require
    // useNewUrlParser/useUnifiedTopology options — they are removed.
    // Call mongoose.connect with the URI only (you may pass supported options).
    await mongoose.connect(uri, {
      // You can keep a reasonable server selection timeout if desired
      serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    // Exit so the process manager knows startup failed
    process.exit(1);
  }
};

module.exports = connectDB;