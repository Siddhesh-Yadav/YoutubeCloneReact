// import React from 'react'

import { useEffect, useState } from "react"
import VideoCard from "./VideoCard"
// eslint-disable-next-line no-unused-vars
import { YOUTUBE_API,VIDEO_DATA } from "../utils/constants";
import ButtonLIst from "./ButtonList"
import { useSelector } from "react-redux";

const VideoContainer = () => {
    const [videos , setVideos] = useState([]);
    const isMenuOpen = useSelector(store => store.app.isMenuOpen); 
    useEffect(()=>{
        getVideos();
    },[])
    const getVideos = async()=>{
        const data = await fetch(YOUTUBE_API);
        const json = await data.json();
        // console.log(json); 
        setVideos(json.items)
        // setVideos(VIDEO_DATA.items);
    }
  return (
    <div className={isMenuOpen?"ml-60":"ml-10"}>
      <ButtonLIst />
      <div className="p-2 flex flex-wrap mt-10 ">
        {videos.map(e=><VideoCard key={e.id} data = {e}/>)}
      </div>
    </div>
  )
}

export default VideoContainer