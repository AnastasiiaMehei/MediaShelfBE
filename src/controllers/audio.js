
import createHttpError from 'http-errors';
import { parseBuffer } from 'music-metadata';
import { createAudio, getAllAudio, getAudioById, deleteAudio, duplicateAudio } from '../services/audio.js';

export const uploadAudioController = async (req, res) => {
  const audioFile = req.file;
  const { title, duration, format, type, description } = req.body;

  if (!audioFile) {
    throw createHttpError(400, 'Audio file is required');
  }

  let metadata;
  try {
    metadata = await parseBuffer(audioFile.buffer, audioFile.mimetype, { duration: true });
  } catch (error) {
    metadata = { common: {}, format: {} };
  }

  const metadataTitle = metadata.common?.title;
  const metadataFormat = metadata.format?.container || metadata.format?.codec || audioFile.mimetype?.split('/').pop();
  const metadataDuration = metadata.format?.duration;
  const metadataType = metadata.common?.genre?.[0] || metadata.common?.album || 'audio';
  const picture = metadata.common?.picture?.[0];
  const coverFile = picture ? { buffer: picture.data, mimetype: picture.format || 'image/jpeg' } : null;
  const resolvedFormat = format || metadataFormat || audioFile.originalname?.split('.').pop() || audioFile.mimetype?.split('/').pop();
  const resolvedTitle = title || metadataTitle || audioFile.originalname?.replace(/\.[^/.]+$/, '');
  const resolvedDuration = duration ? Number(duration) : metadataDuration;
  const resolvedType = type || metadataType || 'audio';

  if (!resolvedTitle) {
    throw createHttpError(400, 'Title is required either in metadata or request body');
  }

  if (!resolvedDuration || Number.isNaN(Number(resolvedDuration)) || Number(resolvedDuration) <= 0) {
    throw createHttpError(400, 'Duration must be a positive number');
  }

  if (!resolvedFormat) {
    throw createHttpError(400, 'Format is required either in metadata or request body');
  }

  if (!resolvedType) {
    throw createHttpError(400, 'Type is required either in metadata or request body');
  }

  const audio = await createAudio(
    {
      title: resolvedTitle,
      duration: Number(resolvedDuration),
      format: resolvedFormat,
      audioType: resolvedType,
      description,
    },
    audioFile,
    coverFile,
    req.user._id,
  );

  res.status(201).json({
    status: 201,
    message: 'Audio uploaded successfully',
    data: audio,
  });
};

export const getAudioListController = async (req, res) => {
  const audioList = await getAllAudio(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Audio list retrieved successfully',
    data: audioList,
  });
};

export const getAudioController = async (req, res) => {
  const { audioId } = req.params;
  const audio = await getAudioById(audioId, req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Audio retrieved successfully',
    data: audio,
  });
};

export const deleteAudioController = async (req, res) => {
  const { audioId } = req.params;
  await deleteAudio(audioId, req.user._id);

  res.status(204).send();
};

export const duplicateAudioController = async (req, res) => {
  const { audioId } = req.params;
  const audioCopy = await duplicateAudio(audioId, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Audio duplicated successfully',
    data: audioCopy,
  });
};
