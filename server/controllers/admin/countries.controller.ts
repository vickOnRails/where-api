import { Request, Response } from "express";
import mongoose from "mongoose";

import Country from "../../models/country.model";

// api/admin/countries
const getAllCountries = async (req: Request, res: Response) => {
  const countries = await Country.find({});

  res.json(countries);
};

// api/admin/countries
const createCountry = async (req: Request, res: Response) => {
  const countryToCreate = new Country({
    _id: mongoose.Types.ObjectId(),
    ...req.body,
  });

  //  No need to check for duplicated country codes because our
  // country schema defines the country code as a unique field

  // create country
  try {
    const createdCountry = await countryToCreate.save();
    res.status(201).json({
      country: createdCountry,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// api/admin/countries
const getCountryById = async (req: Request, res: Response) => {
  const { countryId } = req.params;

  try {
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({
        message: "This country does not exist",
      });
    }

    res.json(country);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// api/admin/countries
const editCountry = async (req: Request, res: Response) => {
  const { countryId } = req.params;
  const newValues = req.body;

  try {
    const country = await Country.findByIdAndUpdate(
      { _id: countryId },
      {
        ...newValues,
      },
      { new: true }
    );

    if (!country)
      return res.status(404).json({
        message: "This country does not exist",
      });

    res.json({
      message: "Country updated",
      country,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteCountry = async (req: Request, res: Response) => {
  const { countryId } = req.params;

  try {
    const docToRemove = await Country.findOneAndDelete({ _id: countryId });

    if (!docToRemove)
      return res.status(404).json({
        message: "Country does not exist",
      });

    res.json({
      message: "Country removed",
      removedCountry: docToRemove,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export {
  getAllCountries,
  getCountryById,
  createCountry,
  deleteCountry,
  editCountry,
};
