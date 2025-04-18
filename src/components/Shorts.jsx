import React, { useEffect, useRef, useState } from "react";
import { fetchShorts, isMock } from "../utils/constants/apis";
import ShortsCard from "./ShortsCard";
import { SHORTS_MOCK_DATA } from "../utils/constants/mockData";
import { useSelector } from "react-redux";
import notfound from "../assets/notfound.svg";

const Shorts = () => {
  const [shorts, setShorts] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const refs = useRef([]);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const getShorts = async () => {
      try {
        setLoading(true);
        let data = isMock ? SHORTS_MOCK_DATA : await fetchShorts();
        //   console.log(data);
        setShorts(data.sort(() => Math.random() - 0.5));
        setLoading(false);
      } catch (e) {
        console.log("error:", e);
        setLoading(false);
      }
    };
    getShorts();
  }, []);

  useEffect(() => {
    if (refs.current.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleIndex(index);
          }
        });
      },
      { threshold: 0.9 }
    );

    refs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      refs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [shorts]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Wait for scroll to "stop" before snapping
      scrollTimeout.current = setTimeout(() => {
        const containerTop = container.getBoundingClientRect().top;

        let closestIndex = 0;
        let closestOffset = Infinity;

        refs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const offset = Math.abs(rect.top - containerTop);
            if (offset < closestOffset) {
              closestOffset = offset;
              closestIndex = index;
            }
          }
        });

        const target = refs.current[closestIndex];
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 800); // delay to detect scroll stop
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [shorts]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (loading) return;

  return shorts.length !== 0 ? (
    <div className="px-7 w-full h-full">
      <h2 className="text-4xl font-bold">Shorts</h2>
      <center>
        <div
          className={`overflow-y-scroll  no-scrollbar h-[84vh]   ${
            isMenuOpen ? "" : ""
          } `}
          ref={containerRef}
        >
          {shorts.map((short, index) => (
            <div
              key={short.id}
              data-index={index}
              ref={(el) => (refs.current[index] = el)}
              className="h-full "
            >
              <ShortsCard data={short} isVisible={index === visibleIndex} />
            </div>
          ))}
        </div>
      </center>
    </div>
  ) : (
    <div className="w-screen mt-[4%] pr-[15%]">
      <center>
        <img src={notfound} alt="your Videos" className="w-[30%] " />
        <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-3">
          <div className="text-2xl font-semibold mb-2">
            Sorry for the inconvenience
          </div>
          <div className="text-md">please contact developer</div>
        </div>
      </center>
    </div>
  );
};

export default Shorts;
