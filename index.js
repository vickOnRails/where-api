import express from "express";

const PORT = process.env.PORT || 5000;

// start express app
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Risk it all",
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
