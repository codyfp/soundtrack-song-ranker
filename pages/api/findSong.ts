/**
 * Searches youtube to find a playlist for a given query
 */
import { NextApiRequest, NextApiResponse } from 'next';
import playlistDetails from '../../utils/apiUtils/playlistDetails';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlistId, index } = req.query;
  let indexNum = Number(index);

  if (!playlistId || !index) {
    res.status(400).send('Missing query parameters for id and/or song');
    return;
  }

  try {
    let playlistDetailsResults = await playlistDetails({ playlistId: playlistId as string, maxResults: index as string, part: "snippet,status,contentDetails" });
    if (playlistDetailsResults.items.length === 0) {
      res.status(404).send('No results found');
      return;
    }
    while (indexNum > 50) {
      indexNum = indexNum - 50;
      playlistDetailsResults = await playlistDetails({
        playlistId: playlistId as string,
        maxResults: indexNum.toString(),
        part: "snippet,status,contentDetails",
        pageToken: playlistDetailsResults.nextPageToken
      });
    }

    let song = playlistDetailsResults.items[indexNum - 1];
    res.status(200).json(song);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
