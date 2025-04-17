import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HOCsideVideo = (SideVideo) => {
  return (props) => {
    return (
      <div className={`relative  ${props.isHistory ? "mr-4 ml-6" : ""}`}>
        {props.isManageHistory && (
          <div className="absolute w-full  mt-7 z-100">
            <div
              className="hover:bg-gray-200 ml-auto w-7 flex justify-center items-center h-7 rounded-full"
              onClick={(e) => {
                e.stopPropagation(); // ensure it stops before reaching Link
                e.preventDefault(); // also prevent the default anchor behavior
                props.handleDeleteVideo(props?.info?.id);
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                className="cursor-pointer"
              />
            </div>
          </div>
        )}
        <SideVideo {...props} />
      </div>
    );
  };
};

export default HOCsideVideo;
