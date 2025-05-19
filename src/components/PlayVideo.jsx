import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LiveChat from "./LiveChat";
import { BACKEND_URL } from "../utils/constants";

const PlayVideo = () => {
  const [queryParams] = useSearchParams();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const userData = useSelector((store) => store.user);
  const [historyTimeout, setHistoryTimeout] = useState(null);

  useEffect(() => {
    dispatch(closeMenu());
    checkFavoriteStatus();
    
    // Set a timeout to add to history after 30 seconds
    const timeoutId = setTimeout(() => {
      addToHistory();
    }, 30000); // 30 seconds

    setHistoryTimeout(timeoutId);

    // Cleanup function to cancel the timeout if component unmounts
    return () => {
      if (historyTimeout) {
        clearTimeout(historyTimeout);
      }
    };
  }, [queryParams.get("v")]); // Reset timer when video changes

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/favorites-videos/${queryParams.get("v")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.JWT}`,
        },
      });
      const data = await response.json();
      setIsFavorite(data.success);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const addToHistory = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      await fetch(`${BACKEND_URL}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.JWT}`,
        },
        body: JSON.stringify({ video_id: queryParams.get("v") }),
        signal,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('History addition cancelled');
      } else {
        console.error("Error adding to history:", error);
      }
    }
  };

  const handleFavoriteClick = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/favorites-videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.JWT}`,
        },
        body: JSON.stringify({ video_id: queryParams.get("v") }),
      });
      const data = await response.json();
      if (data.success) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className="h-screen ml-24 mt-16 ">
      <div className="flex">
        <div className="flex-1">
          <iframe
            width="1080"
            height="540"
            src={"https://www.youtube.com/embed/" + queryParams.get("v")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleFavoriteClick}
              className="flex items-center gap-2 px-4 py-2 rounded bg-secondary hover:bg-ternary"
            >
              <FontAwesomeIcon
                icon={isFavorite ? faHeartSolid : faHeartRegular}
                className={isFavorite ? "text-red-500" : "text-gray-500"}
              />
              {isFavorite ? "Liked" : "Like"}
            </button>
          </div>
        </div>
        <LiveChat />
      </div>
    </div>
  );
};

export default PlayVideo;
