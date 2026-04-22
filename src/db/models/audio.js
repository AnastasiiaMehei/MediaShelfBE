
import { model, Schema } from 'mongoose';

const audioSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true },
    audioUrl: { type: String, required: true },
    audioPublicId: { type: String, required: true },
    coverUrl: { type: String },
    coverPublicId: { type: String },
    size: { type: Number, required: true },
    duration: { type: Number, required: true },
    format: { type: String, required: true },
    audioType: { type: String, required: true },
    mimeType: { type: String, required: true },
    coverMimeType: { type: String },
    description: { type: String },
  },
  {
    timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' },
    versionKey: false,
  },
);

export const AudioCollection = model('audio', audioSchema);
