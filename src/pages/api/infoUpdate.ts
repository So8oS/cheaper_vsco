import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, newName, newBio } = req.body;

  try {
    const newInfo = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        name: newName,
        bio: newBio,
      },
    });
    return res.status(200).json(newInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
