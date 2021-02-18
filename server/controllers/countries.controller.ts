import { Request, Response } from "express";
import Country from "../models/country.model";

const getAllCountries = async (req: Request, res: Response) => {
  const countries = await Country.find({});

  res.json(countries);
};

const getCountryByCode = async (req: Request, res: Response) => {
  const { countryCode } = req.params;

  try {
    const country = await Country.find({ code: countryCode });

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

export { getAllCountries, getCountryByCode };
