const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const books = [
  {
    title: "harry potter",
    author: "Harry",
    id: "0",
  },
  {
    title: "Marry potter",
    author: "Marry",
    id: "1",
  },
  {
    title: "Cherry potter",
    author: "Cherry",
    id: "2",
  },
  {
    title: "larry potter",
    author: "Larry",
    id: "3",
  },
];
//create a book
app.post("/books", (req, res) => {
  // Logic to add a book
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send("Missing title or author");
  }
  const newBook = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(newBook);
  res.status(201).send(newBook);
});
// get All Books
app.get("/books", (req, res) => {
  res.json(books);
});

// get a single book

// app.get("/books/:id", (req, res) => {
//   // logic to get a single book
// });

// update a book
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("book not found");
  }
  res.json(book);
});

app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(400).send("Book not found");
  }
  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;

  res.send(book);
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send("Book not found");
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});
