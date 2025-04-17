import React, { useState } from "react";
import { buttonList } from "../utils/constants/lists";
import { Link } from "react-router-dom";

const ButtonList = () => {
  const [selectedButton, setSelectButton] = useState(buttonList[0]);

  return (
    <div className="flex gap-4">
      {buttonList.map((btnName) => {
        return (
          <Link to={"/results?search_query=" + btnName} key={btnName}>
            <button
              className={`px-3 py-1  rounded-lg font-bold hover:bg-black cursor-pointer hover:text-white whitespace-nowrap ${
                selectedButton == btnName
                  ? "text-white  bg-black "
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectButton(btnName)}
            >
              {btnName}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default ButtonList;
