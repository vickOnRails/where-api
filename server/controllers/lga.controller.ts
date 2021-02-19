import { Request, Response } from "express";
import mongoose, { Document, Model } from "mongoose";

import LGA from "../models/lga.model";
import { ILGA } from "../types";

const getStateLGAs = async (req: Request, res: Response) => {
  const { stateId } = req.params;

  try {
    const lgas = await LGA.find({ state: stateId });

    res.json(lgas);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createStateLGAs = async (req: Request, res: Response) => {
  const {
    name,
    code,
    description,
    stateCode,
    country,
    state,
    countryCode,
  } = req.body;

  try {
    const lgaToCreate = new LGA({
      _id: mongoose.Types.ObjectId(),
      name,
      code,
      description,
      stateCode,
      country,
      state,
      countryCode,
    });

    const newLGA = await lgaToCreate.save();

    res.status(200).json(newLGA);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStateLGAById = async (req: Request, res: Response) => {
  const { lgaId } = req.params;
  try {
    const lga = await LGA.findById(lgaId);
    if (!lga) {
      res.status(404).json({
        message: "LGA does not exists",
      });
    }
    res.json(lga);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStateLGAByCode = async (req: Request, res: Response) => {
  const { lgaCode } = req.params;

  // First confirm the state exists
  try {
    const lga = await LGA.findOne({ code: lgaCode });

    if (!lga) {
      res.status(404).json({
        message: "LGA does not exists",
      });
    }
    res.json(lga);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const editStateLGA = async (req: Request, res: Response) => {
  const { lgaId } = req.params;
  // First confirm the state exists
  const newValues = req.body;
  try {
    const lga = await LGA.findByIdAndUpdate(lgaId, newValues, { new: true });

    if (!lga) {
      res.status(404).json({
        message: "LGA does not exists",
      });
    }

    res.json({
      message: "Updated Successfully",
      lga,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteStateLGA = async (req: Request, res: Response) => {
  const { lgaId } = req.params;

  try {
    const lga = await LGA.findByIdAndDelete(lgaId);

    if (!lga) {
      res.status(404);
      throw new Error("LGA does not exist");
    }

    res.status(200).json({
      message: "LGA deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export {
  getStateLGAs,
  createStateLGAs,
  getStateLGAByCode,
  getStateLGAById,
  editStateLGA,
  deleteStateLGA,
};
