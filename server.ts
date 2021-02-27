import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectDB from "./db";

import countriesRoutes from "./routes/countries.routes";
import adminRoutes from "./routes/admin.routes";
import indexRoutes from "./routes";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middleware/protect";

// Set configuration to allow parsing of .env variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// start express app
const app = express();

// setup body parser to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to database
connectDB();

// Handle navigation and api documentation
app.use("/api", indexRoutes);

// Handle navigation and api documentation
app.use("/api/auth", authRoutes);

// Handle All admin related operations
app.use("/api/admin", protect, adminRoutes);

// Handle all countries related functionality
app.use("/api/countries", protect, countriesRoutes);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
