import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
