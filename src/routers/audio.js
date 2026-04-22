// src/routers/audio.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import { validateBody } from '../middlewares/validation.js';
import { uploadAudioController, getAudioListController, getAudioController, deleteAudioController, duplicateAudioController } from '../controllers/audio.js';
import { uploadAudioSchema } from '../validation/audio.js';

const audioRouter = Router();

audioRouter.use(authenticate);

audioRouter.get('/', ctrlWrapper(getAudioListController));
audioRouter.get('/:audioId', ctrlWrapper(getAudioController));
audioRouter.post(
  '/',
  upload.single('audio'),
  validateBody(uploadAudioSchema),
  ctrlWrapper(uploadAudioController),
);

audioRouter.delete('/:audioId', ctrlWrapper(deleteAudioController));
audioRouter.post('/:audioId/duplicate', ctrlWrapper(duplicateAudioController));

export default audioRouter;
