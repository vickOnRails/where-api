import { Request, Response } from "express";

import { prisma, SKIP, TAKE } from "../server";
import { baseAPI } from "../util/base-api";
import { response } from "../util/response";

/**
 * Create Nigerian State
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Newly created state
 */

const createNigerianState = async (req: Request, res: Response) => {
  const {
    name,
    code,
    description,
    safeCode,
    postalCode,
    cities,
    capital,
  } = req.body;
  const { countryId } = req.params;

  const citiesArr = cities.split(",");

  // first confirm the country with the id exists
  const country = await prisma.country.findUnique({
    where: {
      id: countryId,
    },
  });

  if (!country)
    return res.status(404).json(
      response({
        success: false,
        message: "No country exists for this state",
      })
    );

  try {
    const stateToCreate = await prisma.state.create({
      data: {
        name,
        description,
        code,
        postalCode,
        safeCode,
        capital: capital,
        cities: [...citiesArr],
        country: {
          connect: {
            id: countryId,
          },
        },
      },
    });

    res.status(201).json(
      response({
        message: "Created successfully",
        data: stateToCreate,
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

/**
 * Get All Nigerian States
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Array of states in Nigeria
 */
const getAllNigerianStates = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { countryId } = req.params;
  const { order_by, search, take, skip, fields } = req.query;

  let selectQuery = {};

  // constructs the fields array and selects items from the db on the fly
  if (fields) {
    const fieldsArr = fields && fields.split(",");

    selectQuery = {
      select: {
        id: true,
        name: fieldsArr.includes("name"),
        description: fieldsArr.includes("description"),
        code: fieldsArr.includes("code"),
        postalCode: fieldsArr.includes("postalCode"),
        safeCode: fieldsArr.includes("safeCode"),
        capital: fieldsArr.includes("capital"),
        cities: fieldsArr.includes("cities"),
        country: fieldsArr.includes("country"),
      },
    };
  }

  let query = {};

  // query to search only the name field

  if (search) {
    query = {
      where: {
        name: {
          startsWith: search,
          mode: "insensitive",
        },
      },
    };
  }

  // functionality for ordering by name
  // Maybe we can make other fields sortable in the future
  const direction = order_by?.toString().includes("-name") ? "desc" : "asc";

  // Ensure Nigeria exists
  // const country = await Country.findById(countryId);
  const country = await prisma.country.findUnique({
    where: {
      id: countryId,
    },
  });

  if (!country)
    return res.status(404).json(
      response({
        message: "This country does not exist",
        success: false,
      })
    );

  try {
    const states = await prisma.state.findMany({
      orderBy: {
        name: direction,
      },
      skip: parseInt(skip) || SKIP,
      take: parseInt(take) || TAKE,
      ...query,
      ...selectQuery,
    });

    res.json(
      response({
        success: true,
        message: "States fetched successfully",
        data: states.map((state) => {
          return {
            ...state,
            url: `${baseAPI}/countries/${countryId}/states/${state.id}`,
          };
        }),
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

/**
 * Get Nigerian State that matches the given Id
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Array of Nigeria states
 */
const getNigerianStateById = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { stateId } = req.params;
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
        postalCode: fieldsArr.includes("postalCode"),
        safeCode: fieldsArr.includes("safeCode"),
        capital: fieldsArr.includes("capital"),
        cities: fieldsArr.includes("cities"),
        country: fieldsArr.includes("country"),
      },
    };
  }

  try {
    const state = await prisma.state.findUnique({
      where: {
        id: stateId,
      },
      ...selectQuery,
    });

    if (!state)
      return res.status(404).json(
        response({
          message: "State does not exist",
          success: false,
        })
      );

    res.json(
      response({
        data: state,
        success: true,
        message: "State fetched successfully",
      })
    );
  } catch (err) {
    res.status(404).json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};

/**
 * Deletes a Nigerian State
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Deleted State
 */
const deleteNigerianState = async (req: Request, res: Response) => {
  const { stateId } = req.params;

  try {
    const state = await prisma.state.findUnique({
      where: {
        id: stateId,
      },
    });

    if (!state) {
      res.status(404);
      throw new Error("State does not exist");
    }

    await prisma.state.delete({
      where: {
        id: state.id,
      },
    });

    res.status(200).json(
      response({
        message: "Deleted successfully",
        success: true,
        data: state,
      })
    );
  } catch (err) {
    res.json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};

/**
 * Edit Nigerian State
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Newly edited state
 */
const editNigerianState = async (req: Request, res: Response) => {
  const { stateId } = req.params;
  const newValues = req.body;

  try {
    const stateToUpdate = await prisma.state.findUnique({
      where: {
        id: stateId,
      },
    });

    if (!stateToUpdate) {
      res.status(404);
      throw new Error("This state does not exist");
    }

    const updatedState = await prisma.state.update({
      where: {
        id: stateToUpdate.id,
      },
      data: {
        ...newValues,
      },
    });

    res.status(200).json(
      response({
        message: "State updated",
        success: true,
        data: updatedState,
      })
    );
  } catch (err) {
    res.json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};

export {
  createNigerianState,
  getAllNigerianStates,
  getNigerianStateById,
  deleteNigerianState,
  editNigerianState,
};
