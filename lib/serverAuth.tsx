import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "../lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  try {
    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error("Not Signed In");
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        bio: true,
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

    return currentUser;
  } catch (error: any) {
    console.error("Error in serverAuth:", error.message);
    throw error; // rethrow the error to pass it to the client
  }
};

export default serverAuth;
