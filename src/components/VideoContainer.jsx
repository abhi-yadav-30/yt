import React, { useEffect, useState } from "react";
import { isMock, YOUTUBE_VIDEOS_API } from "../utils/constants/apis";
import { HOME_PAGE_MOCK_DATA } from "../utils/constants/mockData";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import notfound from "../assets/notfound.svg";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);

      let json = {};
      if (!isMock) {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        json = await data.json();
      } else {
        json = HOME_PAGE_MOCK_DATA;
      }

      if (json?.items) {
        setVideos(json.items);
      } else {
        setVideos([]);
      }
      setLoading(false);
    } catch (e) {
      console.log("error in home page : ", e);
      setVideos([]);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (videos.length === 0)
    return (
      <div className="w-full mt-[2%]">
        <center>
          <img src={notfound} alt="your Videos" className="w-[30%]" />
          <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-3">
            <div className="text-2xl font-semibold mb-2">
              Sorry for the inconvenience
            </div>
            <div className="text-md">please contact developer</div>
          </div>
        </center>
      </div>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {videos.map((video) => (
        <Link to={`/watch?v=${video.id}`} key={video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
