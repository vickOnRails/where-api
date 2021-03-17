import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { prisma, SKIP, TAKE } from "../server";
import { generateJWT } from "../util/generateJWT";
import { IUser } from "../types";
import { encryptPassword } from "../util/encryptPassword";
import { matchPassword } from "../util/matchPassword";
import { response } from "../util/response";

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
          data: newUser,
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
            email: user.email,
            username: user.fullname,
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
      return res.json(
        response({
          message: "API key already generated",
          success: true,
          data: {
            apiKey: user.apiKey,
          },
        })
      );
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

    res.json(
      response({
        message: "API key generated",
        success: true,
        data: {
          apiKey,
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

export const DeleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      return res.status(404).json(
        response({
          message: "User does not exist",
          success: false,
        })
      );

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    res.status(200).json(
      response({
        message: "User deleted successfully",
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
    res.status(401).json(
      response({
        message: "User does not exist",
        success: false,
      })
    );

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

    res.status(200).json(
      response({
        message: "User set as admin",
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

export const GetAllUsers = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { order_by } = req.query;
  const { skip, take, fields } = req.query;

  const direction = order_by?.toString().includes("-fullname") ? "desc" : "asc";
  let selectQuery = {};

  if (fields) {
    const fieldsArr = fields && fields.split(",");

    selectQuery = {
      select: {
        id: fieldsArr.includes("id"),
        fullname: fieldsArr.includes("fullname"),
        email: fieldsArr.includes("email"),
        apiDailyCount: fieldsArr.includes("apiDailyCount"),
      },
    };
  }

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
      ...selectQuery,
    });

    res
      .status(200)
      .json(response({ data: users, message: "Users fetched", success: true }));
  } catch (err) {
    res.status(500).json(
      response({
        message: err.message,
        success: false,
      })
    );
  }
};
