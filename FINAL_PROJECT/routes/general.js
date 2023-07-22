const express = require('express');
let books = require('../routes/booksdb.js');
const public_user= express.Router();

let users = [];

// Return all students details
public_user.get('/', (req, res) => {
  return res.status(200).json(books);
});


//Getting details based on ISBN
public_user.get('/:ISBN',(req,res)=>
{
      let ISBN = req.params.ISBN;
      findBook=books.filter((books)=>books.ISBN==ISBN);
  return res.status(200).json(findBook);
}
);

//Getting details based on author name
public_user.get('/author/:author',(req,res)=>
{
      let author = req.params.author;
      findAuthor=books.filter((books)=>books.author==author);
  return res.status(200).json(findAuthor);

}
);

//Getting details based on title
public_user.get('/title/:title',(req,res)=>
{
  
  let title = req.params.title;
  findTitle=books.filter((books)=>books.title==title);
  return res.status(200).json(findTitle);
}
);

//Retrieve comments for a specific book
public_user.get('/review/:ISBN',(req,res)=>
{
		let ISBN = req.params.ISBN;
        findReview=books.filter((books)=>books.ISBN==ISBN);
		return res.status(200).json(findReview[0].review);
}
);


// Register New user
public_user.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const doesExist = (username) => {
    const existingUser = users.find((user) => user.username === username);
    return !!existingUser;
  };

  if (username && password) {
    if (!doesExist(username)) {
      users.push({
        username: username,
        password: password,
      });
      return res.status(200).json({ message: 'User registered successfully' });
    } else {
      return res.status(400).json({ error: 'Username already exists' });
    }
  } else {
    return res.status(400).json({ error: 'Missing username or password' });
  }
});


//login user
public_user.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

module.exports = {
  general: public_user
};
