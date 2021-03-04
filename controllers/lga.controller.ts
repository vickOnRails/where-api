import { Request, Response } from "express";

import { prisma } from "../server";

/**
 * Get States LGA
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Array of LGAs
 */
const getStateLGAs = async (req: Request, res: Response) => {
  const { stateId } = req.params;

  try {
    // First ensure country exists
    const lgas = await prisma.lGA.findUnique({ where: { id: stateId } });

    res.json(lgas);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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

    res.status(200).json(lgaToCreate);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getStateLGAById = async (req: Request, res: Response) => {
  const { lgaId } = req.params;
  try {
    const lga = await prisma.lGA.findUnique({ where: { id: lgaId } });
    if (!lga) {
      res.status(404).json({
        message: "LGA does not exists",
      });
    }
    res.json(lga);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
      res.status(404).json({
        message: "LGA does not exists",
      });
    }
    res.json(lga);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
      res.status(404).json({
        message: "LGA does not exists",
      });
    }

    const updatedLGA = await prisma.lGA.update({
      where: {
        id: lgaId,
      },
      data: {
        ...newValues,
      },
    });

    res.json({
      message: "Updated Successfully",
      updatedLGA,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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

    res.status(200).json({
      message: "LGA deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
