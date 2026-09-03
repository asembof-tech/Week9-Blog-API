const mongoose = require('mongoose');
const Article = require('../models/Article');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Create the text index for search functionality
    await Article.createIndexes({ title: 'text', content: 'text' });
    console.log('Text Index Created');

  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;