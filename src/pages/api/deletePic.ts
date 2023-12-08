import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { picId } = req.body;
  if (!picId) {
    return res.status(400).json({ error: "Cannot Delete" });
  }
  try {
    const pic = await prismadb.pic.delete({
      where: {
        id: picId,
      },
    });
    return res.status(200).json({ pic });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
