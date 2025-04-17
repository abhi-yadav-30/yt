const API_KEY = import.meta.env.VITE_API_KEY;
// const API_KEY= "bn"
import jsonp from "jsonp";
export let isMock = false;

export const OFFSET_LIVE_CHAT = 50;

export const YOUTUBE_BASE_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,snippet&key=${API_KEY}`;
export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=" +
  API_KEY;
export const YOUTUBE_CHANNELS_API = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${API_KEY}`;
export const YOUTUBE_CHANNEL_IMG_API =
  "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=" +
  API_KEY;

export const getVideoInfoApi = async (videoId) => {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=` +
      API_KEY
  );
  const json = await data.json();
  return json;
};

export const getIframUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}?si=crU8ucjvJ82AOekX&autoplay=1`;
};

export const getComments = async (videoId) => {
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&order=relevance&videoId=${videoId}&maxResults=40&key=` +
      API_KEY
  );
  const json = await data.json();
  return json;
};

export const searchVideos = async (searchText) => {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchText}&key=${API_KEY}`
  );
  const searchData = await data.json();

  const videoIds = searchData.items.map((item) => item.id.videoId).join(",");
  const statsRes = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
  );
  const statsData = await statsRes.json();

  const channelIds = [
    ...new Set(searchData.items.map((item) => item.snippet.channelId)),
  ];
  const channelsRes = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds.join(
      ","
    )}&key=${API_KEY}`
  );

  const channelsData = await channelsRes.json();

  const channelImageMap = {};
  channelsData.items.forEach((channel) => {
    const thumbnails = channel.snippet.thumbnails;
    channelImageMap[channel.id] =
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      thumbnails.default?.url ||
      "";
  });

  const finalData = searchData.items.map((item) => {
    const stats = statsData.items.find((stat) => stat.id === item.id.videoId);
    const channelImg = channelImageMap[item.snippet.channelId];

    return {
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnails: item.snippet.thumbnails,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      liveBroadcastContent: item.snippet.liveBroadcastContent,
      statistics: stats ? stats.statistics : {},
      channelImg,
    };
  });

  return finalData;
};

export const searchSuggetions = async (textForSuggetion) => {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
    textForSuggetion
  )}`;

  return new Promise((resolve, reject) => {
    jsonp(url, null, (err, data) => {
      if (err) {
        console.error("JSONP Error:", err);
        reject(err);
      } else {
        resolve(data[1]); // suggestions
      }
    });
  });
};
export const fetchShorts = async () => {
  const searchQuery = "shorts";
  const BASE_URL = "https://www.googleapis.com/youtube/v3";

  try {
    // Step 1: Search for videos
    const searchResponse = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&maxResults=50&q=${searchQuery}&key=${API_KEY}`
    );
    const searchData = await searchResponse.json();

    const videoIds = searchData.items
      .map((item) => item.id?.videoId)
      .filter((id) => id);

    if (videoIds.length === 0) return [];

    // Step 2: Get details of those videos (includes duration)
    const detailsResponse = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    const detailsData = await detailsResponse.json();

    // Step 3: Filter only Shorts (duration <= 60s)
    const shorts = detailsData.items.filter((video) => {
      const duration = video.contentDetails.duration;
      const match = duration.match(/^PT(\d+)S$/); // e.g., PT59S
      return match && parseInt(match[1]) <= 60;
    });

    return shorts;
  } catch (error) {
    console.error("Failed to fetch Shorts:", error);
    return [];
  }
};
