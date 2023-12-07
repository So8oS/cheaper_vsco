import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uploadUrl, userId } = req.body;
  console.log(uploadUrl, userId);
  try {
    const newpp = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        image: uploadUrl,
      },
    });
    return res.status(200).json(newpp);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
