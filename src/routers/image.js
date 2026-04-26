import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import {
  addToFavoritesImageController,
  addToViewedImageController,
  getFavoriteImagesController,
  getViewedImagesController,
  removeFromFavoritesImageController,
  removeFromViewedImageController,
  checkImageStatusController,
} from '../controllers/image.js';

const imageRouter = Router();

imageRouter.use(authenticate);

imageRouter.get('/favorites', ctrlWrapper(getFavoriteImagesController));
imageRouter.post('/favorites', upload.single('cover'), ctrlWrapper(addToFavoritesImageController));
imageRouter.delete('/favorites/:imageId', ctrlWrapper(removeFromFavoritesImageController));

imageRouter.get('/viewed', ctrlWrapper(getViewedImagesController));
imageRouter.post('/viewed', upload.single('cover'), ctrlWrapper(addToViewedImageController));
imageRouter.delete('/viewed/:imageId', ctrlWrapper(removeFromViewedImageController));

imageRouter.get('/:imageId/status', ctrlWrapper(checkImageStatusController));

export default imageRouter;
