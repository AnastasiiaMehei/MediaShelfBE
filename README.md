# Auth NodeJS Backend

## 📌 Overview
This backend application provides **user authentication** and **audio file management**.  
It is built with **Node.js + Express**, uses **MongoDB** for data storage, integrates with **Cloudinary** for audio hosting, and includes **Swagger documentation** for API usage.

---

## 🚀 Technologies Used
- **Node.js / Express** – server framework
- **MongoDB / Mongoose** – database and schema modeling
- **JWT (jsonwebtoken)** – authentication with access tokens
- **bcrypt** – password hashing
- **multer** – file upload handling
- **cloudinary** – audio and cover image storage
- **music-metadata** – extract audio metadata (duration, format, etc.)
- **nodemailer + handlebars** – email service for password reset
- **pino-http / pino-pretty** – logging
- **dotenv** – environment variables
- **cors / cookie-parser / http-errors** – middleware for security and error handling
- **Swagger UI Express + Redocly** – interactive API documentation

---

## 📂 Project Structure
src/
├── index.js          # Entry point
├── routes/           # API routes (auth, audio)
├── controllers/      # Request handling logic
├── models/           # Mongoose models
├── middleware/       # Authentication & error handling
├── services/         # Email, Cloudinary integrations
└── utils/            # Helper functions



---

## ⚙️ Scripts
- `npm start` – run the server
- `npm run dev` – run in development mode (nodemon)
- `npm run build-docs` – generate Swagger JSON
- `npm run preview-docs` – preview API documentation

---

## 🔑 API Endpoints

See [API_ENDPOINTS.md](API_ENDPOINTS.md) for the complete list of all available endpoints.

### Main Endpoints
Authentication (/api/auth):

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/send-reset-email
POST /api/auth/reset-pwd

Audio (/api/audio):

GET /api/audio
POST /api/audio (з файлом)
GET /api/audio/:audioId
DELETE /api/audio/:audioId
POST /api/audio/:audioId/duplicate

Movies (/api/movies):

GET /api/movies/watchlist
POST /api/movies/watchlist (з постером)
DELETE /api/movies/watchlist/:movieId
GET /api/movies/favorites
POST /api/movies/favorites (з постером)
DELETE /api/movies/favorites/:movieId
GET /api/movies/:movieId/status

Books (/api/books):

GET /api/books/favorites
POST /api/books/favorites (з cover)
DELETE /api/books/favorites/:bookId
GET /api/books/read
POST /api/books/read (з cover)
DELETE /api/books/read/:bookId
GET /api/books/:bookId/status

Videos (/api/videos):

GET /api/videos/favorites
POST /api/videos/favorites (з cover)
DELETE /api/videos/favorites/:videoId
GET /api/videos/viewed
POST /api/videos/viewed (з cover)
DELETE /api/videos/viewed/:videoId
GET /api/videos/:videoId/status

Images (/api/images):

GET /api/images/favorites
POST /api/images/favorites (з cover)
DELETE /api/images/favorites/:imageId
GET /api/images/viewed
POST /api/images/viewed (з cover)
DELETE /api/images/viewed/:imageId
GET /api/images/:imageId/status

### Main Endpoints
- `POST /api/auth/login` — user login
- `POST /api/auth/register` — user registration
- `GET /api/audio` — fetch audio files
- `GET /api/movies/watchlist` — fetch watchlist movies
- `GET /api/movies/favorites` — fetch favorite movies
- `GET /api/books/recommend` — fetch recommended books  

---

## 🔒 Security
- **JWT Bearer Token** required for protected routes (`Authorization: Bearer <token>`).
- Passwords are securely hashed with **bcrypt**.
- Input validation is handled with **Joi**.

---

## 📖 Documentation
Swagger UI is available at:
http://localhost:3000/api-docs



---

## 🛠️ Installation & Setup
```bash
# Clone repository
git clone <repo-url>
cd goit-node-js

# Install dependencies
npm install

# Run in development mode
npm run dev
