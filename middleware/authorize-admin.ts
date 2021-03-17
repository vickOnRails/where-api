import { NextFunction, Request, Response } from "express";

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (req.user && req.user.isAdmin) {
    return next();
  }

  console.log(req);

  res.status(401);
  res.json({
    message: "Not authorized. Invalid token",
  });
};
