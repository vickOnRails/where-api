import { NextFunction, Request, Response } from "express";

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (req.user.isAdmin) {
    return next();
  }

  res.status(401);
  res.json({
    message: "Not authorized. Invalid token",
  });
};
