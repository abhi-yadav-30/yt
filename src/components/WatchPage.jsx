import React, { use, useEffect, useState } from "react";
import { closeMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getIframUrl,
  getVideoInfoApi,
  isMock,
  YOUTUBE_CHANNEL_IMG_API,
} from "../utils/constants/apis";
import { formatNumber, getTimeAgo, handleShare } from "../utils/functions";
import ButtonList from "./ButtonList";
import SideVideos from "./SideVideos";
import Description from "./Description";
import Comments from "./Comments";
import { WATCH_PAGE_MOCK_DATA } from "../utils/constants/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faShare,
  faThumbsUp as faThumbsUpSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faShareFromSquare,
  faThumbsUp as faThumbsUpRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";
import LiveChatContainer from "./LiveChatContainer";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState({});

  const [reaction, setReaction] = useState({ like: false, dislike: false });

  const [showMoreDisc, setShowMoreDisc] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const videoId = searchParams.get("v");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
    
    let likedVideos = localStorage.getItem("likedVideos");
    if (likedVideos) {
      likedVideos = JSON.parse(likedVideos);
      if (likedVideos.includes(videoId)) setReaction({ dislike:false , like: true })
        else setReaction({ dislike: false, like: false });
    } else {
      setReaction({ dislike: false, like: false });
    }

    fetchData();

    let isHistoryPause = JSON.parse(localStorage.getItem("isHistoryPause"));

    if (!isHistoryPause) {
      console.log("insideee");
      let watchHistory = JSON.parse(localStorage.getItem("watchHistory"));
      if (!watchHistory) {
        watchHistory = [];
        watchHistory.push(videoId);
        console.log("camee");
      } else {
        watchHistory = watchHistory.filter((item) => item !== videoId);
        watchHistory.push(videoId);
      }
      localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
    }
  }, [videoId]);

  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  const fetchData = async () => {
    if (!isMock) {
      let data = await getVideoInfoApi(videoId);
      // console.log(data?.items[0]);
      const { snippet, statistics } = data?.items[0];
      const {
        title,
        publishedAt,
        channelTitle,
        channelId,
        description,
        liveBroadcastContent,
      } = snippet;
      const views = statistics.viewCount;
      const likes = statistics.likeCount;
      const commentCount = statistics.commentCount;
      // console.log(statistics);
      data = await fetch(YOUTUBE_CHANNEL_IMG_API + `&id=${channelId}`);

      const json = await data.json();

      // console.log(json);

      const { thumbnails } = json?.items[0]?.snippet;
      const { subscriberCount } = json?.items[0]?.statistics;

      setVideoData({
        title,
        publishedAt,
        channelTitle,
        channelId,
        views,
        channelImg: thumbnails?.default?.url,
        subscriberCount,
        likes,
        description,
        commentCount,
        liveBroadcastContent,
      });

      let subscriptions = localStorage.getItem("subscriptions");
      if (subscriptions) {
        subscriptions = JSON.parse(subscriptions);
        if (subscriptions.includes(channelId)) setIsSubscribed(true);
        else setIsSubscribed(false);
      } else {
        setIsSubscribed(false);
      }
    } else {
      setVideoData(WATCH_PAGE_MOCK_DATA);
    }
  };

  const handleLike = (key) => {
    let updatedLike;
    if (key === "like") {
      updatedLike = !reaction.like;
      setReaction({ like: updatedLike, dislike: false });
    } else {
      const updatedDislike = !reaction.dislike;
      setReaction({ like: false, dislike: updatedDislike });
      if (updatedDislike) {
        updatedLike = false;
      } else {
        return;
      }
    }

    // Get subscriptions from localStorage
    let likedVideos = localStorage.getItem("likedVideos");
    likedVideos = likedVideos ? JSON.parse(likedVideos) : [];

    if (updatedLike) {
      // Add channelId if not already present
      if (!likedVideos.includes(videoId)) {
        likedVideos.push(videoId);
      }
    } else {
      // Remove channelId if unsubscribing
      likedVideos = likedVideos.filter((id) => id !== videoId);
    }

    // Save back to localStorage
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
  };

  const handleSubscribe = () => {
    const updatedSub = !isSubscribed;
    setIsSubscribed(updatedSub);

    // Get subscriptions from localStorage
    let subscriptions = localStorage.getItem("subscriptions");
    let parsedSubs = subscriptions ? JSON.parse(subscriptions) : [];

    if (updatedSub) {
      // Add channelId if not already present
      if (!parsedSubs.includes(videoData.channelId)) {
        parsedSubs.push(videoData.channelId);
      }
    } else {
      // Remove channelId if unsubscribing
      parsedSubs = parsedSubs.filter((id) => id !== videoData.channelId);
    }

    // Save back to localStorage
    localStorage.setItem("subscriptions", JSON.stringify(parsedSubs));
  };

  return (
    <div
      className={`${
        isMenuOpen ? "mx-3" : ""
      }  pt-6 grid grid-cols-59 overflow-y-auto h-full  pb-[5%]`}
    >
      <div className="col-span-41">
        <div>
          <iframe
            width={isMenuOpen ? "867" : "983"}
            height={isMenuOpen ? "490" : "553"}
            src={getIframUrl(videoId)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        </div>
        <div className="font-bold text-xl py-2">{videoData.title}</div>

        <div className="flex items-center justify-between">
          <div className="flex">
            <div className="mr-3">
              <img
                src={videoData.channelImg}
                alt="chlImg"
                className="w-10 rounded-full"
              />
            </div>
            <div className="mr-10">
              <div className="font-semibold">{videoData.channelTitle}</div>
              <div className="text-xs text-gray-700">
                {formatNumber(videoData.subscriberCount)} subscribers
              </div>
            </div>
            {!isSubscribed ? (
              <button
                className="bg-black w-35 text-white px-6 rounded-4xl font-medium hover:bg-gray-800 cursor-pointer"
                onClick={handleSubscribe}
              >
                Subscrib
              </button>
            ) : (
              <button
                className="bg-red-600 w-35 text-white px-6 rounded-4xl font-medium  cursor-pointer"
                onClick={handleSubscribe}
              >
                Subscribed
              </button>
            )}
          </div>

          <div className="flex">
            <div className="flex mr-2">
              <button
                className={`cursor-pointer px-3 py-2 hover:bg-gray-300  rounded-l-4xl border-r-1 border-gray-300 bg-gray-200 whitespace-nowrap flex
  `}
                onClick={() => handleLike("like")}
              >
                {reaction.like ? (
                  <FontAwesomeIcon icon={faThumbsUpSolid} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faThumbsUpRegular} size="lg" />
                )}
                <span className="font-medium ml-2">
                  {formatNumber(
                    Number(videoData.likes) + (reaction.like ? 1 : 0)
                  )}
                </span>
              </button>
              <button
                className={`cursor-pointer px-4 py-2  rounded-r-4xl bg-gray-200 hover:bg-gray-300`}
                onClick={() => {
                  handleLike("dislike");
                }}
              >
                {reaction.dislike ? (
                  <FontAwesomeIcon icon={faThumbsDownSolid} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faThumbsDownRegular} size="lg" />
                )}
              </button>
            </div>
            <div className="mr-2">
              <button
                className="cursor-pointer px-3 py-2  bg-gray-200 rounded-4xl flex items-center hover:bg-gray-300"
                onClick={() => handleShare(videoData?.title, videoId)}
              >
                <FontAwesomeIcon icon={faShare} size="lg" />
                <span className="font-medium ml-2">Share</span>
              </button>
            </div>
            <div>
              <button
                className="cursor-pointer px-3 py-2  bg-gray-200 rounded-4xl flex items-center hover:bg-gray-300"
                onClick={() => {
                  alert("Download not available yet — coming soon!");
                }}
              >
                <FontAwesomeIcon icon={faDownload} size="lg" />
                <span className="font-medium ml-2">Download</span>
              </button>
            </div>
          </div>
        </div>

        <Description
          videoData={videoData}
          showMoreDisc={showMoreDisc}
          handleShowMoreDisc={(t) => setShowMoreDisc(t)}
        />

        <Comments videoId={videoId} commentCount={videoData.commentCount} />
      </div>

      <div className="col-span-1"></div>

      <div className="col-span-17  w-full pr-5">
        {videoData.liveBroadcastContent &&
        videoData.liveBroadcastContent === "live" ? (
          <LiveChatContainer />
        ) : (
          <div className="overflow-x-auto">
            <ButtonList />
          </div>
        )}

        <SideVideos />
      </div>
    </div>
  );
};

export default WatchPage;
