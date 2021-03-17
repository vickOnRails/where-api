import { Request, Response } from "express";
import { prisma, SKIP, TAKE } from "../server";

import { response } from "../util/response";

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

    res.json(
      response({
        success: true,
        message: "Countries fetch successful",
        data: countries,
      })
    );
  } catch (err) {
    res.status(500).json(
      response({
        message: err.message,
        success: false,
      })
    );
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
    res.status(201).json(
      response({
        message: "Country created succesfully",
        success: true,
        data: createdCountry,
      })
    );
  } catch (err) {
    res.status(500).json(
      response({
        message: err.message,
        success: false,
      })
    );
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
      return res.status(404).json(
        response({
          message: "This country does not exist",
          success: false,
        })
      );
    }

    res.json(response({ data: country, success: true }));
  } catch (err) {
    res.status(500).json(
      response({
        success: false,
        message: err.message,
      })
    );
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
      return res.status(404).json(
        response({
          message: "This country does not exist",
          success: false,
        })
      );

    res.json(
      response({
        message: "Country updated",
        success: true,
        data: country,
      })
    );
  } catch (err) {
    res.status(500).json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};

const deleteCountry = async (req: Request, res: Response) => {
  const { countryId } = req.params;

  try {
    const country = await prisma.country.findUnique({
      where: { id: countryId },
    });

    if (!country) {
      return res.status(404).json(
        response({
          message: "Country does not exist",
          success: false,
        })
      );
    }

    await prisma.country.delete({
      where: {
        id: countryId,
      },
    });

    res.json(
      response({
        message: "Country removed",
        data: country,
        success: true,
      })
    );
  } catch (err) {
    res.status(500).json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};

export {
  getAllCountries,
  getCountryById,
  createCountry,
  deleteCountry,
  editCountry,
};
