import React, { useState, useRef, useEffect } from "react";
import { getTimeAgo, handleShare } from "../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import {
  faBookmark,
  faClock,
  faEllipsisVertical,
  faShare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import HOCsideVideo from "./HOCsideVideo";

const SideVideo = ({ info }) => {
  if (!info) return <div className="w-40 bg-gray-100 h-25"></div>;

  const { snippet, statistics } = info;
  const { title, thumbnails, publishedAt, channelTitle } = snippet;

  const [show, setShow] = useState(false);
  const [showPlaylistInput, setShowPlaylistInput] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(""); // Added for select
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [listOfplaylist, setListOfplaylist] = useState({});

  const handleInfoClick = () => {
    setShow((prev) => !prev);
  };

  const handlePlayList = (id, title = "yeahh") => {
    let playlists = listOfplaylist;

    if (!playlists[title]) {
      playlists[title] = [];
    }

    playlists[title] = playlists[title].filter((item) => item !== id);
    playlists[title].push(id);

    localStorage.setItem("playlists", JSON.stringify(playlists));
  };

  const handleWatchLater = (id) => {
    let watchLater = localStorage.getItem("watchLater");
    watchLater = watchLater ? JSON.parse(watchLater) : [];
    if (!watchLater.includes(id)) {
      watchLater.push(id);
      localStorage.setItem("watchLater", JSON.stringify(watchLater));
    }
  };

  useEffect(() => {
    let playlists = localStorage.getItem("playlists");
    playlists = playlists ? JSON.parse(playlists) : {};
    setListOfplaylist(playlists);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
        setShowPlaylistInput(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  useEffect(() => {
    if (showPlaylistInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPlaylistInput]);

  const handleSavePlaylist = () => {
    if (playlistName.trim() !== "") {
      // console.log(playlistName.trim());
      handlePlayList(info?.id, playlistName.trim());
      setPlaylistName("");
      setShowPlaylistInput(false);
      setShow(false);
    }
  };

  return (
    <>
      {showPlaylistInput && (
        <div
          className="fixed inset-0 z-40 overflow-hidden"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Translucent black background
            backdropFilter: "blur(5px)", // Apply blur effect
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 3,
              width: "90%",
              maxWidth: 400,
              boxShadow: 6,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              transition: "all 0.3s ease",
              position: "absolute", // Center the form
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <IconButton
              onClick={() => setShowPlaylistInput(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "amber.300",
                color: "black",
                "&:hover": {
                  bgcolor: "amber.400",
                },
              }}
              aria-label="close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>

            {/* Playlist Selection Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Existing Playlist</InputLabel>
              <Select
                value={playlistName}
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                  setSelectedPlaylist(e.target.value);
                }}
                label="Existing Playlist"
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiSelect-icon": {
                    color: "black",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Limit height here (in pixels)
                    },
                  },
                }}
              >
                <MenuItem value="">Create new one</MenuItem>
                {Object.keys(listOfplaylist).map((playlistName) => (
                  <MenuItem key={playlistName} value={playlistName}>
                    {playlistName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Text Field for New Playlist Name */}
            {!selectedPlaylist && (
              <TextField
                placeholder="Enter playlist name"
                size="small"
                fullWidth
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                margin="normal"
                disabled={!!selectedPlaylist} // Disable input if a playlist is selected
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& .MuiInputBase-root": {
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                }}
              />
            )}

            {/* Save Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleSavePlaylist}
              sx={{
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 3,
                  bgcolor: "primary.dark",
                },
              }}
              disabled={!playlistName}
            >
              Save
            </Button>
          </Box>
        </div>
      )}
      <div className="flex my-2 cursor-pointer w-full relative">
        <div>
          <img
            src={thumbnails?.maxres?.url || thumbnails?.medium?.url}
            alt="side video"
            className="min-w-40 h-23 rounded-lg mr-3"
          />
        </div>
        <div className="">
          <div className="font-semibold text-sm h-11 overflow-hidden break-all line-clamp-2 w-full">
            {title}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {channelTitle}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {parseInt(statistics?.viewCount / 1000)}K views •{" "}
            {getTimeAgo(publishedAt)}
          </div>
        </div>

        <div
          className="z-50 cursor-pointer min-w-7 rounded-full hover:bg-gray-300 h-7 flex justify-center items-center ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleInfoClick();
          }}
          ref={dropdownRef}
        >
          {show && (
            <div className="absolute flex flex-col py-4 bg-gray-300 right-10 top-10 justify-center rounded-md w-60 z-50 shadow-lg">
              <div
                onClick={() => {
                  const updatedPlaylists = localStorage.getItem("playlists");
                  const parsed = updatedPlaylists
                    ? JSON.parse(updatedPlaylists)
                    : {};

                  // 💾 Update state so Select reflects new list next time
                  setListOfplaylist(parsed);
                  setShowPlaylistInput(true);
                }}
                className="cursor-pointer hover:bg-gray-200 py-2 px-3 flex items-center"
              >
                <div className="w-10 ml-2">
                  <FontAwesomeIcon icon={faBookmark} size="xl" />
                </div>
                <div className="font-medium ml-2">Save to playlist</div>
              </div>

              <div
                onClick={() => handleWatchLater(info?.id)}
                className="cursor-pointer hover:bg-gray-200 py-2 px-3 flex items-center"
              >
                <div className="w-10 ml-2">
                  <FontAwesomeIcon icon={faClock} size="xl" />
                </div>
                <div className="font-medium ml-2">Save to watch later</div>
              </div>

              <div
                onClick={() => handleShare(title, info?.id)}
                className="cursor-pointer hover:bg-gray-200 py-2 px-3 flex items-center"
              >
                <div className="w-10 ml-2">
                  <FontAwesomeIcon icon={faShare} size="xl" />
                </div>
                <div className="font-medium ml-2">Share</div>
              </div>
            </div>
          )}
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default HOCsideVideo(SideVideo);
