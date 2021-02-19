import express from "express";
const router = express.Router();

import {
  createNigerianState,
  getNigerianStateById,
  getAllNigerianStates,
} from "../controllers/states.controllers";

import {
  createCountry,
  deleteCountry,
  editCountry,
  getAllCountries,
  getCountryById,
} from "../controllers/countries.controller";
import {
  createStateLGAs,
  getAllStateLGAs,
  getStateLGAById,
} from "../controllers/lga.controller";

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
router.get("/countries/:countryId/states", getAllNigerianStates);
router.post("/countries/:countryId/states", createNigerianState);
router.get("/countries/:countryId/states/:stateId", getNigerianStateById);
router.get("/countries/:countryId/states/:stateId/lgas", getAllStateLGAs);
router.post("/countries/:countryId/states/:stateId/lgas", createStateLGAs);
router.get(
  "/countries/:countryId/states/:stateId/lgas/:lgaId",
  getStateLGAById
);

export default router;
