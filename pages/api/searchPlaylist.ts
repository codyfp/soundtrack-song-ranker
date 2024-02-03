/**
 * Searches youtube to find a playlist for a given query
 */
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'

const searchYoutube = async (query: string) => {

  try {
    const res = await axios({
      "method": "GET",
      "url": 'https://www.googleapis.com/youtube/v3/search',
      "params": {
        'part': 'snippet',
        'maxResults': '5',
        'key': process.env.YOUTUBE_API_KEY,
        'q': query
      }
    })
    return res.data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;
  if (!query) {
    res.status(400).send('No query provided');
    return;
  }

  const playlist = await searchYoutube(query as string);

  res.status(200).json(playlist);
};
