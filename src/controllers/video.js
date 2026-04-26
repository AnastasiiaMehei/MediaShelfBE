import {
  addToFavoriteVideos,
  addToViewedVideos,
  getFavoriteVideos,
  getViewedVideos,
  removeFromFavoriteVideos,
  removeFromViewedVideos,
  checkVideoStatus,
} from '../services/video.js';

export const addToFavoritesVideoController = async (req, res) => {
  const coverBuffer = req.file?.buffer || null;
  const video = await addToFavoriteVideos(req.user._id, req.body, coverBuffer);

  res.status(201).json({
    status: 201,
    message: 'Video added to favorites',
    data: video,
  });
};

export const addToViewedVideoController = async (req, res) => {
  const coverBuffer = req.file?.buffer || null;
  const video = await addToViewedVideos(req.user._id, req.body, coverBuffer);

  res.status(201).json({
    status: 201,
    message: 'Video added to viewed list',
    data: video,
  });
};

export const getFavoriteVideosController = async (req, res) => {
  const videos = await getFavoriteVideos(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Favorite videos retrieved successfully',
    data: videos,
  });
};

export const getViewedVideosController = async (req, res) => {
  const videos = await getViewedVideos(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Viewed videos retrieved successfully',
    data: videos,
  });
};

export const removeFromFavoritesVideoController = async (req, res) => {
  const { videoId } = req.params;

  await removeFromFavoriteVideos(req.user._id, videoId);

  res.status(204).send();
};

export const removeFromViewedVideoController = async (req, res) => {
  const { videoId } = req.params;

  await removeFromViewedVideos(req.user._id, videoId);

  res.status(204).send();
};

export const checkVideoStatusController = async (req, res) => {
  const { videoId } = req.params;
  const status = await checkVideoStatus(req.user._id, videoId);

  res.status(200).json({
    status: 200,
    message: 'Video status retrieved successfully',
    data: status,
  });
};
