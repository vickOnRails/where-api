import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { prisma } from "../server";
import { IUser } from "../types";

/**
 *  Acts as a filter for requests without the jwt token
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let jwtoken = req.headers.authorization;
  let tokenSecret = process.env.JWT_TOKEN as string;

  if (jwtoken && jwtoken.startsWith("Bearer")) {
    try {
      const decoded = jwt.verify(jwtoken.split(" ")[1], tokenSecret) as IUser;

      //@ts-ignore
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      next();
    } catch (err) {
      res.status(401);
      res.json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    res.status(401);
    res.json({
      message: "Not authorized, token failed",
    });
  }
};
