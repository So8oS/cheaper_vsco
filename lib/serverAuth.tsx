import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prismadb from "../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const session = await getSession({ req });
    //@ts-ignore
    const session2 = await getServerSession(req, res, authOptions);
    // console.log({ session });
    console.log({ session2 });

    if (!session2?.user?.email) {
      throw new Error("Not Signed In");
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session2.user.email,
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
    console.log(currentUser);
    return currentUser;
  } catch (error: any) {
    console.error("Error in serverAuth:", error.message);
    throw error; // rethrow the error to pass it to the client
  }
};

export default serverAuth;
