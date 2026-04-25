// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import audioRouter from './audio.js';
import movieRouter from './movie.js';

const router = Router();

router.use('/audio', audioRouter);

router.use('/auth', authRouter);

router.use('/movies', movieRouter);

export default router;
