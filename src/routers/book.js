
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/upload.js';
import {
  addToFavoritesController,
  addToReadController,
  getFavoriteBooksController,
  getReadBooksController,
  removeFromFavoritesController,
  removeFromReadController,
  checkBookStatusController,
} from '../controllers/book.js';

const bookRouter = Router();

bookRouter.use(authenticate);

bookRouter.get(
  '/favorites',
  ctrlWrapper(getFavoriteBooksController),
);

bookRouter.post(
  '/favorites',
  upload.single('cover'),
  ctrlWrapper(addToFavoritesController),
);

bookRouter.delete(
  '/favorites/:bookId',
  ctrlWrapper(removeFromFavoritesController),
);

bookRouter.get(
  '/read',
  ctrlWrapper(getReadBooksController),
);

bookRouter.post(
  '/read',
  upload.single('cover'),
  ctrlWrapper(addToReadController),
);

bookRouter.delete(
  '/read/:bookId',
  ctrlWrapper(removeFromReadController),
);

// Перевірка статусу книги
bookRouter.get(
  '/:bookId/status',
  ctrlWrapper(checkBookStatusController),
);

export default bookRouter;
