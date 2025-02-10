// import React from 'react'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";

import LiveChat from "./LiveChat";
const PlayVideo = () => {
    const [queryParams] = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  return (
    <div className="h-screen ml-24">
      <div className="flex">
        <iframe
          // className="w-full"
          width="1080"
          height="540"
          src={"https://www.youtube.com/embed/"+ queryParams.get("v")}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <LiveChat />
      </div>
    
      {/* <CommentsContainer /> */}
    </div>
  );
};

export default PlayVideo;
