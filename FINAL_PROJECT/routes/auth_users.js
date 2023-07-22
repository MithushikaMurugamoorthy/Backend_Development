
const express = require('express');
let books = require('../routes/booksdb.js');
const auth = express.Router();


const jwt = require('jsonwebtoken');
const config = require('../config'); 



// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization; 

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
   
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};



// Add a new review of books 
auth.post('/reviews', authenticateUser, (req, res) => {
  const { bookId, review } = req.body;
  
  // Find the book with the specified bookId
  const book = books.find((book) => book.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Add the new review to the book
  book.reviews.push(review);

  res.status(200).json({ message: 'Review added successfully' });
});




// Modify a book review 
auth.put('/reviews/:reviewId', authenticateUser, (req, res) => {
  const reviewId = req.params.reviewId;
  const { review } = req.body;

  // Find the book by reviewId
  const book = books.find((book) => book.reviews.some((r) => r.id === reviewId));
  if (!book) {
    return res.status(404).json({ error: 'Review not found' });
  }

  
  const reviewIndex = book.reviews.findIndex((r) => r.id === reviewId);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  // Update the review 
  book.reviews[reviewIndex].content = review;

  res.status(200).json({ message: 'Review modified successfully' });
});




// Delete a book review 
auth.delete('/reviews/:reviewId', authenticateUser, (req, res) => {
  const reviewId = req.params.reviewId;

  // Find the book by reviewId
  const book = books.find((book) => book.reviews.some((r) => r.id === reviewId));
  if (!book) {
    return res.status(404).json({ error: 'Review not found' });
  }

  // Filter out the review 
  book.reviews = book.reviews.filter((r) => r.id !== reviewId);

  res.status(200).json({ message: 'Review deleted successfully' });
});

module.exports = auth;



    