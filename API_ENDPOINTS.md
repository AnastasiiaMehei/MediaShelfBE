# MediaShelf Backend API - Complete Endpoints List

## 📌 Overview
This backend application provides **user authentication**, **audio file management**, **movie watchlist/favorites**, **books favorites/read**, **videos favorites/viewed**, and **images favorites/viewed**.

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

### Books Management (`/api/books`)
- `GET /api/books/favorites` – get user's favorite books
- `POST /api/books/favorites` – add book to favorites (multipart/form-data with cover)
- `DELETE /api/books/favorites/:bookId` – remove book from favorites
- `GET /api/books/read` – get user's read books
- `POST /api/books/read` – add book to read list (multipart/form-data with cover)
- `DELETE /api/books/read/:bookId` – remove book from read list
- `GET /api/books/:bookId/status` – check if book is in favorites/read

### Videos Management (`/api/videos`)
- `GET /api/videos/favorites` – get user's favorite videos
- `POST /api/videos/favorites` – add video to favorites (multipart/form-data with cover)
- `DELETE /api/videos/favorites/:videoId` – remove video from favorites
- `GET /api/videos/viewed` – get user's viewed videos
- `POST /api/videos/viewed` – add video to viewed list (multipart/form-data with cover)
- `DELETE /api/videos/viewed/:videoId` – remove video from viewed list
- `GET /api/videos/:videoId/status` – check if video is in favorites/viewed

### Images Management (`/api/images`)
- `GET /api/images/favorites` – get user's favorite images
- `POST /api/images/favorites` – add image to favorites (multipart/form-data with cover)
- `DELETE /api/images/favorites/:imageId` – remove image from favorites
- `GET /api/images/viewed` – get user's viewed images
- `POST /api/images/viewed` – add image to viewed list (multipart/form-data with cover)
- `DELETE /api/images/viewed/:imageId` – remove image from viewed list
- `GET /api/images/:imageId/status` – check if image is in favorites/viewed

### Books Integration (ReadJourney Proxy)
- `POST /books/auth` – get ReadJourney authentication token
- `GET /books/recommend` – get recommended books from ReadJourney
- `GET /books/:id` – get book details by ID from ReadJourney

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