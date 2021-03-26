import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { prisma, SKIP, TAKE } from "../server";
import { generateJWT } from "../util/generateJWT";
import { encryptPassword } from "../util/encryptPassword";
import { matchPassword } from "../util/matchPassword";
import { response } from "../util/response";
import { baseAPI } from "../util/base-api";

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

    res.status(200).json(
      response({
        message: "User authenticated",
        success: true,
        data: {
          user: {
            id: user.id,
            // email: user.email,
            // username: user.fullname,
            jwt: generateJWT({ id: user.id }),
          },
        },
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

/***
 * Register user to system
 * @param {Request} req
 * @param {Response} res
 */

export const RegisterUser = async (req: Request, res: Response) => {
  const { email, password, fullname } = req.body;

  if (email === null || password === null || fullname === null)
    res.status(422).json(
      response({
        message: "Please ensure required fields are filled",
        success: false,
      })
    );

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
      res.status(201).json(
        response({
          message: "User created",
          data: { id: newUser.id, jwt: generateJWT({ id: newUser.id }) },
          success: true,
        })
      );
    }
  } catch (err) {
    res.json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};
