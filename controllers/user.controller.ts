import { json } from "body-parser";
import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../models/user.model";
import { prisma } from "../server";
import { generateJWT } from "../util/generateJWT";
import { IUser } from "../types";

/***
 * Register user to system
 * @param {Request} req
 * @param {Response} res
 */

const RegisterUser = async (req: Request, res: Response) => {
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

  // FIXME: Remove this user entirely
  const encryptPassword = async (password: string) => {
    if (!password) throw new Error("Please provide a password");

    let salt: string = await bcrypt.genSalt();
    let hashedPassword: string = await bcrypt.hash(password, salt);

    return { hashedPassword, salt };
  };

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
const SignUserIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // const userExists = await User.findOne({ email }).select(
  //   "_id email isAdmin username password"
  // );

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // FIXME: Use appropriate types here
  const matchPassword = async (password: string, user: any) => {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (err) {
      throw new Error(err.message);
    }
  };

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
const generateAPIToken = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user.id);

  try {
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

    const apiKey = (mongoose.Types.ObjectId() as unknown) as string;
    const date = new Date();
    const count = 0;

    const usage = {
      date,
      count,
    };

    await User.updateOne({ _id: user.id }, { apiKey: apiKey, usage });

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

export { RegisterUser, SignUserIn, generateAPIToken };
