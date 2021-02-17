import express from "express";
const router = express.Router();

import {
  getAllCountries,
  getCountryById,
  createCountry,
  deleteCountry,
  editCountry,
} from "../controllers/admin/countries.controller";

// api/admin/countries
router.get("/countries", getAllCountries);

// api/admin/countries
router.get("/countries/:countryId", getCountryById);

// api/admin/countries
router.post("/countries", createCountry);

// api/admin/countries
router.put("/countries/:countryID", editCountry);

// api/admin/countries
router.delete("/countries/:countryID", deleteCountry);

export default router;