import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="ml-7 h-full flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white pl-2 py-3 pr-1 w-[97%] overflow-x-auto">
        <ButtonList />
      </div>

      {/* Scrollable content takes the rest of the space */}
      <div className="flex-1 overflow-y-auto w-[98%] pt-4 mb-[5%] pb-9">
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;
