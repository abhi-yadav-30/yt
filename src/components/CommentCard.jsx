import React, { useState } from "react";
import { formatNumber, getTimeAgo } from "../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as faThumbsDownRegular } from "@fortawesome/free-regular-svg-icons";

const CommentCard = ({ info, replies, isReply = false }) => {
  if (!info) return <>Loading...</>;

  const [showReplies, setShowReplies] = useState(false);

  const [reaction, setReaction] = useState({ like: false, dislike: false });

  // if (i == 2) {
  //   console.log("info : ", info);
  // }

  const {
    authorDisplayName,
    authorProfileImageUrl,
    likeCount,
    updatedAt,
    textDisplay,
    authorChannelId,
  } = info;

  if (!authorProfileImageUrl) return <>no img...</>;

  return (
    <div
      className={`grid  ${!isReply ? "grid-cols-16" : "grid-cols-25"}   my-4 `}
    >
      <div className="mt-1.5 col-span-2 md:col-span-1">
        {authorProfileImageUrl ? (
          <img
            src={
              authorProfileImageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt="profile"
            className={`${!isReply ? "w-11 h-11" : "w-7 h-7"} rounded-full`}
          />
        ) : (
          <></>
        )}
      </div>
      <div className={`${!isReply ? "col-span-14 md:col-span-15 " : "col-span-23 md:col-span-24"}`}>
        <div>
          <span
            className={`font-semibold  mr-2 ${
              !isReply ? "text-sm" : "text-xs"
            }`}
          >
            {authorDisplayName}
          </span>
          <span className="text-gray-700 text-xs">{getTimeAgo(updatedAt)}</span>
        </div>

        <div
          className={`text-md mb-1 ${!isReply ? "text-md" : "text-sm"}`}
          dangerouslySetInnerHTML={{ __html: textDisplay }}
        >
          {/* {} */}
        </div>
        <div className="flex items-center">
          <span
            onClick={() => {
              setReaction({ like: !reaction.like, dislike: false });
            }}
            className="cursor-pointer"
          >
            {reaction.like ? (
              <FontAwesomeIcon icon={faThumbsUpSolid} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faThumbsUpRegular} size="lg" />
            )}
          </span>

          <span className="text-sm ml-2 mr-4">
            {" "}
            {formatNumber(Number(likeCount) + (reaction.like ? 1 : 0))}
          </span>
          <span
            onClick={() => {
              setReaction({ dislike: !reaction.dislike, like: false });
            }}
            className="cursor-pointer"
          >
            {reaction.dislike ? (
              <FontAwesomeIcon icon={faThumbsDownSolid} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faThumbsDownRegular} size="lg" />
            )}
          </span>
        </div>

        {!isReply && (
          <div className="mt-2">
            <button
              className="text-blue-800 font-semibold hover:bg-blue-100 py-2 px-3 rounded-4xl cursor-pointer"
              onClick={() => setShowReplies(!showReplies)}
            >
              {!showReplies ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
              <span className="ml-2">
                {replies?.comments?.length || 0} replies
              </span>
            </button>
            {showReplies &&
              replies &&
              replies.comments !== 0 &&
              replies.comments.map((comment) => (
                <CommentCard
                  info={comment.snippet}
                  key={comment.id}
                  isReply={true}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
