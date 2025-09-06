require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');

const app = express();


app.use(cors());
app.use(express.json());



if (!process.env.MONGO_URI) {
  console.error('MONGO_URI environment variable is not set!');
  process.exit(1);
}


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Connection string used:', process.env.MONGO_URI);
  });


app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('Blogging API running 🚀'));


app.use('/api/posts', postRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
