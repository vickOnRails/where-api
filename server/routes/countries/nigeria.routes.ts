import express from "express";

import {
  getAllNigerianStates,
  getNigerianStateByCode,
} from "../../controllers/states.controllers";
import {
  getAllStateLGAs,
  getStateLGAByCode,
  getStateLGAById,
} from "../../controllers/lga.controller";

const router = express.Router();

router.get("/states", getAllNigerianStates);

router.get("/states/:stateCode", getNigerianStateByCode);

router.get("/states/:statesId/lgas", getAllStateLGAs);

router.get("/states/:statesId/lgas/:lgaCode", getStateLGAByCode);
router.get("/states/:statesId/lgas/:lgaId", getStateLGAById);

export default router;