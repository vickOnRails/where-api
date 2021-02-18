import express from "express";
const router = express.Router();

import {
  getAllCountries,
  getCountryById,
  createCountry,
  deleteCountry,
  editCountry,
} from "../controllers/admin/countries.controller";
import { createNigerianState } from "../controllers/admin/states.controllers";

// api/admin/countries
router.get("/countries", getAllCountries);

// api/admin/countries
router.get("/countries/:countryId", getCountryById);

// api/admin/countries
router.post("/countries", createCountry);

// api/admin/countries
router.put("/countries/:countryId", editCountry);

// api/admin/countries
router.delete("/countries/:countryId", deleteCountry);

// statesId
// ------------------------

router.post("/countries/ng/states", createNigerianState);

export default router;
