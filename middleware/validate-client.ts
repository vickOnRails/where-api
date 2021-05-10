import { Request, Response, NextFunction } from "express";

export const validateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the origins we expect results from
  const ORIGINS = process.env.HOSTS;

  // Things we'd want to do here
  // 1. Ensure the correct clientId exists and is being passed here
  // 2. Ensure the request is coming from the right client header
  try {
    // Ensure the host is either localhost:5000 or whereapi.xyz
    const origin = req.get("origin");

    // console.log({ host: req.get("host"), origin: req.get("origin") });

    // I was thinking of adding the headers, but we could do that later since this basic setup works

    // If this is a postman setup, let the request go
    // FIXME: But disable this in production so someone doesn't just bring this into their postman client and perform the request
    const isPostman = req.headers["user-agent"]?.startsWith("Postman");

    // console.log(origin);

    // if ((origin && ORIGINS?.split(",").includes(origin)) || isPostman) {

    if ((origin && ORIGINS?.includes(origin)) || isPostman) {
      next();
    } else {
      res.status(401);
      return res.json({
        message: "Invalid token. Not authorized",
        success: false,
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
