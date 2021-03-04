import { Request, Response } from "express";
import { prisma } from "../server";

/**
 * Create Nigerian State
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Newly created state
 */

const createNigerianState = async (req: Request, res: Response) => {
  const { name, code, description } = req.body;
  const { countryId } = req.params;

  // first confirm the country with the id exists
  const country = await prisma.country.findUnique({
    where: {
      id: countryId,
    },
  });

  if (!country)
    return res
      .status(404)
      .json({ message: "No country exists for this state" });

  try {
    const stateToCreate = await prisma.state.create({
      data: {
        name,
        description,
        code,
        country: {
          connect: {
            id: countryId,
          },
        },
      },
    });

    res.status(201).json({
      message: "Created successfully",
      stateToCreate,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * Get All Nigerian States
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Array of states in Nigeria
 */
const getAllNigerianStates = async (req: Request, res: Response) => {
  const { countryId } = req.params;

  // Ensure Nigeria exists
  // const country = await Country.findById(countryId);
  const country = await prisma.country.findUnique({
    where: {
      id: countryId,
    },
  });

  if (!country)
    return res.status(404).json({
      message: "This country does not exist",
    });

  try {
    const states = await prisma.state.findMany();

    res.json(states);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * Get Nigerian State that matches the given Id
 *
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns Array of Nigeria states
 */
const getNigerianStateById = async (req: Request, res: Response) => {
  const { stateId } = req.params;
  try {
    const state = await prisma.state.findUnique({
      where: {
        id: stateId,
      },
    });

    if (!state)
      return res.status(404).json({
        message: "State does not exist",
      });

    res.json(state);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
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

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
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

    res.status(200).json({
      message: "State updated",
      updatedState: updatedState,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

export {
  createNigerianState,
  getAllNigerianStates,
  getNigerianStateById,
  deleteNigerianState,
  editNigerianState,
};
