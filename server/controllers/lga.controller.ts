import { Request, Response } from "express";
import mongoose, { Document, Model } from "mongoose";

import LGA from "../models/lga.model";
import { ILGA } from "../types";

const getAllStateLGAs = async (req: Request, res: Response) => {
  try {
    const lgas = await LGA.find();

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

export { getAllStateLGAs, createStateLGAs, getStateLGAByCode, getStateLGAById };
