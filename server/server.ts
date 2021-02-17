import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to API",
  });
});

app.listen(5000, () => {
  console.log(`Listening at port 5000`);
});
