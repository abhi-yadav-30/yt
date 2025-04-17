import React, { useEffect, useState } from "react";
import noPlaylists from "../assets/noPlaylists.jpg";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
const fakeVideos = 3;
const PlayList = () => {
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("playlists");
    if (stored) {
      setPlaylists(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (e,name) => {
    e.preventDefault();
    e.stopPropagation();
    let updatedlist = {...playlists};
    delete updatedlist[name];

    setPlaylists(updatedlist);
    localStorage.setItem("playlists",JSON.stringify(updatedlist));
  };

  useEffect(()=>{},[playlists])


  return (
    <>
     {Object.keys(playlists).length > 0 ? <div className="flex flex-wrap  w-full  gap-y-10 py-10 pl-4 gap-3   overflow-y-auto h-full pb-[7%]">
        {Object.entries(playlists).map(([name, videoIds]) => {
          const lastVideoId = videoIds[videoIds.length - 1];
          const thumbUrl = `https://img.youtube.com/vi/${lastVideoId}/hqdefault.jpg`;

          return (
            <Link to={"/playlist?title=" + name} key={name} className="h-1">
              <Card
                sx={{
                  borderRadius: 2,
                  position: "relative",
                  transition: "all 0.3s ease",
                  // boxShadow: 3,
                  // backgroundColor: "red",
                  "&:hover": {
                    boxShadow: 7,
                    transform: "translateY(-7px)",
                  },
                }}
              >
                <CardActionArea>
                  <Box sx={{ position: "relative", height: 160, width: 300 }}>
                    {/* Bottom fake rectangles */}
                    {[...Array(fakeVideos)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: "absolute",
                          bottom: -i * 6,
                          right: -i * 6,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#f5f3f2",
                          borderRadius: 1,
                          // border: 0.5,
                          zIndex: i,
                          boxShadow: `-4px 4px 8px rgba(0,0,0,0.2), 4px -4px 8px rgba(0,0,0,0.2)`,
                          opacity: 0.9,
                        }}
                      />
                    ))}

                    {/* Actual main thumbnail */}
                    <Box
                      component="img"
                      src={thumbUrl}
                      alt="Last Video Thumbnail"
                      sx={{
                        position: "absolute",
                        bottom: -fakeVideos * 6,
                        right: -fakeVideos * 6,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 1,
                        boxShadow: `-4px 4px 8px rgba(0,0,0,0.2), 4px -4px 8px rgba(0,0,0,0.2)`,
                        zIndex: 4,
                      }}
                    />
                  </Box>

                  <CardContent>
                    <div className="flex justify-between ">
                      <div className="">
                        <Typography variant="subtitle1" fontWeight="bold">
                          {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {videoIds.length} Video
                          {videoIds.length == 1 ? "" : "s"}
                        </Typography>
                      </div>
                      <div
                        variant="subtitle1"
                        fontWeight="bold"
                        className="flex items-end"
                      >
                        <button
                          className="bg-red-500 text-white px-3 py-0.5 rounded-md cursor-pointer hover:bg-red-600"
                          onClick={(e) => handleDelete(e, name)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </div>:<div className="w-full mt-[2%]">
        <center>
          <img src={noPlaylists} alt="your Videos" className="w-[50%]" />
          <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-3">
            <div className="text-2xl font-semibold mb-2">
              You haven’t created any playlists yet.
            </div>
            <div className="text-md">Start building your collection now!</div>
          </div>
        </center>
      </div>}
    </>
  );
};

export default PlayList;
