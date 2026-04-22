import express from "express";
import axios from "axios";

const router = express.Router();

const API = "https://readjourney.b.goit.study/api";

// ===============================
// GET /books/recommend
// ===============================
router.get("/recommend", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const response = await axios.get(`${API}/books/recommend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ReadJourney returns: { results, totalPages, page, perPage }
    return res.json(response.data);
  } catch (err) {
    console.error("Books recommend error:", err.response?.data);
    return res.status(500).json({ message: "Failed to load books" });
  }
});

// ===============================
// GET /books/:id
// ===============================
router.get("/:id", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { id } = req.params;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const response = await axios.get(`${API}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ReadJourney returns: { data: { ...book } }
    return res.json(response.data);
  } catch (err) {
    console.error("Book details error:", err.response?.data);

    if (err.response?.status === 404) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(500).json({ message: "Failed to load book" });
  }
});

export default router;
