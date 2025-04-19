import React, { useEffect, useState } from "react";
import { formatNumber, getTimeAgo, handleShare } from "../utils/functions";
import { YOUTUBE_CHANNEL_IMG_API } from "../utils/constants/apis";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faShare,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";

const ResultCard = ({ result, isHistory = false }) => {
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
      className={`grid grid-cols-1 w-full sm:w-auto sm:grid-cols-16 mx-0 mb-4 ${
        isMenuOpen ? "lg:mx-5 ml-10 md:mx-2" : "lg:mx-34 md:mx-10"
      }`}
    >
      <div className="col-span-1 w-full sm:w-auto sm:col-span-8 2xl:col-span-6 lg:col-span-9 mr-4 aspect-video">
        <img
          src={
            thumbnails?.maxres?.url ||
            thumbnails?.high?.url ||
            thumbnails?.medium?.url ||
            thumbnails?.default?.url
          }
          alt="thumbnail"
          className="w-full  aspect-video lg:h-60 object-cover sm:rounded-xl hover:rounded-none transition-all duration-300"
        />
      </div>
      <div className="col-span-1 w-full sm:w-auto sm:col-span-8 2xl:col-span-10 lg:col-span-7 flex">
        <div className="pt-1 px-2 sm:p-0">
          <div className="lg:text-xl  font-medium mb-2 max-h-11  sm:h-14 lg:h-15 overflow-hidden break-all line-clamp-2 w-full">
            {title}
          </div>
          <div className=" text-sm md:text-sm lg:text-md font-semibold mb-2">
            {formatNumber(statistics?.viewCount)} views •{" "}
            {getTimeAgo(publishedAt)}
          </div>

          {description && description.length > 0 && (
            <div className="h-6 overflow-hidden">{description}</div>
          )}

          <div className="flex  flex-row sm:flex-col justify-between">
            <div className="flex mb-2 ">
              {channelImg && (
                <>
                  {/* {console.log(channelImg)} */}
                  <img
                    src={channelImg}
                    alt="channel Img"
                    className=" w-8 md:w-6 lg:w-8 rounded-full mr-4"
                  />
                </>
              )}

              {channelTitle}
            </div>

            {result?.liveBroadcastContent ? (
              result?.liveBroadcastContent === "live" && (
                <div className="bg-red-500 py-1 text-white rounded-lg mt-2 lg:w-20 w-12  flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faTowerBroadcast}
                    className="mr-1"
                    size="sm"
                  />
                  <span className=" hidden lg:block">LIVE</span>
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>

        <div
          className="relative z-40 cursor-pointer min-w-10 rounded-full hover:bg-gray-300  h-10 flex justify-center items-center ml-auto "
          onClick={(e) => {
            e.stopPropagation(); // ensure it stops before reaching Link
            e.preventDefault(); // also prevent the default anchor behavior
            handleInfoClick();
          }}
        >
          {show && (
            <div
              className="absolute flex px-8 py-2  bg-gray-300 mr-40 justify-center items-center rounded-md hover:bg-gray-400"
              onClick={() => {
                handleShare(title, id);
              }}
            >
              <FontAwesomeIcon icon={faShare} size="lg" />

              <span className="font-medium ml-3">Share</span>
            </div>
          )}

          <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
