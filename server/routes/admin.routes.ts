import express from "express";
const router = express.Router();

import {
  createNigerianState,
  getNigerianStateById,
  getAllNigerianStates,
  deleteNigerianState,
  editNigerianState,
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
  deleteStateLGA,
  editStateLGA,
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
router.get("/countries/:countryId/states/:stateId", getNigerianStateById);
router.post("/countries/:countryId/states", createNigerianState);
router.put("/countries/:countryId/states/:stateId", editNigerianState);
router.delete("/countries/:countryId/states/:stateId", deleteNigerianState);

router.get("/countries/:countryId/states/:stateId/lgas", getAllStateLGAs);
router.get(
  "/countries/:countryId/states/:stateId/lgas/:lgaId",
  getStateLGAById
);
router.post("/countries/:countryId/states/:stateId/lgas", createStateLGAs);
router.put("/countries/:countryId/states/:stateId/lgas/:lgaId", editStateLGA);
router.delete(
  "/countries/:countryId/states/:stateId/lgas/:lgaId",
  deleteStateLGA
);

export default router;
