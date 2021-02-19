import express from "express";

const router = express.Router();

import { getAllCountries } from "../controllers/countries.controller";
import {
  getAllNigerianStates,
  getNigerianStateById,
} from "../controllers/states.controllers";
import { getStateLGAById, getStateLGAs } from "../controllers/lga.controller";

// api/countries
router.get("/", getAllCountries);

// Get All Nigerian States
// api/countries/:countryId/states
router.get("/:countryId/states", getAllNigerianStates);

// Get All Nigerian State by Id
// api/countries/:countryId/states/:stateId
router.get("/:countryId/states/:stateId", getNigerianStateById);

// Get All State LGAs
// api/countries/:countryId/states/:stateId/lgas
router.get("/:countryId/states/:stateId/lgas", getStateLGAs);

// Get All LGA by Id
// api/countries/:countryId/states/:stateId/lgas/:lgaId
router.get("/:countryId/states/:stateId/lgas/:lgaId", getStateLGAById);

export default router;
