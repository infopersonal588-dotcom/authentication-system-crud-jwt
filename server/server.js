const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// Ensure dotenv loads the .env located in the server folder
dotenv.config({ path: path.resolve(__dirname, '.env') });
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'API is running' });
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('MONGO_URI =', process.env.MONGO_URI ? 'set' : 'not set');
      console.log('JWT_SECRET =', process.env.JWT_SECRET ? 'set' : 'not set');
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
        console.error('Kill the process using that port or set a different PORT in .env');
        process.exit(1);
      }
      console.error('Server error:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    console.log("MONGO_URI:", process.env.MONGO_URI);
    process.exit(1);
  }
};

start();
