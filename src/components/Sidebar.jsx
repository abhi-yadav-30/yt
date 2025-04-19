import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { card1, card2, card3 } from "../utils/constants/lists";
import SideBarCard from "./SideBarCard";
import { YOUTUBE_CHANNELS_API } from "../utils/constants/apis";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [channelsData, setChannelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channelIds = localStorage.getItem("subscriptions");

    if (!channelIds) {
      setLoading(false);
      return;
    }

    channelIds = JSON.parse(channelIds).slice(-6).reverse().join(",");
    const fetchChannelData = async () => {
      try {
        const response = await fetch(
          YOUTUBE_CHANNELS_API + `&id=${channelIds}`
        );
        let data = await response.json();
        data = data?.items;
        data.map((item) => {
          const obj = {
            label: item?.snippet?.title,
            icon:
              item?.snippet?.thumbnails?.high?.url ||
              item?.snippet?.thumbnails?.default?.url,
            path: "/results?search_query=" + item?.snippet?.title,
          };
          let temp = channelsData;
          temp.push(obj);
          setChannelsData(temp);
        });
        // setChannelsData(data?.items);
        console.log(data?.items);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div
      className={` ${
        isMenuOpen ? "md:w-60 w-full p-4" : "w-18 hidden md:block "
      }   z-[1000px] bg-white opacity-100 h-full`}
    >
      <div className="mb-2.5">
        <ul>
          {card1.map((card) => (
            <SideBarCard data={card} key={card.label} />
          ))}
        </ul>
      </div>

      <hr className="text-gray-300" />
      <div className="my-2.5">
        <ul>
          {isMenuOpen && (
            <li className=" px-5 py-2 rounded-lg  list-none  font-semibold text-lg">
              <span>{"You >"} </span>
            </li>
          )}

          {card2.map((card) => (
            <SideBarCard data={card} key={card.label} />
          ))}
        </ul>
      </div>
      {isMenuOpen && (
        <div className="my-2.5">
          <h1 className="font-semibold px-5">Subscriptions</h1>
          {channelsData.length > 0 && (
            <ul>
              {channelsData.map((card) => (
                <SideBarCard data={card} key={card.label} isIcon={false} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
