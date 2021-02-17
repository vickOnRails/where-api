import { Request, Response } from "express";
import Country from "../models/country.model";

const getAllCountries = async (req: Request, res: Response) => {
  const countries = await Country.find({});

  res.json(countries);
};

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

const getNigerianStates = (req: Request, res: Response) => {
  res.json({
    message: "API/COUNTRIES/NIGERIA/STATES",
  });
};

export { getAllCountries, getCountryById, getNigerianStates };
