import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./../src/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest) => {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);

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

    return { currentUser };
  } catch (error) {
    //@ts-ignore
    console.error("Error in serverAuth:", error.message);
    throw error; // rethrow the error to pass it to the client
  }
};

export default serverAuth;
