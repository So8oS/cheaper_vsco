import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { search } = req.body;

    if (!search || typeof search !== "string" || search.trim() === "") {
      return res.status(400).json({ error: "Invalid search parameter" });
    }

    const result = await prismadb.user.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    console.log(result);
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
