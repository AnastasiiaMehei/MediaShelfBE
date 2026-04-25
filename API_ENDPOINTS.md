# MediaShelf Backend API - Complete Endpoints List

## 📌 Overview
This backend application provides **user authentication**, **audio file management**, **movie watchlist/favorites**, and **books integration**.

---

## 🔑 Complete API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` – register a new user
- `POST /api/auth/login` – login user
- `POST /api/auth/logout` – logout user
- `POST /api/auth/refresh` – refresh session token
- `POST /api/auth/send-reset-email` – send password reset email
- `POST /api/auth/reset-pwd` – reset password

### Audio Management (`/api/audio`)
- `GET /api/audio` – get list of uploaded audio files
- `POST /api/audio` – upload a new audio file (multipart/form-data)
- `GET /api/audio/:audioId` – get audio metadata and playback URL
- `DELETE /api/audio/:audioId` – delete audio file
- `POST /api/audio/:audioId/duplicate` – duplicate audio file

### Movies Management (`/api/movies`)
- `GET /api/movies/watchlist` – get user's watchlist movies
- `POST /api/movies/watchlist` – add movie to watchlist (multipart/form-data with poster)
- `DELETE /api/movies/watchlist/:movieId` – remove movie from watchlist
- `GET /api/movies/favorites` – get user's favorite movies
- `POST /api/movies/favorites` – add movie to favorites (multipart/form-data with poster)
- `DELETE /api/movies/favorites/:movieId` – remove movie from favorites
- `GET /api/movies/:movieId/status` – check if movie is in watchlist/favorites

### Books Integration (`/api/books`)
- `POST /api/books/auth` – get ReadJourney authentication token
- `GET /api/books/recommend` – get recommended books from ReadJourney
- `GET /api/books/:id` – get book details by ID from ReadJourney

### General
- `GET /` – health check endpoint
- `GET /api-docs` – Swagger UI documentation
- `GET /uploads/*` – serve static uploaded files

---

## 🔒 Security Requirements
- **JWT Bearer Token** required for protected routes (`Authorization: Bearer <token>`)
- Passwords are securely hashed with **bcrypt**
- Input validation is handled with **Joi**
- CORS configured for allowed origins
- File uploads limited and validated

---

## 📖 Documentation
Swagger UI is available at: http://localhost:3000/api-docs