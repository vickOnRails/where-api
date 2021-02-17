import express from "express";
const router = express.Router();

// api/auth
router.get("/", (req, res) => {
  res.json({
    message: "API/Auth",
  });
});

export default router;
