import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prismadb.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        pics: {
          select: {
            id: true,
            url: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json(users);
  } catch (error: any) {
    console.error("Error in serverAuth:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default getUsers;
