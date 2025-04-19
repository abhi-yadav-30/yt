import React from 'react'
import yourCourses from "../assets/yourCourses.svg";

const YourCourses = () => {
  return (
    <div className="w-full flex mt-5 h-full">
          <center className='w-full'>
            <img src={yourCourses} alt="your Videos" className="w-[35%]" />
            <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-3">
              <div className="text-2xl font-semibold mb-2">
                Get ready to showcase your creativity
              </div>
              <div className="text-md">your videos will appear here!</div>
            </div>
          </center>
        </div>
  )
}

export default YourCourses
