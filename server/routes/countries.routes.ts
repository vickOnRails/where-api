import express from "express";

const router = express.Router();

import {
  getAllCountries,
  getCountryById,
} from "../controllers/countries.controller";
import {
  getAllNigerianStates,
  getNigerianStateById,
} from "../controllers/states.controllers";
import { getStateLGAById, getStateLGAs } from "../controllers/lga.controller";

// api/countries
router.get("/", getAllCountries);

// api/countries/ng/states
router.get("/:countryId/states", getAllNigerianStates);
router.get("/:countryId/states/:stateId", getNigerianStateById);
router.get("/:countryId/states/:stateId/lgas", getStateLGAs);
router.get("/:countryId/states/:stateId/lgas/:lgaId", getStateLGAById);

export default router;
