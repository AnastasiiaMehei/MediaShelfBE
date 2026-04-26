
import createHttpError from 'http-errors';
import { VideoCollection } from '../db/models/video.js';
import { uploadToCloudinary, destroyFromCloudinary } from '../utils/cloudinary.js';

const uploadCover = async (coverBuffer) => {
  const coverResult = await uploadToCloudinary(coverBuffer, 'video_covers', {
    resource_type: 'image',
    folder: 'video_covers',
  });

  return {
    coverPublicId: coverResult.public_id,
  };
};

export const addToFavoriteVideos = async (userId, videoData, coverBuffer = null) => {
  const { videoId, title, videoUrl, description, duration } = videoData;

  if (!videoId || !title || !videoUrl) {
    throw createHttpError(400, 'Video ID, title and URL are required');
  }

  const existingVideo = await VideoCollection.findOne({ userId, videoId });

  let coverPublicId = null;
  if (coverBuffer) {
    const uploadResult = await uploadCover(coverBuffer);
    coverPublicId = uploadResult.coverPublicId;
  }

  if (existingVideo) {
    existingVideo.isFavorite = true;
    if (coverPublicId) {
      if (existingVideo.coverPublicId) {
        await destroyFromCloudinary(existingVideo.coverPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingVideo.coverPublicId = coverPublicId;
    }
    await existingVideo.save();
    return existingVideo;
  }

  return await VideoCollection.create({
    userId,
    videoId,
    title,
    videoUrl,
    description: description || null,
    duration: duration ? Number(duration) : null,
    coverUrl: videoData.coverUrl || null,
    coverPublicId: coverPublicId,
    isFavorite: true,
    isViewed: false,
  });
};

export const addToViewedVideos = async (userId, videoData, coverBuffer = null) => {
  const { videoId, title, videoUrl, description, duration } = videoData;

  if (!videoId || !title || !videoUrl) {
    throw createHttpError(400, 'Video ID, title and URL are required');
  }

  const existingVideo = await VideoCollection.findOne({ userId, videoId });

  let coverPublicId = null;
  if (coverBuffer) {
    const uploadResult = await uploadCover(coverBuffer);
    coverPublicId = uploadResult.coverPublicId;
  }

  if (existingVideo) {
    existingVideo.isViewed = true;
    if (coverPublicId) {
      if (existingVideo.coverPublicId) {
        await destroyFromCloudinary(existingVideo.coverPublicId, { resource_type: 'image' }).catch(() => {});
      }
      existingVideo.coverPublicId = coverPublicId;
    }
    await existingVideo.save();
    return existingVideo;
  }

  return await VideoCollection.create({
    userId,
    videoId,
    title,
    videoUrl,
    description: description || null,
    duration: duration ? Number(duration) : null,
    coverUrl: videoData.coverUrl || null,
    coverPublicId: coverPublicId,
    isFavorite: false,
    isViewed: true,
  });
};

export const getFavoriteVideos = async (userId) => {
  return await VideoCollection.find({ userId, isFavorite: true }).sort({ addedAt: -1 });
};

export const getViewedVideos = async (userId) => {
  return await VideoCollection.find({ userId, isViewed: true }).sort({ addedAt: -1 });
};

export const removeFromFavoriteVideos = async (userId, videoId) => {
  const video = await VideoCollection.findOne({ userId, videoId });

  if (!video) {
    throw createHttpError(404, 'Video not found in favorites');
  }

  video.isFavorite = false;
  if (!video.isViewed) {
    if (video.coverPublicId) {
      try {
        await destroyFromCloudinary(video.coverPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary cover delete problem:', error);
      }
    }
    await VideoCollection.deleteOne({ _id: video._id, userId });
  } else {
    await video.save();
  }

  return video;
};

export const removeFromViewedVideos = async (userId, videoId) => {
  const video = await VideoCollection.findOne({ userId, videoId });

  if (!video) {
    throw createHttpError(404, 'Video not found in viewed list');
  }

  video.isViewed = false;
  if (!video.isFavorite) {
    if (video.coverPublicId) {
      try {
        await destroyFromCloudinary(video.coverPublicId, { resource_type: 'image' });
      } catch (error) {
        console.warn('Cloudinary cover delete problem:', error);
      }
    }
    await VideoCollection.deleteOne({ _id: video._id, userId });
  } else {
    await video.save();
  }

  return video;
};

export const checkVideoStatus = async (userId, videoId) => {
  const video = await VideoCollection.findOne({ userId, videoId });
  if (!video) {
    return { isFavorite: false, isViewed: false };
  }
  return { isFavorite: video.isFavorite, isViewed: video.isViewed };
};
