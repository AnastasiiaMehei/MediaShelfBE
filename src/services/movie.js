
import createHttpError from 'http-errors';
import { MovieCollection } from '../db/models/movie.js';
import { uploadToCloudinary, destroyFromCloudinary } from '../utils/cloudinary.js';

export const addToWatchlist = async (userId, movieData, posterBuffer = null) => {
  const { movieId, title, posterUrl, releaseDate, rating, overview, genres } = movieData;

  if (!movieId || !title) {
    throw createHttpError(400, 'Movie ID and title are required');
  }

  const existingMovie = await MovieCollection.findOne({ userId, movieId });

  let cloudinaryPublicId = null;

  if (posterBuffer) {
    try {
      const posterResult = await uploadToCloudinary(posterBuffer, 'movies_posters', {
        resource_type: 'image',
        folder: 'movies_posters',
      });
      cloudinaryPublicId = posterResult.public_id;
    } catch (error) {
      console.warn('Cloudinary poster upload failed', error);
    }
  }

  if (existingMovie) {
    existingMovie.isWatchlist = true;
    if (cloudinaryPublicId) {
      if (existingMovie.posterPublicId) {
        await destroyFromCloudinary(existingMovie.posterPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingMovie.posterPublicId = cloudinaryPublicId;
    }
    await existingMovie.save();
    return existingMovie;
  }

  const movie = await MovieCollection.create({
    userId,
    movieId,
    title,
    posterUrl: posterUrl || null,
    posterPublicId: cloudinaryPublicId,
    releaseDate: releaseDate || null,
    rating: rating || null,
    overview: overview || null,
    genres: genres || [],
    isWatchlist: true,
    isFavorite: false,
  });

  return movie;
};

export const addToFavorites = async (userId, movieData, posterBuffer = null) => {
  const { movieId, title, posterUrl, releaseDate, rating, overview, genres } = movieData;

  if (!movieId || !title) {
    throw createHttpError(400, 'Movie ID and title are required');
  }

  const existingMovie = await MovieCollection.findOne({ userId, movieId });

  let cloudinaryPublicId = null;

  if (posterBuffer) {
    try {
      const posterResult = await uploadToCloudinary(posterBuffer, 'movies_posters', {
        resource_type: 'image',
        folder: 'movies_posters',
      });
      cloudinaryPublicId = posterResult.public_id;
    } catch (error) {
      console.warn('Cloudinary poster upload failed', error);
    }
  }

  if (existingMovie) {
    existingMovie.isFavorite = true;
    if (cloudinaryPublicId) {
      if (existingMovie.posterPublicId) {
        await destroyFromCloudinary(existingMovie.posterPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingMovie.posterPublicId = cloudinaryPublicId;
    }
    await existingMovie.save();
    return existingMovie;
  }

  const movie = await MovieCollection.create({
    userId,
    movieId,
    title,
    posterUrl: posterUrl || null,
    posterPublicId: cloudinaryPublicId,
    releaseDate: releaseDate || null,
    rating: rating || null,
    overview: overview || null,
    genres: genres || [],
    isWatchlist: false,
    isFavorite: true,
  });

  return movie;
};

export const getWatchlistMovies = async (userId) => {
  return await MovieCollection.find({ userId, isWatchlist: true }).sort({ addedAt: -1 });
};

export const getFavoriteMovies = async (userId) => {
  return await MovieCollection.find({ userId, isFavorite: true }).sort({ addedAt: -1 });
};

export const removeFromWatchlist = async (userId, movieId) => {
  const movie = await MovieCollection.findOne({ userId, movieId });

  if (!movie) {
    throw createHttpError(404, 'Movie not found in watchlist');
  }

  movie.isWatchlist = false;

  if (!movie.isFavorite) {
    if (movie.posterPublicId) {
      try {
        await destroyFromCloudinary(movie.posterPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary poster delete problem:', error);
      }
    }
    await MovieCollection.deleteOne({ _id: movie._id, userId });
  } else {
    await movie.save();
  }

  return movie;
};

export const removeFromFavorites = async (userId, movieId) => {
  const movie = await MovieCollection.findOne({ userId, movieId });

  if (!movie) {
    throw createHttpError(404, 'Movie not found in favorites');
  }

  movie.isFavorite = false;

  if (!movie.isWatchlist) {
    if (movie.posterPublicId) {
      try {
        await destroyFromCloudinary(movie.posterPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary poster delete problem:', error);
      }
    }
    await MovieCollection.deleteOne({ _id: movie._id, userId });
  } else {
    await movie.save();
  }

  return movie;
};

export const checkMovieStatus = async (userId, movieId) => {
  const movie = await MovieCollection.findOne({ userId, movieId });

  if (!movie) {
    return {
      inWatchlist: false,
      inFavorites: false,
    };
  }

  return {
    inWatchlist: movie.isWatchlist,
    inFavorites: movie.isFavorite,
  };
};
