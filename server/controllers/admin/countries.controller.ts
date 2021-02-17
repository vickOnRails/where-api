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
      res.status(404).json({
        message: "This country does not exist yet",
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
const editCountry = (req: Request, res: Response) => {
  res.json({
    message: "Edit Country",
    endpoint: "/api/admin/countries/country",
  });
};

const deleteCountry = (req: Request, res: Response) => {
  res.json({
    message: "Delete Country",
    endpoint: "/api/admin/countries/country",
  });
};

export {
  getAllCountries,
  getCountryById,
  createCountry,
  deleteCountry,
  editCountry,
};
