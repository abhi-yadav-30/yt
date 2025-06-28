import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import CameraViewer from "./cameraViwer";

const MainContainer = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sticky ButtonList at the top */}
      <div className="sticky top-0 z-40 bg-white px-4 py-3 w-full border-b overflow-x-auto">
        <ButtonList />
      </div>
     <div>
      <CameraViewer/>
     </div>

      {/* Scrollable VideoContainer */}
      <div className="flex-1 overflow-y-auto sm:px-4  pt-4 pb-9">
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;
