import { Request, Response, NextFunction } from "express";

import { prisma } from "../server";

const MAX_LIMIT = process.env.MAX_LIMIT || 10;
export const validateAPIKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      res.status(401);
      throw new Error(
        "Authentication error. Please attach an API key to your requests"
      );
    }

    // check in the JWT if this particular user has generated a token
    const user = await prisma.user.findUnique({
      where: {
        apiKey,
      },
    });

    if (!user) {
      res.status(404);
      throw new Error("Invalid API key");
    }

    if (!user || user.apiKey !== apiKey) {
      res.status(401);
      throw new Error("Invalid API key");
    }

    // If user has generated a token, check if the last calling date is the same with the present calling one
    const today = new Date().toISOString().split("T")[0];
    const curDate = user.apiGenerationDate?.toISOString().split("T")[0];

    // check if the API has been used today
    if (today === curDate) {
      // If it is check if the count is greater than the MAX_COUNT
      if (user.apiDailyCount && user.apiDailyCount >= MAX_LIMIT) {
        res.status(492);
        // If it is greater than the max count, then return an error saying we've exceeded the daily count
        throw new Error("Exceeded the daily API limits");
      } else {
        // If it is not greater, go ahead with the request
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            apiDailyCount: (user.apiDailyCount as number) + 1,
          },
        });
      }
    } else {
      // If api hasn't been used today, reset the date and count
      // If the last calling date is different from the present calling date, then reset the API count

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          apiGenerationDate: new Date(),
          apiDailyCount: (user.apiDailyCount as number) + 1,
        },
      });
    }

    next();
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
