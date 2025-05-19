/* eslint-disable react/prop-types */
// import React from 'react'

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const VideoCard = ({data}) => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen); 
  const {snippet,id,statistics}=data;
  const {channelTitle, title,thumbnails}= snippet;
  const{viewCount} = statistics;
  return (
    <Link className="w-1/4"  to={"watch?v=" +id}>
      <div className={` h-80  m-2 rounded-lg`}>
        <img  className="w-full h-52 rounded-lg" src={thumbnails.medium.url} alt="ffg" />
        <p className="font-roboto text-base font-semibold pl-2">{title}</p>
        <p className="font-roboto text-base text-gray-500 pl-2">{channelTitle}</p>
        <div className="flex pl-2 text-gray-600">
          <p>{viewCount} views</p>
          
        </div>
      </div>
    </Link>
  )
}

export default VideoCard