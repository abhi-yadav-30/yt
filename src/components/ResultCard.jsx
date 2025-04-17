import React, { useEffect, useState } from "react";
import { formatNumber, getTimeAgo, handleShare } from "../utils/functions";
import { YOUTUBE_CHANNEL_IMG_API } from "../utils/constants/apis";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTowerBroadcast } from "@fortawesome/free-solid-svg-icons";

const ResultCard = ({ result , isHistory=false }) => {
  if (!result) return <div>Loading...</div>;
  // const [channelImg, setChannelImg] = useState(null);

  const [show, setShow] = useState(false);

  const handleInfoClick = () => {
    setShow(!show);
  };

  const {
    id,
    publishedAt,
    channelId,
    channelTitle,
    title,
    thumbnails,
    description,
    statistics,
    channelImg,
  } = result;

  // useEffect(() => {
  //   fetchData();
  // }, [channelImg]);

  // const fetchData = async () => {
  //   // console.log("came");
  //   if (channelId) {
  //     const data = await fetch(YOUTUBE_CHANNEL_IMG_API + `&id=${channelId}`);

  //     const json = await data.json();

  //     // console.log(json);

  //     const { thumbnails } = json?.items[0]?.snippet;

  //     // console.log("iimagee : ", thumbnails?.high?.url);

  //     if (thumbnails?.high?.url || thumbnails?.medium?.url) {
  //       setChannelImg(thumbnails.high.url || thumbnails.medium.url);
  //     }

  //   }
  // };

  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  if (!thumbnails) return <div></div>;

  return (
    <div
      className={`grid grid-cols-16    mb-4 ${
        isMenuOpen ? "mx-5 ml-10" : "mx-34"
      }`}
    >
      <div className=" col-span-6 mr-4 aspect-video">
        <img
          src={
            thumbnails?.maxres?.url ||
            thumbnails?.high?.url ||
            thumbnails?.medium?.url ||
            thumbnails?.default?.url
          }
          alt="thumbnail"
          className="w-full h-44 md:h-52 lg:h-60 object-cover rounded-xl hover:rounded-none transition-all duration-300"
        />
      </div>
      <div className="col-span-9">
        <div className="text-xl font-medium mb-2">{title}</div>
        <div className="text-md font-semibold mb-2">
          {formatNumber(statistics?.viewCount)} views •{" "}
          {getTimeAgo(publishedAt)}
        </div>
        <div className="flex mb-2">
          {channelImg && (
            <>
              {/* {console.log(channelImg)} */}
              <img
                src={channelImg}
                alt="channel Img"
                className="w-8 rounded-full mr-4"
              />
            </>
          )}

          {channelTitle}
        </div>
        {description && description.length > 0 && (
          <div className="h-6 overflow-hidden">{description}</div>
        )}

        {result?.liveBroadcastContent ? (
          result?.liveBroadcastContent === "live" && (
            <div className="bg-red-500 py-1 text-white rounded-lg mt-2 w-20 flex justify-center items-center">
              <FontAwesomeIcon icon={faTowerBroadcast} className="mr-1" size="sm" /> 
              LIVE
            </div>
          )
        ) : (
          <></>
        )}
      </div>

      <div
        className="z-40 cursor-pointer min-w-10 rounded-full hover:bg-gray-300  h-10 flex justify-center items-center ml-auto col-span-1"
        onClick={(e) => {
          e.stopPropagation(); // ensure it stops before reaching Link
          e.preventDefault(); // also prevent the default anchor behavior
          handleInfoClick();
        }}
      >
        {show && (
          <div
            className="absolute flex px-8 py-2  bg-gray-300 mr-40 justify-center rounded-md hover:bg-gray-400"
            onClick={() => {
              handleShare(title, id);
            }}
          >
            <img
              src="https://pngimg.com/d/share_PNG27.png"
              alt="share"
              className="w-5 mr-2"
            />
            <span className="font-medium">Share</span>
          </div>
        )}

        <img
          src="https://cdn-icons-png.flaticon.com/512/10025/10025520.png"
          alt="info"
          className="w-7 h-7 cursor-pointer z-40"
        />
      </div>
    </div>
  );
};

export default ResultCard;
