import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import VideoCard from './VideoCard'

const VideoType = (VideoCard) => {
  return (props)=>{
    return (
      <div className='relative'>
        {props?.info?.snippet?.liveBroadcastContent &&
          props?.info?.snippet?.liveBroadcastContent === "live" && (
            <div className="bg-red-500 py-1 text-white rounded-lg mt-2 w-20 flex justify-center items-center absolute ml-2">
              <FontAwesomeIcon
                icon={faTowerBroadcast}
                className="mr-1"
                size="sm"
              />
              LIVE
            </div>
          )}
        <VideoCard {...props} />
      </div>
    );
  }
}

export default VideoType;


// result?.liveBroadcastContent ? (
//           result?.liveBroadcastContent === "live" && (
            