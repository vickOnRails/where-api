import { Request, Response } from "express";

// api/admin/countries
const getAllCountries = (req: Request, res: Response) => {
  res.json({
    message: "All Countries",
    endpoint: "/api/admin/countries",
  });
};

// api/admin/countries
const createCountry = (req: Request, res: Response) => {
  res.json({
    message: "Create Country",
    endpoint: "/api/admin/countries",
  });
};

// api/admin/countries
const getCountryById = (req: Request, res: Response) => {
  res.json({
    message: "Get Single Country",
    endpoint: "/api/admin/countries/country",
  });
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
