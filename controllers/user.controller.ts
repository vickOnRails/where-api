import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { prisma, SKIP, TAKE } from "../server";
import { response } from "../util/response";
import { baseAPI } from "../util/base-api";

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

    res.status(200).json(
      response({
        data: users.map((user) => {
          return { ...user, url: `${baseAPI}/admin/users/${user.id}` };
        }),
        message: "Users fetched",
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

export const GetUser = async (
  req: Request<any, any, any, any>,
  res: Response
) => {
  const { fields } = req.query;
  const { userId } = req.params;

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
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        fullname: true,
        email: true,
        apiDailyCount: true,
        apiKey: true,
        apiGenerationDate: true,
        isAdmin: true,
        createdAt: true,
      },
      ...selectQuery,
    });

    res.status(200).json(
      response({
        data: user,
        message: "User fetched",
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
