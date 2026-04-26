
import {
  addToFavorites,
  addToRead,
  getFavoriteBooks,
  getReadBooks,
  removeFromFavorites,
  removeFromRead,
  checkBookStatus,
} from '../services/book.js';

export const addToFavoritesController = async (req, res) => {
  const coverBuffer = req.file?.buffer || null;
  const book = await addToFavorites(req.user._id, req.body, coverBuffer);

  res.status(201).json({
    status: 201,
    message: 'Book added to favorites',
    data: book,
  });
};

export const addToReadController = async (req, res) => {
  const coverBuffer = req.file?.buffer || null;
  const book = await addToRead(req.user._id, req.body, coverBuffer);

  res.status(201).json({
    status: 201,
    message: 'Book added to read list',
    data: book,
  });
};

export const getFavoriteBooksController = async (req, res) => {
  const books = await getFavoriteBooks(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Favorite books retrieved successfully',
    data: books,
  });
};

export const getReadBooksController = async (req, res) => {
  const books = await getReadBooks(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Read books retrieved successfully',
    data: books,
  });
};

export const removeFromFavoritesController = async (req, res) => {
  const { bookId } = req.params;

  await removeFromFavorites(req.user._id, bookId);

  res.status(204).send();
};

export const removeFromReadController = async (req, res) => {
  const { bookId } = req.params;

  await removeFromRead(req.user._id, bookId);

  res.status(204).send();
};

export const checkBookStatusController = async (req, res) => {
  const { bookId } = req.params;

  const status = await checkBookStatus(req.user._id, bookId);

  res.status(200).json({
    status: 200,
    message: 'Book status retrieved successfully',
    data: status,
  });
};
