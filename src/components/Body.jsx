import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Head from "./Head";
import { toggleMenu } from "../utils/appSlice";
// import AutoFirebaseLogin from "./Atlogin";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  // const location = useLocation();
  // const path = location.path;
  // useEffect(()=>{
  //   console.log(location);
  // },[path])
    const dispatch = useDispatch();
  const handleOverlayClick = () => {
    dispatch(toggleMenu()); // Or dispatch(setMenuOpen(false)); depending on your reducer
  };
  return (
    <div className="h-screen flex flex-col w-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-white shadow">
       {/* <AutoFirebaseLogin/> */}
        <Head />
      </div>

      {/* Below header layout */}
      <div className="flex flex-1 pt-14 overflow-hidden w-screen">
        {/* Sidebar (fixed, scrollable) */}
        <div
          onClick={handleOverlayClick}
          className={`
        fixed top-14 bottom-0  md:bg-white  shadow
         transition-all duration-800 z-1000 
        ${isMenuOpen ? "w-full md:w-auto bg-black/50  backdrop-blur-sm " : ""}
      `}
        >
          <div
            className={`transition-all duration-800 ${
              isMenuOpen ? "w-64" : "w-0  md:w-18"
            }  overflow-y-auto bg-white h-full`}
          >
            <Sidebar />
          </div>
        </div>

        {/* Main content (full height, scrollable) */}
        <div
          className={`
        flex-1  transition-all bottom-0 duration-300 z-10
        ${isMenuOpen ? "ml-0  md:ml-64" : "ml-0 md:ml-16"}
        h-[calc(100vh-3.5rem)] overflow-y-auto
        bg-white py-4 px-0 sm:p-4  pb-0
      `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
