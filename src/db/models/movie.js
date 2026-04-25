
import { model, Schema } from 'mongoose';

const movieSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    posterUrl: { type: String },
    posterPublicId: { type: String },
    releaseDate: { type: String },
    rating: { type: Number },
    overview: { type: String },
    genres: [{ type: String }],
    isWatchlist: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' },
    versionKey: false,
  },
);

movieSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export const MovieCollection = model('movies', movieSchema);
