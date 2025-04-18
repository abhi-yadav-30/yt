import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isMock, YOUTUBE_CHANNEL_IMG_API } from "../utils/constants/apis";
import { getTimeAgo } from "../utils/functions";
import VideoType from "./VideoType";

const VideoCard = ({ info }) => {
  const [channelImg, setChannelImg] = useState("");
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    if (!isMock) fetchChannelData();
  }, []);

  const fetchChannelData = async () => {
    const data = await fetch(
      `${YOUTUBE_CHANNEL_IMG_API}&id=${info?.snippet?.channelId}`
    );
    const json = await data.json();
    const { thumbnails } = json?.items[0]?.snippet;
    setChannelImg(thumbnails?.default?.url);
  };

  if (!info) return <div className="bg-gray-100 h-40">Loading...</div>;

  const { snippet, statistics } = info;
  const { title, thumbnails, publishedAt, channelTitle } = snippet;

  return (
    <div className="w-full sm:aspect-[16/14] bg-white shadow-md  sm:rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Thumbnail */}
      <div className="aspect-[16/9] w-full">
        <img
          src={thumbnails?.maxres?.url || thumbnails?.medium?.url}
          alt="thumbnail"
          className="w-full h-full object-cover sm:rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex gap-3 items-start flex-1 overflow-hidden">
        {channelImg && (
          <img
            src={channelImg}
            alt="channel"
            className="w-10 h-10 rounded-full shrink-0"
          />
        )}
        <div className="flex flex-col justify-between overflow-hidden">
          <div className="font-semibold text-md line-clamp-2">{title}</div>
          <div className="text-sm text-gray-600 truncate">{channelTitle}</div>
          <div className="text-sm text-gray-600">
            {parseInt(statistics?.viewCount / 1000)}K views •{" "}
            {getTimeAgo(publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoType(VideoCard);
