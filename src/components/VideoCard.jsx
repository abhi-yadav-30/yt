import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isMock, YOUTUBE_CHANNEL_IMG_API } from "../utils/constants/apis";
import { getTimeAgo } from "../utils/functions";
import VideoType from "./VideoType";

const VideoCard = ({ info }) => {
  const [channelImg, setChannelImg] = useState("");
  if (!info) return <div className="w-60 bg-gray-100 h-40">hkhkh</div>;

  useEffect(() => {
    if (!isMock) fetcChannleData();
  }, []);

  const fetcChannleData = async () => {
    const data = await fetch(
      YOUTUBE_CHANNEL_IMG_API + `&id=${info?.snippet?.channelId}`
    );

    const json = await data.json();

    // console.log(json);
    const { thumbnails } = json?.items[0]?.snippet;
    setChannelImg(thumbnails?.default?.url);
    // console.log(thumbnails?.default?.url);
  };

  const { snippet, statistics } = info;
  const { title, thumbnails, publishedAt, channelTitle } = snippet;
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  //  console.log({lable:channelTitle , icon:channelImg});
  // if(!channelImg) return;
  return (
    <div
      className={` ${
        isMenuOpen ? "w-96" : "w-110"
      } shadow-xl rounded-xl cursor-pointer mb-2`}
    >
      <img
        src={thumbnails?.maxres?.url || thumbnails?.medium?.url}
        alt="thumbnail"
        className={` ${isMenuOpen ? "w-100" : "w-115"} rounded-xl`}
      />
      <div className="p-2 flex ">
        <div className="min-w-13">
          {channelImg.length !== 0 && (
            <img src={channelImg} alt="chlImg" className="w-10 rounded-full" />
          )}
        </div>
        <div>
          <div className="font-bold text-md h-13 overflow-hidden">{title}</div>
          <div className="text-sm text-gray-600 font-medium">
            {channelTitle}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {parseInt(statistics?.viewCount / 1000)}K views •{" "}
            {getTimeAgo(publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoType(VideoCard);
