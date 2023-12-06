import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req);

    if (req.method === "GET") {
      return res.status(200).json(currentUser);
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
