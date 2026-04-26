import {
  addToFavoriteImages,
  addToViewedImages,
  getFavoriteImages,
  getViewedImages,
  removeFromFavoriteImages,
  removeFromViewedImages,
  checkImageStatus,
} from '../services/image.js';

export const addToFavoritesImageController = async (req, res) => {
  const coverBuffer = req.file?.buffer || null;
  const image = await addToFavoriteImages(req.user._id, req.body, coverBuffer);

  res.status(201).json({
    status: 201,
    message: 'Image added to favorites',
    data: image,
  });
};

export const addToViewedImageController = async (req, res) => {
  const coverBuffer = req.file?.buffer || null;
  const image = await addToViewedImages(req.user._id, req.body, coverBuffer);

  res.status(201).json({
    status: 201,
    message: 'Image added to viewed list',
    data: image,
  });
};

export const getFavoriteImagesController = async (req, res) => {
  const images = await getFavoriteImages(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Favorite images retrieved successfully',
    data: images,
  });
};

export const getViewedImagesController = async (req, res) => {
  const images = await getViewedImages(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Viewed images retrieved successfully',
    data: images,
  });
};

export const removeFromFavoritesImageController = async (req, res) => {
  const { imageId } = req.params;

  await removeFromFavoriteImages(req.user._id, imageId);

  res.status(204).send();
};

export const removeFromViewedImageController = async (req, res) => {
  const { imageId } = req.params;

  await removeFromViewedImages(req.user._id, imageId);

  res.status(204).send();
};

export const checkImageStatusController = async (req, res) => {
  const { imageId } = req.params;
  const status = await checkImageStatus(req.user._id, imageId);

  res.status(200).json({
    status: 200,
    message: 'Image status retrieved successfully',
    data: status,
  });
};
