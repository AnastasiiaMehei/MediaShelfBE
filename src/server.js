// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/index.js';
import booksAuthRouter from "./routers/booksAuth.js";
import booksBooksRouter from "./routers/booksBooks.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // APP_DOMAIN=https://media-shelf-fe-qckw-2jfchvq51-anastasiias-projects-c479b52e.vercel.app
  const allowedOrigins = process.env.APP_DOMAIN
    ? process.env.APP_DOMAIN.split(",").map((origin) => origin.trim())
    : ["http://localhost:5173"];

  app.use(cors({
    origin: allowedOrigins,
    credentials: true
  }));
  
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world! This index page belongs to main',
    });
  });

  app.use('/api', router);
  app.use("/books", booksAuthRouter);
  app.use("/books", booksBooksRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
  });
};
