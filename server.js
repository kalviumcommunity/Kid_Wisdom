require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON
app.use(require('./routes')); // Import routes

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return "Connected to MongoDB";
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return "MongoDB connection failed";
  }
}

// Home route to show DB connection status
app.get('/', async (req, res) => {
  const status = await connectDB();
  res.send({ dbStatus: status });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
