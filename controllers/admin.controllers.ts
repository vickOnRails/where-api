import { Request, Response } from "express";
import { prisma } from "../server";
import { response } from "../util/response";

/***
 * Promote a natural user to an Admin
 */
export const MakeAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  // confirm if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user)
    res.status(401).json(
      response({
        message: "User does not exist",
        success: false,
      })
    );

  try {
    // Make admin
    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        isAdmin,
      },
    });

    res.status(200).json(
      response({
        message: "User set as admin",
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
