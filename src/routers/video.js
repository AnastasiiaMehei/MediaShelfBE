import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import {
  addToFavoritesVideoController,
  addToViewedVideoController,
  getFavoriteVideosController,
  getViewedVideosController,
  removeFromFavoritesVideoController,
  removeFromViewedVideoController,
  checkVideoStatusController,
} from '../controllers/video.js';

const videoRouter = Router();

videoRouter.use(authenticate);

videoRouter.get('/favorites', ctrlWrapper(getFavoriteVideosController));
videoRouter.post('/favorites', upload.single('cover'), ctrlWrapper(addToFavoritesVideoController));
videoRouter.delete('/favorites/:videoId', ctrlWrapper(removeFromFavoritesVideoController));

videoRouter.get('/viewed', ctrlWrapper(getViewedVideosController));
videoRouter.post('/viewed', upload.single('cover'), ctrlWrapper(addToViewedVideoController));
videoRouter.delete('/viewed/:videoId', ctrlWrapper(removeFromViewedVideoController));

videoRouter.get('/:videoId/status', ctrlWrapper(checkVideoStatusController));

export default videoRouter;
