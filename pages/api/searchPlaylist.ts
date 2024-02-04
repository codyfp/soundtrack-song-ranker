/**
 * Searches youtube to find a playlist for a given query
 */
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import playlistDetails from '../../utils/apiUtils/playlistDetails';

const playlistSearch = async (query: string) => {
  console.log("Searching youtube for...", query);
  try {
    const res = await axios({
      "method": "GET",
      "url": 'https://www.googleapis.com/youtube/v3/search',
      "params": {
        'part': 'id',
        'maxResults': '1',
        'key': process.env.YOUTUBE_API_KEY,
        'q': query,
        'type': 'playlist',
      }
    })
    return res.data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchQuery } = req.query;
  if (!searchQuery) {
    res.status(400).send('No query provided');
    return;
  }
  try {
    const playlistSearchResults = await playlistSearch(searchQuery as string);
    if (playlistSearchResults.length === 0) {
      res.status(404).send('No results found');
      return;
    }
    const playlistDetailsResults = await playlistDetails({ playlistId: playlistSearchResults[0].id.playlistId });

    // Add the playlistId to the response
    playlistDetailsResults.playlistId = playlistSearchResults[0].id.playlistId;

    res.status(200).json(playlistDetailsResults);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
