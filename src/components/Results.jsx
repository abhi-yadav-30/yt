import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { isMock, searchVideos } from "../utils/constants/apis";
import ResultCard from "./ResultCard";
import { SEARCH_MOCK_DATA } from "../utils/constants/mockData";
import notFound from "../assets/notFound.gif";
import icon from "../assets/react.svg";
import { saveJSONToFile } from "../utils/functions";

const Results = () => {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search_query");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getResults();
  }, [searchText]);

  const getResults = async () => {
    try {
      if (searchText !== "") {
        setIsLoading(true);
        let data = [];
        if (!isMock) {
          data = await searchVideos(searchText);
        } else {
          data = SEARCH_MOCK_DATA;
        }
        setSearchResults(data);
        // console.log()

        // saveJSONToFile("output.json", data);

        setTimeout(() => setIsLoading(false), 2000);
      }
    } catch (e) {
      console.log("error in search ", e);
      setSearchResults([]);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return !isLoading ? (
    searchResults.length !== 0 ? (
      <div className="pr-0 sm:pt-10  overflow-y-auto h-full">
        {searchResults.map((result) => (
          <Link to={"/watch?v=" + result.id} key={result.id}>
            <ResultCard result={result} />
          </Link>
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center w-screen">
        <div className="flex flex-col items-center justify-center mt-20 text-center w-full mr-[10%]">
          <img
            src="/notfound.svg"
            alt="No Data Found"
            className="w-[25%] mb-6 rounded-xl" // Adjusted width to 40
            // loading="lazy"
          />

          {/* <img src={icon} alt="icon" className="w-6 h-6" /> */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Oops! Nothing to see here.
          </h2>
          <p className="text-gray-500 text-lg">
            Try searching for something else... or just blame the internet 🫠
          </p>
        </div>
      </div>
    )
  ) : (
    <>
      <div className="pt-10 overflow-y-auto">
        {[...Array(3)].map((_, i) => (
          <div className="grid grid-cols-1 w-full sm:w-auto sm:grid-cols-16 mx-0 mb-4 animate-pulse">
            {/* Thumbnail Placeholder */}
            <div className="col-span-1 w-full sm:w-auto sm:col-span-8 2xl:col-span-6 lg:col-span-9 mr-4 aspect-video bg-gray-300 sm:rounded-xl" />

            {/* Content Placeholder */}
            <div className="col-span-1 w-full sm:w-auto sm:col-span-8 2xl:col-span-10 lg:col-span-7 flex flex-col justify-between">
              <div className="pt-1 px-2 sm:p-0 flex-1">
                {/* Title Placeholder */}
                <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
                {/* Views and Time Placeholder */}
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2" />
                {/* Description Placeholder */}
                <div className="h-4 bg-gray-300 rounded mb-2 w-full" />
                {/* Channel Info Placeholder */}
                <div className="flex items-center mt-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-4" />
                  <div className="h-4 bg-gray-300 rounded w-1/3" />
                </div>
              </div>

            
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
