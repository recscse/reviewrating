const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

// Connect to MongoDB (replace 'your-mongodb-uri' with your MongoDB connection string)
mongoose.connect('mongodb+srv://brijeshyadav30599:KueLtVDP5h400jRp@cluster0.cmimmxb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Review model
const Review = mongoose.model('Review', {
  user: String,
  rating: Number,
  comment: String,
});

// Middleware for parsing JSON
app.use(express.json());

// Route to submit a review
app.post('/reviews', async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const newReview = new Review({ user, rating, comment });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all reviews
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
