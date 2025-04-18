import React, { useEffect, useState } from "react";
import { getComments, isMock } from "../utils/constants/apis";
import CommentCard from "./CommentCard";
import { saveJSONToFile } from "../utils/functions";
import { COMMENTS_MOCK_DATA } from "../utils/constants/mockData";

const Comments = ({ videoId, commentCount }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setData();
  }, []);
  const setData = async () => {
    let json = {};

    if (!isMock) {
      json = await getComments(videoId);
      console.log(json);
      // console.log(json?.items)
    } else {
      json = COMMENTS_MOCK_DATA;
    }

    setComments(json?.items);
  };

  const [show , setShow ]= useState(false);
  if (!commentCount || !comments) return;


  return (
    <div className="mt-6  overflow-hidden ">
      <div className="font-bold text-xl">
        {parseInt(commentCount).toLocaleString()} Comments
      </div>
      <div className={`${show?"h-full":"h-20"} mb-8 `}>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <CommentCard
              info={comment.snippet?.topLevelComment?.snippet}
              replies={comment.replies}
              key={comment.id}
            />
          ))}
      </div>
      <button className="  bg-white w-full text-blue-500 pb-4 cursor-pointer font-bold" onClick={()=>setShow(!show)}>
        {show ? "Show less" : "show all comments"}
      </button>
      {/* {show ? (
        <div className="ml-auto">Show less</div>
      ) : (
        <button className="  bg-white w-full text-blue-500 pb-4 cursor-pointer">
          show
        </button>
      )} */}
    </div>
  );
};

export default Comments;
