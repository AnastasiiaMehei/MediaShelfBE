
import { model, Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    bookId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String },
    coverUrl: { type: String },
    coverPublicId: { type: String },
    rating: { type: Number },
    description: { type: String },
    isFavorite: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' },
    versionKey: false,
  },
);

bookSchema.index({ userId: 1, bookId: 1 }, { unique: true });

export const BookCollection = model('books', bookSchema);
