// import React from 'react'

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
// eslint-disable-next-line no-unused-vars
import { BACKEND_URL, VIDEO_DATA } from "../utils/constants";
import ButtonLIst from "./ButtonList";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const userData = useSelector((store) => store.user);
  const [videos, setVideos] = useState([]);
  // const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  useEffect(() => {
    getVideos();
  }, []);
  const getVideos = async () => {
    // const data = await fetch(`${BACKEND_URL}/videos`,
    //     {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${userData.JWT}`,
    //         },
    //     }
    // );
    // const json = await data.json();
    const json = VIDEO_DATA;
    // console.log(json);
    setVideos(json.data.items);
  };
  return (
    <div className="mt-16" data-testid="video-container">
      <ButtonLIst />
      <div className="p-2 flex flex-wrap mt-10 h-screen overflow-y-scroll">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            data={video}
            data-testid={`video-item-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoContainer;
