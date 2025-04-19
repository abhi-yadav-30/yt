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
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useIsMobile } from "../../hooks";

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
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isMobile = useIsMobile(768);
  const dispatch = useDispatch();

  return (
    <Link
      to={data.path}
      onClick={(e) => {
        e.stopPropagation();
        if (isMobile) {
          dispatch(closeMenu());
        }
      }}
    >
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
