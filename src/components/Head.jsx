import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { searchSuggetions, searchVideos } from "../utils/constants/apis";
import { Link, useNavigate } from "react-router-dom";
import Suggetions from "./Suggetions";
import { cacheResult } from "../utils/searchSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Head = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggetions] = useState([]);
  const [isInputFocusd, setIsInputFocusd] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const searchCache = useSelector((store) => store.search);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    let time = undefined;

    try {
      if (searchText !== "") {
        time = setTimeout(() => handleSuggetions(), 150); // this is called debouncing , it call suggetions fion only after 150ms if the page rerender befor that the this func is stopp by cler timeOut it called just before unmounting
      } else {
        setSuggetions([]);
      }
    } catch (e) {
      console.log("serach suggestions ", e);
    }

    return () => {
      if (time) {
        clearTimeout(time);
      }
    };
  }, [searchText]);

  const handleSuggetions = async () => {
    const serachCacheDate = searchCache[searchText];

    if (serachCacheDate) {
      setSuggetions(serachCacheDate);
    } else {
      const data = await searchSuggetions(searchText);
      if (data) {
        setSuggetions(data);
        dispatch(cacheResult({ [searchText]: data }));
      } else {
        setSuggetions([]);
      }
    }
  };

  const handleSearch = (textForSearch, e) => {
    if (e) e.preventDefault();
    console.log(textForSearch);
    setSearchText(textForSearch);
    if (inputRef.current) {
      inputRef.current.blur(); // This removes focus
    }
    navigate("/results?search_query=" + textForSearch);
  };

  return (
    <div className="shadow-lg pb-2  pt-2 grid grid-cols-12  z-50 mb-4 w-full bg-white fixed h-14 top-0 md:px-8 px-2">
      <div className="flex items-center col-span-2 lg:col-span-2 ">
        <div
          className="md:mr-5 mr-1  cursor-pointer hover:bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center"
          onClick={handleToggleMenu}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png"
            alt="logo"
            className="h-8 hidden md:block"
          />
        </Link>
        <Link to="/">
          <img
            src="/youtube.svg"
            alt="logo"
            className="h-8 block md:hidden"
          />
        </Link>
      </div>

      <div className=" col-span-10 sm:col-span-9 lg:col-span-9  ml-3">
        <form action="" role="search" aria-label="Site Search">
          <div className="flex items-center h-10  justify-center">
            <div className="border-gray-300 border-2 h-full rounded-l-4xl w-125  focus-within:border-blue-500  flex">
              {isInputFocusd && (
                <div className=" h-full flex items-center ml-4">
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                </div>
              )}
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="h-full w-full focus:outline-none placeholder:font-medium ml-4"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onFocus={() => setIsInputFocusd(true)}
                onBlur={() => setTimeout(() => setIsInputFocusd(false), 250)}
              />
              {isInputFocusd && (
                <div className="absolute z-50 mt-11 left-0 w-full sm:left-auto sm:w-125  bg-white shadow-lg  sm:rounded-lg">
                  <Suggetions
                    suggestions={suggestions}
                    handleSelectedResult={handleSearch}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-gray-100 h-full px-2 border-t-2 border-r-2 border-b-2 border-gray-300 cursor-pointer w-20 rounded-r-4xl flex items-center z-10"
              onClick={(e) => handleSearch(searchText, e)}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                className="ml-4"
              />
            </button>
          </div>
        </form>
      </div>
      <div className=" flex justify-end sm:col-span-1 hidden sm:block ml-auto">
        <FontAwesomeIcon
          icon={faCircleUser}
          className="cursor-pointer text-gray-700"
          size="2x"
        />
      </div>
    </div>
  );
};

export default Head;
