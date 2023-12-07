import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uploadUrl, userId } = req.body;
  if (!uploadUrl || !userId) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const pic = await prismadb.pic.create({
      data: {
        url: uploadUrl,
        userId,
      },
    });
    return res.status(200).json({ pic });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
