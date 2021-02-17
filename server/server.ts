import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";

import countriesRoutes from "./routes/countries";
import adminRoutes from "./routes/admin.routes";
import indexRoutes from "./routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

connectDB();

// Handle navigation and api documentation
app.use("/api", indexRoutes);

// Handle navigation and api documentation
app.use("/api/auth", authRoutes);

// Handle All admin related operations
app.use("/api/admin", adminRoutes);

// Handle all countries related functionality
app.use("/api/countries", countriesRoutes);

app.listen(5000, () => {
  console.log(`Listening at port 5000`);
});
