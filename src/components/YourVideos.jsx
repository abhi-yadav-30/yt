import React from "react";
import yourVideos from "../assets/yourVideos.jpg";

const YourVideos = () => {
  return (
    <div className="w-full flex items-center h-full">
      <center>
        <img src={yourVideos} alt="your Videos" className="w-[60%]" />
        <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-3">
          <div className="text-2xl font-semibold mb-2">
            Get ready to showcase your creativity
          </div>
          <div className="text-md">your videos will appear here!</div>
        </div>
      </center>
    </div>
  );
};

export default YourVideos;
