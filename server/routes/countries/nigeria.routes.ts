import express from "express";

import State from "../../models/state.model";

import {
  getAllNigerianStates,
  getNigerianStateByCode,
  getNigerianStateById,
} from "../../controllers/states.controllers";
import { getAllStateLGAs } from "../../controllers/lga.controller";

const router = express.Router();

router.get("/states", getAllNigerianStates);

router.get("/states/:stateCode", getNigerianStateByCode);

router.get("/states/:statesId/lgas", getAllStateLGAs);

router.get("/states/:statesId/lgas/:lgaId", (req, res) => {
  res.json({
    message: "Gimme the Ginger LGA",
  });
});

export default router;
