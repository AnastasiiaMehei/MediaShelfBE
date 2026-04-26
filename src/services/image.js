
import createHttpError from 'http-errors';
import { ImageCollection } from '../db/models/image.js';
import { uploadToCloudinary, destroyFromCloudinary } from '../utils/cloudinary.js';

const uploadCover = async (coverBuffer) => {
  const coverResult = await uploadToCloudinary(coverBuffer, 'image_covers', {
    resource_type: 'image',
    folder: 'image_covers',
  });

  return {
    coverPublicId: coverResult.public_id,
  };
};

export const addToFavoriteImages = async (userId, imageData, coverBuffer = null) => {
  const { imageId, title, imageUrl, description } = imageData;

  if (!imageId || !title || !imageUrl) {
    throw createHttpError(400, 'Image ID, title and URL are required');
  }

  const existingImage = await ImageCollection.findOne({ userId, imageId });

  let coverPublicId = null;
  if (coverBuffer) {
    const uploadResult = await uploadCover(coverBuffer);
    coverPublicId = uploadResult.coverPublicId;
  }

  if (existingImage) {
    existingImage.isFavorite = true;
    if (coverPublicId) {
      if (existingImage.coverPublicId) {
        await destroyFromCloudinary(existingImage.coverPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingImage.coverPublicId = coverPublicId;
    }
    await existingImage.save();
    return existingImage;
  }

  return await ImageCollection.create({
    userId,
    imageId,
    title,
    imageUrl,
    description: description || null,
    coverUrl: imageData.coverUrl || null,
    coverPublicId: coverPublicId,
    isFavorite: true,
    isViewed: false,
  });
};

export const addToViewedImages = async (userId, imageData, coverBuffer = null) => {
  const { imageId, title, imageUrl, description } = imageData;

  if (!imageId || !title || !imageUrl) {
    throw createHttpError(400, 'Image ID, title and URL are required');
  }

  const existingImage = await ImageCollection.findOne({ userId, imageId });

  let coverPublicId = null;
  if (coverBuffer) {
    const uploadResult = await uploadCover(coverBuffer);
    coverPublicId = uploadResult.coverPublicId;
  }

  if (existingImage) {
    existingImage.isViewed = true;
    if (coverPublicId) {
      if (existingImage.coverPublicId) {
        await destroyFromCloudinary(existingImage.coverPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingImage.coverPublicId = coverPublicId;
    }
    await existingImage.save();
    return existingImage;
  }

  return await ImageCollection.create({
    userId,
    imageId,
    title,
    imageUrl,
    description: description || null,
    coverUrl: imageData.coverUrl || null,
    coverPublicId: coverPublicId,
    isFavorite: false,
    isViewed: true,
  });
};

export const getFavoriteImages = async (userId) => {
  return await ImageCollection.find({ userId, isFavorite: true }).sort({ addedAt: -1 });
};

export const getViewedImages = async (userId) => {
  return await ImageCollection.find({ userId, isViewed: true }).sort({ addedAt: -1 });
};

export const removeFromFavoriteImages = async (userId, imageId) => {
  const image = await ImageCollection.findOne({ userId, imageId });

  if (!image) {
    throw createHttpError(404, 'Image not found in favorites');
  }

  image.isFavorite = false;
  if (!image.isViewed) {
    if (image.coverPublicId) {
      try {
        await destroyFromCloudinary(image.coverPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary cover delete problem:', error);
      }
    }
    await ImageCollection.deleteOne({ _id: image._id, userId });
  } else {
    await image.save();
  }

  return image;
};

export const removeFromViewedImages = async (userId, imageId) => {
  const image = await ImageCollection.findOne({ userId, imageId });

  if (!image) {
    throw createHttpError(404, 'Image not found in viewed list');
  }

  image.isViewed = false;
  if (!image.isFavorite) {
    if (image.coverPublicId) {
      try {
        await destroyFromCloudinary(image.coverPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary cover delete problem:', error);
      }
    }
    await ImageCollection.deleteOne({ _id: image._id, userId });
  } else {
    await image.save();
  }

  return image;
};

export const checkImageStatus = async (userId, imageId) => {
  const image = await ImageCollection.findOne({ userId, imageId });
  if (!image) {
    return { isFavorite: false, isViewed: false };
  }
  return { isFavorite: image.isFavorite, isViewed: image.isViewed };
};
