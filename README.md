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
