import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  faHome,
  faBolt,
  faBell,
  faClock,
  faList,
  faVideo,
  faGraduationCap,
  faThumbsUp,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";


const iconMap = {
  faHome,
  faBolt,
  faBell,
  faClock,
  faList,
  faVideo,
  faGraduationCap,
  faThumbsUp,
  faRotateLeft,
};

const SideBarCard = ({ data, isIcon = true }) => {
  
const isMenuOpen = useSelector((store)=>store.app.isMenuOpen);
  return (
    <Link to={data.path}>
      <li className="hover:bg-gray-200 px-5 py-2 rounded-lg cursor-pointer list-none flex items-center">
        <span className="mr-6 w-7">
          {isIcon ? (
            <FontAwesomeIcon icon={iconMap[data.icon]} size="lg" />
          ) : (
            <img
              src={data.icon}
              alt={data.label}
              className="w-6 rounded-full"
            />
          )}
        </span>
        {isMenuOpen && (
          <span className=" overflow-hidden whitespace-nowrap">
            {data.label}
          </span>
        )}
      </li>
    </Link>
  );
};

export default SideBarCard;

// https://cdn-icons-png.flaticon.com/512/1946/1946488.png
