import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email,
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

  return res.status(200).json(currentUser);
}
