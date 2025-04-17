import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noData from "../assets/noData.jpg";
import {
  faCog,
  faPauseCircle,
  faPlayCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  SEARCH_MOCK_DATA,
  SIDE_VIDEOS_MOCK_DATA,
} from "../utils/constants/mockData";
import ResultCard from "./ResultCard";
import SideVideo from "./SideVideo";
import {
  isMock,
  YOUTUBE_BASE_URL,
  YOUTUBE_VIDEOS_API,
} from "../utils/constants/apis";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HistoryPage = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pauseHistory, setPauseHistory] = useState(false);
  const [isManageHistory, setIsManageHistory] = useState(false);

  useEffect(() => {
    let isHistoryPause = JSON.parse(localStorage.getItem("isHistoryPause"));

    if (isHistoryPause) setPauseHistory(isHistoryPause);

    const stored = localStorage.getItem("historyData");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length !== 0) {
        console.log("1st");
        setVideoIds(parsed);
        fetchVideos(parsed);
      } else {
        console.log("2");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchVideos = async (vidIds) => {
    try {
      setLoading(true);
      let json = {};
      if (!isMock) {
        const videoIds = vidIds.join(",");
        const Data = await fetch(YOUTUBE_BASE_URL + `&id=${videoIds}`);

        json = await Data.json();
        setHistory(json?.items);
      } else {
        json = SIDE_VIDEOS_MOCK_DATA;
        setHistory(json?.items);
      }

      setLoading(false);
    } catch (e) {
      console.log("error: ", e);
      setLoading(false);
    }
  };

  const handleDeleteVideo = (deleteId, idx) => {
    console.log(deleteId);
    let updateList = videoIds.filter((id) => id !== deleteId);
    // const updated = removeAtIndex(videoIds, idx);
    // const updated = [...videoIds]; // clone first to keep it safe
    // updated.splice(idx, 1); // removes 1 item at index 2
    // // setVideoIds(arr);
    localStorage.setItem("historyData", JSON.stringify(updateList));
    setVideoIds(updateList);
    setHistory((prev) => prev.filter((h) => h.id !== deleteId));
    // // const updatedHistory = removeAtIndex(history,idx);
    // const updatedHistory = [...history]; // clone first to keep it safe
    // updatedHistory.splice(idx, 1);
    // setHistory(updatedHistory);
  };

  const handleAllClear = () => {
    setVideoIds([]);
    setHistory([]);
    localStorage.setItem("historyData", JSON.stringify([]));
  };

  const handlePauseHistory = () => {
    setPauseHistory(!pauseHistory);
    localStorage.setItem("isHistoryPause", !pauseHistory);
  };

  return (
    <div className=" grid grid-cols-12 w-full h-screen pb-[5%]">
      <div className="col-span-8 overflow-y-auto h-full">
        <div className="text-4xl font-bold m-5 mb-8"> Watch history</div>
        {history.length > 0 ? (
          <div className="flex flex-col-reverse">
            {history.map((h) => (
              <Link to={"/watch?v=" + h?.id} key={h?.id}>
                <SideVideo
                  info={h}
                  isHistory={true}
                  isManageHistory={isManageHistory}
                  handleDeleteVideo={handleDeleteVideo}
                />
              </Link>
            ))}
          </div>
        ) : !loading ? (
          <div className="flex items-center justify-center   flex-col">
            <img src={noData} alt="No Data Found" className="w-[55%]" />
            <div className="flex flex-col items-center justify-center text-center text-gray-600 py-12">
              <div className="text-2xl font-semibold mb-2">
                No watch history yet.
              </div>
              <div className="text-md">
                Start watching videos and they’ll appear here.
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="text-xl col-span-4 flex flex-col justify-center  items-center">
        <div>
          <hr className="text-gray-400" />
          <div
            className="mt-5 cursor-pointer  px-6 py-4 rounded-2xl hover:bg-gray-200 font-semibold"
            onClick={handleAllClear}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Clear all watch history
          </div>
          <div
            className="my-2 cursor-pointer  px-6 py-4 rounded-2xl hover:bg-gray-200 font-semibold"
            onClick={handlePauseHistory}
          >
            {pauseHistory ? (
              <>
                <FontAwesomeIcon icon={faPlayCircle} /> Turn on watch history
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPauseCircle} /> Pause watch history
              </>
            )}
          </div>
          <div
            className={`mb-5 cursor-pointer  px-6 py-4 rounded-2xl hover:bg-gray-200 font-semibold ${
              isManageHistory ? "bg-gray-200" : ""
            }`}
            onClick={() => setIsManageHistory(!isManageHistory)}
          >
            <FontAwesomeIcon icon={faCog} /> Manage all history
          </div>
          <hr className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
