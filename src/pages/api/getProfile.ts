import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  console.log(id);
  try {
    const result = await prismadb.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        bio: true,
        image: true,
        pics: true,
      },
    });

    console.log(result);
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
