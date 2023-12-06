import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, newImage } = req.body;
  console.log(newImage, userId);
  if (!userId || !newImage) {
    return res.status(400).json({ error: "Bad Request" });
  }
  try {
    const newpp = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        image: newImage,
      },
    });
    return res.status(200).json(newpp);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
