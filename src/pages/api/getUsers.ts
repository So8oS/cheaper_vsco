import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../../lib/prismadb";
import { u } from "uploadthing/dist/types-caf29eb6";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prismadb.user.findMany({
      select: {
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
  } catch (error) {
    //@ts-ignore

    console.error("Error in serverAuth:", error.message);
    //@ts-ignore

    return { error: error.message };
  }
};

export default getUsers;
