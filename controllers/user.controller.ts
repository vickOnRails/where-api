import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { prisma, SKIP, TAKE } from "../server";
import { generateJWT } from "../util/generateJWT";
import { IUser } from "../types";
import { encryptPassword } from "../util/encryptPassword";
import { matchPassword } from "../util/matchPassword";

/***
 * Register user to system
 * @param {Request} req
 * @param {Response} res
 */

export const RegisterUser = async (req: Request, res: Response) => {
  const { email, password, fullname } = req.body;

  if (email === null || password === null || fullname === null)
    res.status(422).json({
      message: "Please ensure required fields are filled",
    });

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  try {
    if (userExists) {
      res.status(400);
      throw new Error("This user already exists");
    }

    const { hashedPassword, salt } = await encryptPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        fullname,
        isAdmin: false,
        password: hashedPassword,
        salt,
      },
    });

    if (newUser) {
      res.status(201).json({
        message: "User created",
        user: newUser,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
  }
};

/***
 * Log in User
 * @param {Request} req
 * @param {Response} res
 */
export const SignUserIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // const userExists = await User.findOne({ email }).select(
  //   "_id email isAdmin username password"
  // );

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  try {
    // Return error if user does not exist or passwords do not match
    if (!user || !(await matchPassword(password, user))) {
      res.status(400);
      throw new Error("Login failed. Invalid details");
    }

    res.status(200).json({
      message: "User authenticated",
      user: {
        id: user.id,
        email: user.email,
        username: user.fullname,
        jwt: generateJWT({ id: user.id }),
      },
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

/***
 * Generate API Token for user
 * @param {Request} req
 * @param {Response} res
 */
export const generateAPIToken = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

    if (user.apiKey) {
      res.status(200);
      return res.json({
        message: "API key already generated",
        apiKey: user.apiKey,
      });
    }

    const apiKey = uuidv4();

    const date = new Date();
    const count = 0;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        apiKey: apiKey,
        apiGenerationDate: date,
        apiDailyCount: count,
      },
    });

    res.send({
      message: "API key generated",
      apiKey,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      return res.status(404).json({
        message: "User does not exist",
      });

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const MakeAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  // confirm if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user)
    res.status(401).json({
      message: "User does not exist",
    });

  try {
    // Make admin
    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        isAdmin,
      },
    });

    res.status(200).json({
      message: "User set as admin",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const GetAllUsers = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { order_by } = req.query;
  const { skip, take } = req.query;

  const direction = order_by?.toString().includes("-fullname") ? "desc" : "asc";

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        apiDailyCount: true,
        apiKey: true,
        apiGenerationDate: true,
        isAdmin: true,
      },
      orderBy: {
        fullname: direction,
      },
      skip: parseInt(skip) || SKIP,
      take: parseInt(take) || TAKE,
    });

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const disconnect = (req: Request, res: Response) => {
  if (process.env.ENV === "development") {
    prisma.$disconnect();
  }
};
