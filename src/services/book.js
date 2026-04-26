
import createHttpError from 'http-errors';
import { BookCollection } from '../db/models/book.js';
import { uploadToCloudinary, destroyFromCloudinary } from '../utils/cloudinary.js';

export const addToFavorites = async (userId, bookData, coverBuffer = null) => {
  const { bookId, title, coverUrl, author, rating, description } = bookData;

  if (!bookId || !title) {
    throw createHttpError(400, 'Book ID and title are required');
  }

  const existingBook = await BookCollection.findOne({ userId, bookId });

  let cloudinaryPublicId = null;

  if (coverBuffer) {
    try {
      const coverResult = await uploadToCloudinary(coverBuffer, 'books_covers', {
        resource_type: 'image',
        folder: 'books_covers',
      });
      cloudinaryPublicId = coverResult.public_id;
    } catch (error) {
      console.warn('Cloudinary cover upload failed', error);
    }
  }

  if (existingBook) {
    existingBook.isFavorite = true;
    if (cloudinaryPublicId) {
      if (existingBook.coverPublicId) {
        await destroyFromCloudinary(existingBook.coverPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingBook.coverPublicId = cloudinaryPublicId;
    }
    await existingBook.save();
    return existingBook;
  }

  const book = await BookCollection.create({
    userId,
    bookId,
    title,
    author: author || null,
    coverUrl: coverUrl || null,
    coverPublicId: cloudinaryPublicId,
    rating: rating || null,
    description: description || null,
    isFavorite: true,
    isRead: false,
  });

  return book;
};

export const addToRead = async (userId, bookData, coverBuffer = null) => {
  const { bookId, title, coverUrl, author, rating, description } = bookData;

  if (!bookId || !title) {
    throw createHttpError(400, 'Book ID and title are required');
  }

  const existingBook = await BookCollection.findOne({ userId, bookId });

  let cloudinaryPublicId = null;

  if (coverBuffer) {
    try {
      const coverResult = await uploadToCloudinary(coverBuffer, 'books_covers', {
        resource_type: 'image',
        folder: 'books_covers',
      });
      cloudinaryPublicId = coverResult.public_id;
    } catch (error) {
      console.warn('Cloudinary cover upload failed', error);
    }
  }

  if (existingBook) {
    existingBook.isRead = true;
    if (cloudinaryPublicId) {
      if (existingBook.coverPublicId) {
        await destroyFromCloudinary(existingBook.coverPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingBook.coverPublicId = cloudinaryPublicId;
    }
    await existingBook.save();
    return existingBook;
  }

  const book = await BookCollection.create({
    userId,
    bookId,
    title,
    author: author || null,
    coverUrl: coverUrl || null,
    coverPublicId: cloudinaryPublicId,
    rating: rating || null,
    description: description || null,
    isFavorite: false,
    isRead: true,
  });

  return book;
};

export const getFavoriteBooks = async (userId) => {
  return await BookCollection.find({ userId, isFavorite: true }).sort({ addedAt: -1 });
};

export const getReadBooks = async (userId) => {
  return await BookCollection.find({ userId, isRead: true }).sort({ addedAt: -1 });
};

export const removeFromFavorites = async (userId, bookId) => {
  const book = await BookCollection.findOne({ userId, bookId });

  if (!book) {
    throw createHttpError(404, 'Book not found in favorites');
  }

  book.isFavorite = false;

  if (!book.isRead) {
    if (book.coverPublicId) {
      try {
        await destroyFromCloudinary(book.coverPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary cover delete problem:', error);
      }
    }
    await BookCollection.deleteOne({ _id: book._id, userId });
  } else {
    await book.save();
  }

  return book;
};

export const removeFromRead = async (userId, bookId) => {
  const book = await BookCollection.findOne({ userId, bookId });

  if (!book) {
    throw createHttpError(404, 'Book not found in read list');
  }

  book.isRead = false;

  if (!book.isFavorite) {
    if (book.coverPublicId) {
      try {
        await destroyFromCloudinary(book.coverPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary cover delete problem:', error);
      }
    }
    await BookCollection.deleteOne({ _id: book._id, userId });
  } else {
    await book.save();
  }

  return book;
};

export const checkBookStatus = async (userId, bookId) => {
  const book = await BookCollection.findOne({ userId, bookId });

  if (!book) {
    return {
      inFavorites: false,
      isRead: false,
    };
  }

  return {
    inFavorites: book.isFavorite,
    isRead: book.isRead,
  };
};
