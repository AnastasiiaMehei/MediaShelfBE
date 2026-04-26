// src/db/models/video.js

import { model, Schema } from 'mongoose';

const videoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    coverUrl: { type: String },
    coverPublicId: { type: String },
    description: { type: String },
    duration: { type: Number },
    isFavorite: { type: Boolean, default: false },
    isViewed: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' },
    versionKey: false,
  },
);

videoSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const VideoCollection = model('videos', videoSchema);
