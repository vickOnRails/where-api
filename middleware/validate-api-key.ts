import { Request, Response, NextFunction } from "express";
export const validateAPIKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check in the JWT if this particular user has generated a token

  const apiKey = req.header("x-api-key");

  console.log(apiKey);

  next();

  // If user has generated a token, check if the last calling date is the same with the present calling one
  // If it is check if the count is greater than the MAX_COUNT
  // If it is greater than the max count, then return an error saying we've exceeded the daily count
  // If it is not greater, go ahead with the request
  // If the last calling date is different from the present calling date, then reset the API count
};
