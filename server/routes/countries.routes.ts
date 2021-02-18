import express from "express";

import nigeriaRoutes from "./countries/nigeria.routes";
const router = express.Router();

import {
  getAllCountries,
  getCountryByCode,
} from "../controllers/countries.controller";

// api/countries
router.get("/", getAllCountries);

// api/countries/ng
router.get("/:countryCode", getCountryByCode);

// api/countries/ng/states
router.use("/ng", nigeriaRoutes);

export default router;
