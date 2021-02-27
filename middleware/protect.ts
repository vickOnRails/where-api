import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

import User from "../models/user.model";

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
      const decoded = jwt.verify(jwtoken.split(" ")[1], tokenSecret);

      // @ts-ignore
      req.user = await User.findById(decoded.id).select(
        "isAdmin _id email username"
      );

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
