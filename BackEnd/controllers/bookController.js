import Book from '../models/bookModel.js';
import path from 'path';
import fs from 'fs';

// create book
export const createBook = async (req, res, next) => {
  try {
    const filename = req.file?.filename ?? null;
    const imagePath = filename ? `/uploads/${filename}` : null;

    const { title, author, price, rating, category, description } = req.body;

    const book = new Book({
      title,
      author,
      price,
      rating,
      category,
      description,
      image: imagePath
    });

    const saved = await book.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

// get all books
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// delete a book
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // delete image from filesystem if exists
    if (book.image) {
      const filePath = path.join(process.cwd(), "uploads", path.basename(book.image));

      fs.unlink(filePath, (error) => {
        if (error) {
          console.warn("Failed to delete image file:", error);
        }
      });
    }

    res.json({ message: "Book deleted successfully." });
  } catch (error) {
    next(error);
  }
};
