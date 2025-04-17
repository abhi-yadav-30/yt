import React, { useEffect, useState } from "react";
import { isMock, YOUTUBE_VIDEOS_API } from "../utils/constants/apis";
import SideVideo from "./SideVideo";
import { Link } from "react-router-dom";
import { SIDE_VIDEOS_MOCK_DATA } from "../utils/constants/mockData";
import HOCsideVideo from "./HOCsideVideo";

const SideVideos = () => {
  const [sideVideos, setSideVideos] = useState([]);
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    let json = [];
    if (!isMock) {
      const data = await fetch(YOUTUBE_VIDEOS_API);

      json = await data.json();

    } else {
      json = SIDE_VIDEOS_MOCK_DATA;
    }

    setSideVideos(json?.items.sort(() => Math.random() - 0.5));
  };


  if (sideVideos.length == 0) return <div>Loading....</div>;

  return (
    <div className="my-5">
      {sideVideos.map((video) => (
        <Link to={"/watch?v=" + video.id} key={video.id}>
          <SideVideo info={video} />
        </Link>
      ))}
    </div>
  );
};

export default SideVideos;
