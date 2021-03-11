import { Request, Response } from "express";
import { prisma, SKIP, TAKE } from "../server";

const getAllCountries = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { order_by, search, skip, take, fields } = req.query;

  let selectQuery = {};

  if (fields) {
    const fieldsArr = fields && fields.split(",");

    selectQuery = {
      select: {
        id: fieldsArr.includes("id"),
        name: fieldsArr.includes("name"),
        description: fieldsArr.includes("description"),
        code: fieldsArr.includes("code"),
      },
    };
  }

  let searchQuery = {};

  if (search)
    searchQuery = {
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    };

  const direction = order_by?.toString().includes("-name") ? "desc" : "asc";

  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: direction,
      },
      skip: parseInt(skip) || SKIP,
      take: parseInt(take) || TAKE,
      ...searchQuery,
      ...selectQuery,
    });
    res.json(countries);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// api/admin/countries
const createCountry = async (req: Request, res: Response) => {
  const { code, name, description } = req.body;

  try {
    const createdCountry = await prisma.country.create({
      data: {
        code,
        name,
        description,
      },
    });
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
const getCountryById = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { countryId } = req.params;
  const { fields } = req.query;

  let selectQuery = {};

  if (fields) {
    const fieldsArr = fields && fields.split(",");

    selectQuery = {
      select: {
        id: fieldsArr.includes("id"),
        name: fieldsArr.includes("name"),
        description: fieldsArr.includes("description"),
        code: fieldsArr.includes("code"),
      },
    };
  }

  try {
    const country = await prisma.country.findUnique({
      where: {
        id: countryId,
      },
      ...selectQuery,
    });

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
    const country = await prisma.country.update({
      where: {
        id: countryId,
      },
      data: {
        ...newValues,
      },
    });

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
    const country = await prisma.country.findUnique({
      where: { id: countryId },
    });

    if (!country) {
      return res.status(404).json({
        message: "Country does not exist",
      });
    }

    await prisma.country.delete({
      where: {
        id: countryId,
      },
    });

    res.json({
      message: "Country removed",
      removedCountry: country,
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
