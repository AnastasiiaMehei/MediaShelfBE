// src/services/audio.js

import createHttpError from 'http-errors';
import { AudioCollection } from '../db/models/audio.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { destroyFromCloudinary } from '../utils/cloudinary.js';

export const createAudio = async ({ title, duration, format, audioType, description }, audioFile, coverFile, userId) => {
  if (!audioFile) {
    throw createHttpError(400, 'Audio file is required');
  }

  let audioResult;
  try {
    console.log('Starting audio upload, file size:', audioFile.size);
    audioResult = await uploadToCloudinary(audioFile.buffer, 'audio', {
      resource_type: 'video',
      folder: 'audio',
    });
  } catch (error) {
    console.error('Audio upload service error:', error.message || error);
    throw createHttpError(502, `Cloudinary: ${error.message || 'Upload failed'}`);
  }

  if (!audioResult || !audioResult.secure_url) {
    throw createHttpError(502, 'Cloudinary failed to upload audio file');
  }

  let coverResult = null;
  if (coverFile) {
    try {
      coverResult = await uploadToCloudinary(coverFile.buffer, 'audio_covers', {
        resource_type: 'image',
        folder: 'audio_covers',
      });
    } catch (error) {
      console.warn('Cloudinary cover upload failed, continuing without cover', error);
      coverResult = null;
    }
  }

  const audioDoc = await AudioCollection.create({
    userId,
    title,
    audioUrl: audioResult.secure_url,
    audioPublicId: audioResult.public_id,
    coverUrl: coverResult?.secure_url,
    coverPublicId: coverResult?.public_id,
    size: audioFile.size,
    duration,
    format,
    audioType,
    mimeType: audioFile.mimetype,
    coverMimeType: coverFile?.mimetype,
    description,
  });

  return audioDoc;
};

export const getAllAudio = async (userId) => {
  return await AudioCollection.find({ userId }).sort({ addedAt: -1 });
};

export const getAudioById = async (audioId, userId) => {
  const audio = await AudioCollection.findOne({ _id: audioId, userId });
  if (!audio) {
    throw createHttpError(404, 'Audio not found');
  }
  return audio;
};

export const deleteAudio = async (audioId, userId) => {
  const audio = await AudioCollection.findOne({ _id: audioId, userId });
  if (!audio) {
    throw createHttpError(404, 'Audio not found');
  }

  const deleteAudioResult = await destroyFromCloudinary(audio.audioPublicId, { resource_type: 'raw' });
  if (!deleteAudioResult || deleteAudioResult.result !== 'ok') {
    console.warn('Cloudinary audio delete problem:', deleteAudioResult);
  }

  if (audio.coverPublicId) {
    const deleteCoverResult = await destroyFromCloudinary(audio.coverPublicId, { resource_type: 'image' });
    if (!deleteCoverResult || deleteCoverResult.result !== 'ok') {
      console.warn('Cloudinary cover delete problem:', deleteCoverResult);
    }
  }

  await AudioCollection.deleteOne({ _id: audioId, userId });
  return audio;
};

export const duplicateAudio = async (audioId, userId) => {
  const audio = await getAudioById(audioId, userId);

  const duplicate = await AudioCollection.create({
    userId,
    title: `${audio.title} (copy)`,
    audioUrl: audio.audioUrl,
    audioPublicId: audio.audioPublicId,
    coverUrl: audio.coverUrl,
    coverPublicId: audio.coverPublicId,
    size: audio.size,
    duration: audio.duration,
    format: audio.format,
    audioType: audio.audioType,
    mimeType: audio.mimeType,
    coverMimeType: audio.coverMimeType,
    description: audio.description,
  });

  return duplicate;
};
