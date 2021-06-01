import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import countriesRoutes from "./routes/countries.routes";
import indexRoutes from "./routes";

import { logger } from "./util/logger";

// Set configuration to allow parsing of .env variables
dotenv.config();

// Default values for skip and take
export const SKIP = 0;
export const TAKE = 20;

const PORT = process.env.PORT || 5000;

// start express app
const app = express();

// configure cross origin requests sharing
app.use(
  cors({
    origin: "*",
  })
);

// setup body parser to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export const prisma = new PrismaClient();

// Handle navigation and api documentation
app.use("/api", indexRoutes);

app.use("/api/countries", countriesRoutes);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
  logger.info("Server started");
});
