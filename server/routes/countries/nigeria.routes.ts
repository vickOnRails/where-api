import express from "express";

import State from "../../models/state.model";

import { getNigerianStates } from "../../controllers/nigeria/nigeria.controller";

const router = express.Router();

router.get("/states", getNigerianStates);

router.get("/states/:statesId", (req, res) => {
  res.json({
    message: "Gimme the Ginger State",
  });
});

router.get("/states/:statesId/lgas", (req, res) => {
  res.json({
    message: "Gimme the Ginger LGAs",
  });
});

router.get("/states/:statesId/lgas/:lgaId", (req, res) => {
  res.json({
    message: "Gimme the Ginger LGA",
  });
});

export default router;
