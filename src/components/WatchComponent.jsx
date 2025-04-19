import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import watchHistory from "../assets/noData.svg";
import watchLater from "../assets/watchLater.svg";
import noLikedVideos from "../assets/noLikedVideos.svg";
import noPlaylistVIdeos from "../assets/noPlaylistVideos.svg";
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
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

const WatchComponent = ({ title, keyWord, msg1, msg2 }) => {
  const [videoIds, setVideoIds] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pauseHistory, setPauseHistory] = useState(false);
  const [isManageHistory, setIsManageHistory] = useState(false);

  let playlistTitle = "";
  const [searchParams] = useSearchParams();
  const location = useLocation();
  if (location.pathname.includes("/playlist")) {
    playlistTitle = searchParams.get("title");
  } else {
    playlistTitle = "";
  }

  useEffect(() => {
    if (keyWord === "watchHistory") {
      let isHistoryPause = JSON.parse(localStorage.getItem("isHistoryPause"));

      if (isHistoryPause) setPauseHistory(isHistoryPause);
    }

    const stored = localStorage.getItem(keyWord);
    setLoading(true);

    if (stored) {
      let parsed = JSON.parse(stored);
      if (keyWord === "playlists") {
        // console.og
        if (parsed[playlistTitle]) {
          parsed = parsed[playlistTitle];
        } else {
          setHistory([]);
          setLoading(false);
          return;
        }
      }
      if (parsed.length > 0) {
        setVideoIds(parsed);
        fetchVideos(parsed);
        return; // avoid unnecessary execution of the fallback
      }
    }

    setHistory([]);
    setLoading(false);
  }, [title]);

  const fetchVideos = async (vidIds) => {
    try {
      setLoading(true);
      let json = {};
      if (!isMock) {
        const videoIds = vidIds.join(",");
        const Data = await fetch(YOUTUBE_BASE_URL + `&id=${videoIds}`);

        json = await Data.json();
        if (json?.items) {
          setHistory(json?.items);
        }
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
  console.log(history);
  const handleDeleteVideo = (deleteId, idx) => {
    let updateList = videoIds.filter((id) => id !== deleteId);
    // const updated = removeAtIndex(videoIds, idx);
    // const updated = [...videoIds]; // clone first to keep it safe
    // updated.splice(idx, 1); // removes 1 item at index 2
    // // setVideoIds(arr);
    if (keyWord === "playlists") {
      let obj = localStorage.getItem("playlists");
      obj = obj ? JSON.parse(obj) : {};
      obj[playlistTitle] = updateList;
      localStorage.setItem(keyWord, JSON.stringify(obj));
    } else {
      localStorage.setItem(keyWord, JSON.stringify(updateList));
    }

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
    if (keyWord === "playlists") {
      let obj = localStorage.getItem("playlists");
      obj = obj ? JSON.parse(obj) : {};
      obj[playlistTitle] = [];
      localStorage.setItem(keyWord, JSON.stringify(obj));
    } else localStorage.setItem(keyWord, JSON.stringify([]));
  };

  const handlePauseHistory = () => {
    setPauseHistory(!pauseHistory);
    localStorage.setItem("isHistoryPause", !pauseHistory);
  };

  return (
    <div className=" grid h-full grid-rows-24 grid-cols-1 md:grid-cols-12 md:grid-rows-1 w-full">
      <div className="row-span-21 md:col-span-8 overflow-y-auto h-full pb-5">
        <div className="text-4xl font-bold m-5 mb-8">
          {title.replace(/\b\w/g, (char) => char.toUpperCase())}
          {keyWord === "playlists" && " : " + playlistTitle}
        </div>
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
          <div className="flex items-center justify-center flex-col h-[80%]">
            {keyWord === "watchHistory" && (
              <img
                src={watchHistory}
                alt="No Watch History"
                className="w-[55%]"
              />
            )}
            {keyWord === "watchLater" && (
              <img src={watchLater} alt="No Videos" className="w-[45%]" />
            )}
            {keyWord === "likedVideos" && (
              <img
                src={noLikedVideos}
                alt="No Liked Videos"
                className="w-[45%]"
              />
            )}
            {keyWord === "playlists" && (
              <>
                <img
                  src={noPlaylistVIdeos}
                  alt="No Liked Videos"
                  className="w-[45%]"
                />
              </>
            )}
            <div className="flex flex-col items-center justify-center text-center text-gray-600 py-12">
              <div className="text-2xl font-semibold mb-2">
                {/* No watch history yet. */}
                {msg1}
              </div>
              <div className="text-md">
                {msg2}
                {/* Start watching videos and they’ll appear here. */}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className=" row-span-3  md:col-span-4 px-7">
        <div className="flex flex-row md:flex-col   justify-center items-center   h-full text-xl">
          <hr className="text-gray-400 w-full hidden md:block" />
          <div className="flex flex-row md:flex-col">
            <div
              className="md:mt-5 cursor-pointer px-6 py-1 md:px-6 md:py-4  rounded-lg md:rounded-2xl watchComponentButton  hover:bg-gray-200 md:font-semibold text-sm md:text-xl"
              onClick={handleAllClear}
            >
              <FontAwesomeIcon icon={faTrashAlt} />{" "}
              <span className="watchComponentButtonText">
                Clear all {title}
              </span>
            </div>
            {keyWord === "watchHistory" && (
              <div
                className="md:my-2 cursor-pointer watchComponentButton px-6 py-1 md:py-4 rounded-lg md:rounded-2xl hover:bg-gray-200 md:font-semibold text-sm md:text-xl"
                onClick={handlePauseHistory}
              >
                {pauseHistory ? (
                  <>
                    <FontAwesomeIcon icon={faPlayCircle} />{" "}
                    <span className="watchComponentButtonText">
                      Turn on watch history
                    </span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPauseCircle} />{" "}
                    <span className="watchComponentButtonText">
                      Pause watch history
                    </span>
                  </>
                )}
              </div>
            )}
            <div
              className={`md:mb-5 cursor-pointer  px-6 py-1 md:py-4 rounded-lg md:rounded-2xl hover:bg-gray-200 md:font-semibold text-sm md:text-xl  ${
                isManageHistory ? "bg-gray-200" : ""
              } watchComponentButton`}
              onClick={() => setIsManageHistory(!isManageHistory)}
            >
              <FontAwesomeIcon icon={faCog} />
              <span className="watchComponentButtonText"> Manage {title}</span>
            </div>
          </div>
          <hr className="text-gray-400 w-full hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default WatchComponent;
