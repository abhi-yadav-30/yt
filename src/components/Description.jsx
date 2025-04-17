import React from "react";
import { getTimeAgo } from "../utils/functions";

const Description = ({ videoData, showMoreDisc, handleShowMoreDisc }) => {
  return (
    <div className="whitespace-pre-line bg-gray-100 p-3 mt-4 rounded-xl">
      <div className="font-semibold">
        {parseInt(videoData.views).toLocaleString()} views{" "}
        {getTimeAgo(videoData.publishedAt)}
      </div>
      <div
        className={`text-md ${!showMoreDisc ? "h-12" : ""} overflow-y-hidden`}
      >
        {videoData.description}
      </div>
      {!showMoreDisc ? (
        <div
          className="cursor-pointer font-semibold"
          onClick={() => handleShowMoreDisc(true)}
        >
          ...more
        </div>
      ) : (
        <div
          className="cursor-pointer font-semibold"
          onClick={() => handleShowMoreDisc(false)}
        >
          Show less
        </div>
      )}
    </div>
  );
};

export default Description;
