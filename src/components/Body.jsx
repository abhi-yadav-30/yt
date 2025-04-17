import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Head from "./Head";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  // const location = useLocation();
  // const path = location.path;
  // useEffect(()=>{
  //   console.log(location);
  // },[path])
  return (
    <div className=" h-screen ">
      <Head />
      <div className="pt-14 mb-200 flex h-screen ">
        {/* {isMenuOpen && (
          <> */}
            {/* <div className="col-span-2 h-screen"></div> */}
            <div className="col-span-2 h-screen fixed">
              <Sidebar />
            </div>
          {/* </> */}
        {/* )} */}
        <div
          className={` ${isMenuOpen ? "ml-[16%]" : "ml-[6%]"} fixed h-screen`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
