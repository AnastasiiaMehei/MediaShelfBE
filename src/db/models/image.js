// src/db/models/image.js

import { model, Schema } from 'mongoose';

const imageSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    imageId: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    coverUrl: { type: String },
    coverPublicId: { type: String },
    description: { type: String },
    isFavorite: { type: Boolean, default: false },
    isViewed: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' },
    versionKey: false,
  },
);

imageSchema.index({ userId: 1, imageId: 1 }, { unique: true });

export const ImageCollection = model('images', imageSchema);
