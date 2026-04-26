// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import audioRouter from './audio.js';
import movieRouter from './movie.js';
import bookRouter from './book.js';
import videoRouter from './video.js';
import imageRouter from './image.js';

const router = Router();

router.use('/audio', audioRouter);

router.use('/auth', authRouter);

router.use('/movies', movieRouter);

router.use('/books', bookRouter);
router.use('/videos', videoRouter);
router.use('/images', imageRouter);

export default router;
