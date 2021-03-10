import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

import connectDB from "./db";

import countriesRoutes from "./routes/countries.routes";
import adminRoutes from "./routes/admin.routes";
import indexRoutes from "./routes";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middleware/protect";
import { authorizeAdmin } from "./middleware/authorize-admin";
import { validateAPIKey } from "./middleware/validate-api-key";
import { logger } from "./util/logger";

// Set configuration to allow parsing of .env variables
dotenv.config();

// Default values for skip and take
export const SKIP = 0;
export const TAKE = 20;

const PORT = process.env.PORT || 5000;

// start express app
const app = express();

// setup body parser to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to database
// connectDB();

export const prisma = new PrismaClient();

// Handle navigation and api documentation
app.use("/api", indexRoutes);

// Handle navigation and api documentation
app.use("/api/auth", authRoutes);

// Handle All admin related operations
app.use("/api/admin", protect, authorizeAdmin, adminRoutes);

// Handle all countries related functionality
// We don't really need the protect middleware here since this particular requests to the server do not make use of JWT, but apikeys
// app.use("/api/countries", protect, countriesRoutes);

app.use("/api/countries", validateAPIKey, countriesRoutes);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
  logger.info("Server started");
});
