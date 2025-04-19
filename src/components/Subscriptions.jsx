import React, { useEffect, useState } from "react";
import ChannelCard from "./ChannelCard";
import { YOUTUBE_CHANNELS_API } from "../utils/constants/apis";
import noSub from "../assets/noSubscriptions.svg";
import { useSelector } from "react-redux";

const Subscriptions = () => {
  const [channelsData, setChannelsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channelIds = localStorage.getItem("subscriptions");

    if (!channelIds) {
      setLoading(false);
      return;
    }

    channelIds = JSON.parse(channelIds).join(",");

    const fetchChannelData = async () => {
      try {
        const response = await fetch(
          YOUTUBE_CHANNELS_API + `&id=${channelIds}`
        );
        const data = await response.json();
        setChannelsData(data?.items);
        console.log(data?.items);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, []);

  //   const formatNumber = (num) => {
  //     if (!num) return "0";
  //     return Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
  //   };

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!channelsData)
    return (
      <div className="h-full">
        <center className="h-full">
          <img src={noSub} alt="no Subscription" className="h-[70%]" />
          <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-3">
            <div className="text-2xl font-semibold mb-2">
              You're not subscribed to any channels yet.
            </div>
            <div className="text-md">
              Subscribe to channels to see their latest videos here!
            </div>
          </div>
        </center>
      </div>
    );

  return (
    <div
      className={`overflow-y-auto h-full pt-6  flex flex-wrap px-6  pb-8 justify-around`}
    >
      {channelsData.map((channel) => (
        <ChannelCard
          key={channel.id}
          title={channel?.snippet?.title}
          imageUrl={channel?.snippet?.thumbnails}
          subscriberCount={channel?.statistics?.subscriberCount}
          videoCount={channel?.statistics?.videoCount}
        />
      ))}
    </div>
  );
};

export default Subscriptions;
