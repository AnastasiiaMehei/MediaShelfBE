
import {
  addToWatchlist,
  addToFavorites,
  getWatchlistMovies,
  getFavoriteMovies,
  removeFromWatchlist,
  removeFromFavorites,
  checkMovieStatus,
} from '../services/movie.js';

export const addToWatchlistController = async (req, res) => {
  const posterBuffer = req.file?.buffer || null;
  const movie = await addToWatchlist(req.user._id, req.body, posterBuffer);

  res.status(201).json({
    status: 201,
    message: 'Movie added to watchlist',
    data: movie,
  });
};

export const addToFavoritesController = async (req, res) => {
  const posterBuffer = req.file?.buffer || null;
  const movie = await addToFavorites(req.user._id, req.body, posterBuffer);

  res.status(201).json({
    status: 201,
    message: 'Movie added to favorites',
    data: movie,
  });
};

export const getWatchlistMoviesController = async (req, res) => {
  const movies = await getWatchlistMovies(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Watchlist movies retrieved successfully',
    data: movies,
  });
};

export const getFavoriteMoviesController = async (req, res) => {
  const movies = await getFavoriteMovies(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Favorite movies retrieved successfully',
    data: movies,
  });
};

export const removeFromWatchlistController = async (req, res) => {
  const { movieId } = req.params;

  await removeFromWatchlist(req.user._id, movieId);

  res.status(204).send();
};

export const removeFromFavoritesController = async (req, res) => {
  const { movieId } = req.params;

  await removeFromFavorites(req.user._id, movieId);

  res.status(204).send();
};

export const checkMovieStatusController = async (req, res) => {
  const { movieId } = req.params;

  const status = await checkMovieStatus(req.user._id, movieId);

  res.status(200).json({
    status: 200,
    message: 'Movie status retrieved successfully',
    data: status,
  });
};
