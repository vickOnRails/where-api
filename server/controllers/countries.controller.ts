import { Request, Response } from "express";
const getAllCountries = (req: Request, res: Response) => {
  res.json({
    message: "API/COUNTRIES",
  });
};

const getCountryById = (req: Request, res: Response) => {
  res.json({
    message: "API/COUNTRIES/NIGERIA",
  });
};

const getNigerianStates = (req: Request, res: Response) => {
  res.json({
    message: "API/COUNTRIES/NIGERIA/STATES",
  });
};

export { getAllCountries, getCountryById, getNigerianStates };
