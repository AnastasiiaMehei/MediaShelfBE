
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/upload.js';
import {
  addToWatchlistController,
  addToFavoritesController,
  getWatchlistMoviesController,
  getFavoriteMoviesController,
  removeFromWatchlistController,
  removeFromFavoritesController,
  checkMovieStatusController,
} from '../controllers/movie.js';

const movieRouter = Router();

movieRouter.use(authenticate);

movieRouter.get(
  '/watchlist',
  ctrlWrapper(getWatchlistMoviesController),
);

movieRouter.post(
  '/watchlist',
  upload.single('poster'),
  ctrlWrapper(addToWatchlistController),
);

movieRouter.delete(
  '/watchlist/:movieId',
  ctrlWrapper(removeFromWatchlistController),
);

movieRouter.get(
  '/favorites',
  ctrlWrapper(getFavoriteMoviesController),
);

movieRouter.post(
  '/favorites',
  upload.single('poster'),
  ctrlWrapper(addToFavoritesController),
);

movieRouter.delete(
  '/favorites/:movieId',
  ctrlWrapper(removeFromFavoritesController),
);

movieRouter.get(
  '/:movieId/status',
  ctrlWrapper(checkMovieStatusController),
);

export default movieRouter;
