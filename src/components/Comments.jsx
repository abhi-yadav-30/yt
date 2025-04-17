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

  if (!commentCount || !comments) return;


  return (
    <div className="mt-6">
      <div className="font-bold text-xl">
        {parseInt(commentCount).toLocaleString()} Comments
      </div>
      {comments && comments.length > 0 &&
        comments.map((comment) => (
          <CommentCard
            info={comment.snippet?.topLevelComment?.snippet}
            replies={comment.replies}
            key={comment.id}
          />
        ))}
    </div>
  );
};

export default Comments;
