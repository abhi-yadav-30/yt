import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Cavatar from "../assets/Cavatar.png"
import { useSelector } from "react-redux";

const ChannelCard = ({ title, imageUrl, subscriberCount, videoCount }) => {
 useEffect(() => {}, [imageUrl]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

 if (!imageUrl) return;
   return (
     <div
       className={`overflow-hidden max-w-sm w-80 transition-all  shadow-xl border-t-4 border-t-red-600 group rounded-2xl  h-75 mb-12`}
     >
       <div className="p-0">
         <div className="bg-gradient-to-b  to-white from-gray-900 ">
           <div className="flex flex-col items-center p-6">
             <div className="relative w-24 h-24 mb-4 transform group-hover:scale-105 transition-transform duration-300">
               <div className="absolute inset-0 bg-gradient-to-br  rounded-full opacity-20 animate-pulse"></div>
               {imageUrl && (
                 <img
                   src={
                     imageUrl?.default?.url ||
                     imageUrl?.medium?.url ||
                     imageUrl?.high?.url || { Cavatar }
                   }
                   alt={title}
                   className="rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                 />
               )}
             </div>

             <div className="flex items-center gap-1 mb-2">
               <h3 className="font-bold text-lg text-center">{title}</h3>
             </div>

             <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
               <div className="flex items-center gap-1">
                 <FontAwesomeIcon icon={faUsers} className="text-blue-500" />
                 <span>{subscriberCount}</span>
               </div>
               <div className="flex items-center gap-1">
                 <FontAwesomeIcon icon={faVideo} className="text-red-500" />
                 <span>{videoCount}</span>
               </div>
             </div>

             <div className="flex items-center justify-center  dark:bg-gray-800 rounded-full px-7 py-3  font-medium  text-gray-300 text-md">
               <FontAwesomeIcon
                 icon={faCircleCheck}
                 className="text-red-500 mx-2"
                 size=""
               />
               Subscribed
             </div>
           </div>
         </div>
       </div>
     </div>
   );
};

export default ChannelCard;
