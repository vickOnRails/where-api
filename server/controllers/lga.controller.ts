import { Request, Response } from "express";

const getAllStateLGAs = (req: Request, res: Response) => {
  res.json({
    message: "Gimme the Ginger LGAs",
  });
};

export { getAllStateLGAs };
