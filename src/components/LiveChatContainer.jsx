import {
  faEllipsisVertical,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { addMessage } from "../utils/chatSlice";
import {
  generateIndianYouTubeUsername,
  generateLiveChatMessage,
} from "../utils/functions";

const LiveChatContainer = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const [myMessage, setMyMsessage] = useState("");

  const messages = useSelector((store) => store.chat.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(
        addMessage({
          name: generateIndianYouTubeUsername(),
          message: generateLiveChatMessage(),
        })
      );
    }, 1000);
  }, []);

  const handleSendChat = (e) => {
    e.preventDefault();
    dispatch(
      addMessage({
        name: "my self",
        message: myMessage,
      })
    );
    setMyMsessage("");
  };

  const [showChat, setShowChat] = useState(true);

  return (
    <div>
      <div
        className={`overflow-hidden  hover:bg-gray-300 text-center rounded-4xl  border-gray-300 cursor-pointer transition-all duration-1000 ${
          showChat ? "h-0 " : "border py-2"
        }`}
        onClick={() => setShowChat(true)}
      >
        Show chat
      </div>
      <div
        className={`   border-gray-300 rounded-xl flex flex-col transition-all duration-1000 ${
          showChat
            ? isMenuOpen
              ? "h-[460px] border"
              : "h-[600px] border"
            : "h-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between py-3 px-5">
          <span className="text-lg">Live chat</span>
          <div>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size="lg"
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faXmark}
              size="xl"
              className="ml-5 cursor-pointer"
              onClick={() => setShowChat(false)}
            />
          </div>
        </div>
        <hr className="text-gray-300" />

        <div className="overflow-y-auto flex flex-col-reverse">
          {messages.map((c, i) => (
            <ChatMessage message={c.message} name={c.name} key={i} />
          ))}
        </div>
        <hr className="text-gray-300 mt-auto " />
        <div className="min-h-13 w-full flex justify-center items-center">
          <form
            className="bg-gray-200 w-[75%] rounded-4xl p-1 flex justify-between h-10"
            onSubmit={handleSendChat}
          >
            <input
              type="text"
              className=" w-[80%] ml-2 focus:outline-none"
              placeholder="Chat..."
              onChange={(e) => setMyMsessage(e.target.value)}
              value={myMessage}
            />
            <button className="  p-2 py-1 rounded-full hover:bg-gray-400 cursor-pointer">
              <FontAwesomeIcon icon={faPaperPlane} className="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveChatContainer;
