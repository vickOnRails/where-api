import { Request, Response } from "express";
import mongoose from "mongoose";

import User from "../models/user.model";
import { generateJWT } from "../util/generateJWT";

/***
 * Register user to system
 * @param {Request} req
 * @param {Response} res
 */
const RegisterUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  const userExists = await User.findOne({ email, username });

  try {
    if (userExists) {
      res.status(400);
      throw new Error("This user already exists");
    }

    const newUser = await User.create({
      _id: mongoose.Types.ObjectId(),
      email,
      password,
      username,
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

  const userExists = await User.findOne({ email }).select(
    "_id email isAdmin username password"
  );

  try {
    // Return error if user does not exist or passwords do not match
    if (!userExists || !(await userExists.matchPassword(password))) {
      res.status(400);
      throw new Error("Login failed. Invalid details");
    }

    res.status(200).json({
      message: "User authenticated",
      user: {
        _id: userExists._id,
        email: userExists.email,
        username: userExists.username,
        jwt: generateJWT({ id: userExists._id }),
      },
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

export { RegisterUser, SignUserIn };
