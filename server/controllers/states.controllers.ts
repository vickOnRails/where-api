import mongoose from "mongoose";
import { Request, Response } from "express";
import { Document } from "mongoose";

import State from "../models/state.model";
import Country from "../models/country.model";
import { ICountry, IState } from "../types";

const createNigerianState = async (req: Request, res: Response) => {
  const { name, code, description } = req.body;
  const countryId = req.body.country;

  // first confirm the country with the id exists
  const country = await Country.findById(countryId);

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

const getAllNigerianStates = async (req: Request, res: Response) => {
  const NIGERIA_CODE = "ng";

  // Ensure Nigeria exists
  const nigeria = await Country.findOne({
    code: NIGERIA_CODE,
  }).exec();

  if (!nigeria)
    return res.status(404).json({
      message: "This country does not exist",
    });

  try {
    const states = await State.find({
      countryCode: NIGERIA_CODE,
    });

    res.json(states);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getNigerianStateById = async (req: Request, res: Response) => {
  const { stateId } = req.params;
  try {
    const state = await State.findById(stateId);

    if (!state)
      return res.status(404).json({
        message: "State does not exist",
      });

    res.json(state);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getNigerianStateByCode = async (req: Request, res: Response) => {
  const { stateCode } = req.params;
  try {
    const state = await State.findOne({ code: stateCode });

    if (!state)
      return res.status(404).json({
        message: "State does not exist",
      });

    res.json(state);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const deleteNigerianState = async (req: Request, res: Response) => {
  const { stateId } = req.params;

  try {
    const state = await State.findById(stateId);

    if (!state) {
      res.status(404);
      throw new Error("State does not exist");
    }

    res.status(200).json({
      message: "Deleted successfully",
    });
    await state.remove();
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

const editNigerianState = async (req: Request, res: Response) => {
  const { stateId } = req.params;
  const newValues = req.body;

  try {
    const updatedState = await State.findByIdAndUpdate(stateId, newValues, {
      new: true,
    });

    if (!updatedState) {
      res.status(404);
      throw new Error("This state does not exist");
    }

    res.status(200).json({
      message: "State updated",
      updatedState: updatedState,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

export {
  createNigerianState,
  getAllNigerianStates,
  getNigerianStateById,
  getNigerianStateByCode,
  deleteNigerianState,
  editNigerianState,
};
