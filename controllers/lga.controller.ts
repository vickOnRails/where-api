import { Request, Response } from "express";

import { prisma, SKIP, TAKE } from "../server";
import { response } from "../util/response";

/**
 * Get States LGA
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Array of LGAs
 */
// FIXME: Add appropriate types for request objects
const getStateLGAs = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { stateId } = req.params;
  const { order_by, search, skip, take, fields } = req.query;

  let selectQuery = {};

  // If fields exist, configure response data
  if (fields) {
    const fieldsArr = fields && fields.split(",");

    selectQuery = {
      select: {
        id: fieldsArr.includes("id"),
        name: fieldsArr.includes("name"),
        description: fieldsArr.includes("description"),
        code: fieldsArr.includes("code"),
        postalCode: fieldsArr.includes("postalCode"),
        state: fieldsArr.includes("state"),
        country: fieldsArr.includes("country"),
      },
    };
  }

  let searchQuery = {};

  if (search) {
    searchQuery = {
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    };
  }

  const direction = order_by?.toString().includes("-name") ? "desc" : "asc";

  try {
    // First ensure country exists
    const lgas = await prisma.lGA.findMany({
      where: { stateId },
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
        message: "LGAs fetched",
        data: lgas,
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

const createStateLGAs = async (req: Request, res: Response) => {
  const { name, code, description, stateId, countryId } = req.body;

  try {
    const lgaToCreate = await prisma.lGA.create({
      data: {
        name,
        code,
        description,
        country: {
          connect: {
            id: countryId,
          },
        },
        state: {
          connect: {
            id: stateId,
          },
        },
      },
    });

    res.status(201).json(
      response({
        data: lgaToCreate,
        success: true,
        message: "LGA created successfully",
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

const getStateLGAById = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { lgaId } = req.params;
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
        state: fieldsArr.includes("state"),
        country: fieldsArr.includes("country"),
      },
    };
  }

  try {
    const lga = await prisma.lGA.findUnique({
      where: { id: lgaId },
      ...selectQuery,
    });
    if (!lga) {
      return res.status(404).json(
        response({
          message: "LGA does not exists",
          success: false,
        })
      );
    }
    res.json(
      response({
        data: lga,
        success: true,
        message: "LGA fetched",
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

const getStateLGAByCode = async (req: Request, res: Response) => {
  const { lgaCode } = req.params;

  // First confirm the state exists
  try {
    const lga = await prisma.lGA.findUnique({
      where: {
        code: lgaCode,
      },
    });

    if (!lga) {
      res.status(404).json(
        response({
          message: "LGA does not exists",
          success: false,
        })
      );
    }
    res.json(
      response({
        data: lga,
        success: true,
        message: "LGA fetched successfully",
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

const editStateLGA = async (req: Request, res: Response) => {
  const { lgaId } = req.params;
  // First confirm the state exists
  const newValues = req.body;
  try {
    const lga = await prisma.lGA.findUnique({
      where: {
        id: lgaId,
      },
    });

    if (!lga) {
      res.status(404).json(
        response({
          message: "LGA does not exists",
          success: false,
        })
      );
    }

    const updatedLGA = await prisma.lGA.update({
      where: {
        id: lgaId,
      },
      data: {
        ...newValues,
      },
    });

    res.json(
      response({
        message: "Updated Successfully",
        data: updatedLGA,
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

const deleteStateLGA = async (req: Request, res: Response) => {
  const { lgaId } = req.params;

  try {
    const lga = await prisma.lGA.findUnique({
      where: {
        id: lgaId,
      },
    });

    if (!lga) {
      res.status(404);
      throw new Error("LGA does not exist");
    }

    await prisma.lGA.delete({ where: { id: lga.id } });

    res.status(200).json(
      response({
        message: "LGA deleted",
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
  getStateLGAs,
  createStateLGAs,
  getStateLGAByCode,
  getStateLGAById,
  editStateLGA,
  deleteStateLGA,
};
