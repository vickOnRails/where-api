import mongoose from "mongoose";
import { Request, Response } from "express";

import State from "../../models/state.model";
import Country from "../../models/country.model";

const createNigerianState = async (req: Request, res: Response) => {
  const { name, code, description } = req.body;
  const countryId = req.body.country;

  // first confirm the country with the id exists
  const country: any = await Country.findById(countryId);

  if (!country)
    return res
      .status(404)
      .json({ message: "No country exists for this state" });

  const stateToCreate = new State({
    _id: mongoose.Types.ObjectId(),
    name,
    code,
    description,
    country: country._id,
    countryName: country.name,
    countryCode: country.code,
  });

  console.log(stateToCreate);

  try {
    const newState = await stateToCreate.save();

    res.status(201).json({
      message: "Created successfully",
      newState,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { createNigerianState };
