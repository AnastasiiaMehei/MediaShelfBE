// src/validation/audio.js

import Joi from 'joi';

export const uploadAudioSchema = Joi.object({
  title: Joi.string().trim().optional(),
  duration: Joi.number().positive().optional(),
  type: Joi.string().trim().optional(),
  format: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
});
