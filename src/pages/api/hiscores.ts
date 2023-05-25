import { NextApiRequest, NextApiResponse } from 'next';
import { Hiscores } from 'oldschooljs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  try {
    const data = await Hiscores.fetch(username as string);
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch hiscores: ", error);
    res.status(500).json({ message: 'An error occurred.' });
  }
}