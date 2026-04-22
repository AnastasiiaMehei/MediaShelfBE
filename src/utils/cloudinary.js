import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env('CLOUDINARY_CLOUD_NAME'),
  api_key: env('CLOUDINARY_API_KEY'),
  api_secret: env('CLOUDINARY_API_SECRET'),
});

export const uploadToCloudinary = (fileBuffer, folder, options = {}) => {
  return new Promise((resolve, reject) => {
    console.log('Uploading to Cloudinary with options:', { folder, ...options });
    cloudinary.uploader
      .upload_stream({ folder, ...options }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error.message || error);
          reject(error);
        } else {
          console.log('Cloudinary upload success:', result?.public_id);
          resolve(result);
        }
      })
      .end(fileBuffer);
  });
};

export const destroyFromCloudinary = (publicId, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
