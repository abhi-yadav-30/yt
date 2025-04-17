import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex p-2  ">
      <FontAwesomeIcon
        icon={faCircleUser}
        className="cursor-pointer text-gray-700"
        size="xl mr-3"
      />

      <div className="text-sm">
        <span className="font-medium mr-3 text-gray-400">{name}</span>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
