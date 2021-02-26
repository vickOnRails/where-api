import express from "express";
const router = express.Router();

// api/
router.get("/", (req, res) => {
  res.json({
    message: "API/",
  });
});

export default router;
