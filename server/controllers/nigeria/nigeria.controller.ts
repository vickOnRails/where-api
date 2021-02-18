import { Request, Response } from "express";
import mongoose from "mongoose";

import State from "../../models/state.model";

const getNigerianStates = async (req: Request, res: Response) => {
  const states = await State.find();

  res.json(states);
};

export { getNigerianStates };
