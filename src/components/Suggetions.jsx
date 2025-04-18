import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Suggetions = ({ suggestions, handleSelectedResult }) => {
  //   console.log("Suggetion : ", suggestions);
  if (suggestions.length == 0) return;
  return (
    <div className="py-4 sm:rounded-xl bg-white   shadow-[1px_0_7px_rgba(0,0,0,0.1),_-1px_0_7px_rgba(0,0,0,0.1),0_2px_7px_rgba(0,0,0,0.1)] z-100">
      {suggestions.map((item) => (
        <div key={item} onClick={() => handleSelectedResult(item)}>
          {/* <Link to={"/results?search_query=" + item}> */}
          <div className="font-medium px-5 py-1 flex items-center hover:bg-gray-200 h-10 cursor-pointer">
            <div className=" h-full flex items-center pr-4">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/>
            </div>
            <div className=" h-full flex items-center">{item}</div>
          </div>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};

export default Suggetions;
