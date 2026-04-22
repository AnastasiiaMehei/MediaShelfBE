import express from "express";
import axios from "axios";

const router = express.Router();

const API = "https://readjourney.b.goit.study/api";

const EMAIL = "tesanastasya@gmail.com";
const PASSWORD = "1234567";

router.post("/auth", async (req, res) => {
  try {
    const signin = await axios.post(`${API}/users/signin`, {
      email: EMAIL,
      password: PASSWORD,
    });

    return res.json({
      email: signin.data.email,
      name: signin.data.name,
      token: signin.data.token,
      refreshToken: signin.data.refreshToken,
    });
  } catch (err) {
    console.error("Books auth error:", err.response?.data);
    return res.status(500).json({ message: "Books auth failed" });
  }
});

export default router;
