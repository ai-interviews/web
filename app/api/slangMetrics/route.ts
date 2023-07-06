import { NextApiRequest, NextApiResponse } from "next";
import { getSlangFrequency } from "../../(app)/metrics/_lib/getSlangFrequency";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await getSlangFrequency();
  res.status(200).json(data);
}
