// src/routers/index.js

import { Router } from 'express';
import authRouter from './auth.js';
import audioRouter from './audio.js';

const router = Router();

router.use('/audio', audioRouter);

router.use('/auth', authRouter);

export default router;
