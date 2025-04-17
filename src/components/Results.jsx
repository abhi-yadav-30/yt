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
      <div className="pt-10 overflow-y-auto h-full ">
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
      <div className="pt-10 overflow-y-auto h-full">
        {[...Array(3)].map((_, i) => (
          <div className="" key={i}>
            <div className="grid grid-cols-16 mb-4 animate-pulse mx-10">
              <div className="col-span-7 mr-10">
                <div className="w-125 h-70 bg-gray-300 rounded-xl" />
              </div>

              <div className="col-span-9">
                <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2" />
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-4" />
                  <div className="h-4 bg-gray-300 rounded w-1/4" />
                </div>
                <div className="h-4 bg-gray-300 rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
