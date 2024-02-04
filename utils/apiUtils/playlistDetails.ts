import axios from 'axios'

/** returns minimal details of a playlist  for page count usage*/
export default async ({ playlistId, part = "id", maxResults = "1", pageToken }: { playlistId: string, part?: string, maxResults?: string, pageToken?: string }) => {
  // Note maxResults will cap at 50 even if it is passed higher
  try {
    const params: {
      part: string;
      playlistId: string;
      maxResults: string;
      key: string | undefined;
      pageToken?: string; // Add 'pageToken' property to the type definition
    } = {
      'part': part,
      'playlistId': playlistId,
      'maxResults': maxResults,
      'key': process.env.YOUTUBE_API_KEY,
    }

    if (pageToken) {
      params['pageToken'] = pageToken;
    }

    const res = await axios({
      "method": "GET",
      "url": 'https://www.googleapis.com/youtube/v3/playlistItems',
      "params": params
    })
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};