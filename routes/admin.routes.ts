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
  getStateLGAs,
  getStateLGAById,
  deleteStateLGA,
  editStateLGA,
} from "../controllers/lga.controller";
import { protect } from "../middleware/protect";
import { authorizeAdmin } from "../middleware/authorize-admin";
import {
  DeleteUser,
  GetAllUsers,
  GetUser,
  MakeAdmin,
} from "../controllers/user.controller";

// Get All Countries
// api/admin/countries
router.get("/countries", getAllCountries);

// Get Country
// api/admin/countries/:countryId
router.get("/countries/:countryId", getCountryById);

// Create Country
// api/admin/countries
router.post("/countries", createCountry);

// Edit Country
// api/admin/countries
router.put("/countries/:countryId", editCountry);

// Delete Country
// api/admin/countries
router.delete("/countries/:countryId", deleteCountry);

// ----------------------------------------------------------------
// States
// statesId

// Get All Nigerian States
// api/admin/countries/:countryId/states
router.get("/countries/:countryId/states", getAllNigerianStates);

// Get All Nigerian State by Id
// api/admin/countries/:countryId/states/:stateId
router.get("/countries/:countryId/states/:stateId", getNigerianStateById);

// Create Nigerian State
// api/admin/countries/:countryId/states
router.post("/countries/:countryId/states", createNigerianState);

// Edit Nigerian State
// api/admin/countries/:countryId/states/:stateId
router.put("/countries/:countryId/states/:stateId", editNigerianState);

// Delete Nigerian State
// api/admin/countries/:countryId/states/:stateId
router.delete("/countries/:countryId/states/:stateId", deleteNigerianState);

// Get State LGAs
// api/admin/countries/:countryId/states/:stateId/lgas

router.get("/countries/:countryId/states/:stateId/lgas", getStateLGAs);

// Get State LGA
// api/admin/countries/:countryId/states/:stateId/lgas/:lgaId
router.get(
  "/countries/:countryId/states/:stateId/lgas/:lgaId",
  getStateLGAById
);

// Create State LGA
// api/admin/countries/:countryId/states/:stateId/lgas
router.post("/countries/:countryId/states/:stateId/lgas", createStateLGAs);

// Edit State LGA
// api/admin/countries/:countryId/states/:stateId/lgas/:lgaId
router.put("/countries/:countryId/states/:stateId/lgas/:lgaId", editStateLGA);

// Delete State LGA
// api/admin/countries/:countryId/states/:stateId/lgas/:lgaId
router.delete(
  "/countries/:countryId/states/:stateId/lgas/:lgaId",
  deleteStateLGA
);

router.route("/users").get(GetAllUsers);
router.route("/users/:userId").get(GetUser).delete(DeleteUser);
router.route("/:userId/make-admin").put(MakeAdmin);

export default router;
