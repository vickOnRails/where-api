import { Request, Response } from "express";

const adminController = (req: Request, res: Response) => {
  res.json({
    message: "API/ADMIN",
  });
};

export { adminController };
