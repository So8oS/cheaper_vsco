import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "../lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  console.log("====", session);

  if (!session?.user?.email) {
    throw new Error("Not Signeddd");
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
  if (!currentUser) {
    throw new Error(`not signed in`);
  }

  return { currentUser };
};

export default serverAuth;
