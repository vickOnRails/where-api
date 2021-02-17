import express from "express";
const router = express.Router();

import {
  getAllCountries,
  getCountryById,
  getNigerianStates,
} from "../controllers/countries.controller";

// api/countries
router.get("/", getAllCountries);

// api/countries/ng
router.get("/:ng", getCountryById);

// api/countries/ng/states
router.get("/ng/states", getNigerianStates);

export default router;
