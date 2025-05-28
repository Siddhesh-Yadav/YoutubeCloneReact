import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import LiveChat from "./LiveChat";
import InviteModal from "./InviteModal";
import { BACKEND_URL } from "../utils/constants";
import { io } from "socket.io-client";

const PlayVideo = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [queryParams] = useSearchParams();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const userData = useSelector((store) => store.user);
  const [historyTimeout, setHistoryTimeout] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [player, setPlayer] = useState(null);
  const [isYTScriptLoaded, setIsYTScriptLoaded] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const socketRef = useRef(null);
  const playerInstanceRef = useRef(null); // Add this ref to track player instance

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

  // Replace the YouTube script loading useEffect
  useEffect(() => {
    if (window.YT) {
      setIsYTScriptLoaded(true);
      return;
    }

    const loadYouTubeScript = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = 'yt-iframe-api';
      
      // Create a promise to handle script load
      return new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = () => {
          setIsYTScriptLoaded(true);
          resolve();
        };
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      });
    };

    loadYouTubeScript();

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  // Update the initialization effect
  useEffect(() => {
    let cleanup = false;
    const videoId = queryParams.get("v");

    if (!isYTScriptLoaded || !window.YT || !window.YT.Player || !videoId) return;

    const initializePlayer = () => {
      try {
        console.log("Creating new YouTube player instance");
        playerInstanceRef.current = new window.YT.Player("youtube-player", {
          height: "540",
          width: "1080",
          videoId: videoId,
          playerVars: {
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (event) => {
              if (cleanup) return;
              console.log("Player ready event fired");
              setPlayer(event.target);
              setIsPlayerReady(true);
            },
            onStateChange: (event) => {
              if (cleanup) return;
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            },
          },
        });
      } catch (error) {
        console.error("Error creating YouTube player:", error);
      }
    };

    initializePlayer();

    return () => {
      cleanup = true;
      if (playerInstanceRef.current?.destroy) {
        console.log("Destroying YouTube player instance");
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
      setIsPlayerReady(false);
      setPlayer(null);
    };
  }, [isYTScriptLoaded, queryParams.get("v")]);

  // Remove socket initialization from useEffect and make it dependent on player ready state
  useEffect(() => {
    if (!isPlayerReady || !player) return;

    console.log("Initializing socket connection with ready player");
    socketRef.current = io(BACKEND_URL);
    
    // Check for room after socket and player are ready
    const room = queryParams.get("room");
    if (room) {
      console.log("Found room, initializing:", room);
      initializeRoom(room);
    }

    return () => {
      if (socketRef.current) {
        console.log("Cleaning up socket connection");
        if (roomId) {
          socketRef.current.emit("leave-room", roomId);
        }
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isPlayerReady, player]); // Only initialize socket when player is ready

  // Update room initialization to handle player not ready case
  const initializeRoom = (roomId) => {
    const socket = socketRef.current;
    if (!socket || !player || !isPlayerReady) {
      console.log("Cannot initialize room - dependencies not ready:", {
        hasSocket: !!socket,
        hasPlayer: !!player,
        isPlayerReady
      });
      return;
    }

    console.log("Initializing room:", roomId);
    socket.emit("join-room", roomId);
    setRoomId(roomId);

    // Set up message listener
    socket.on("receive-message", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    socket.on("video-action", (data) => {
      console.log("Received video action:", data);
      try {
        if (data.action === "play") {
          player.seekTo(data.timestamp);
          player.playVideo();
          setIsPlaying(true);
        } else if (data.action === "pause") {
          player.pauseVideo();
          setIsPlaying(false);
        }
      } catch (error) {
        console.error("Error handling video action:", error);
      }
    });
  };

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/favorites-videos/${queryParams.get("v")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.JWT}`,
          },
        }
      );
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
      if (error.name === "AbortError") {
        console.log("History addition cancelled");
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

  const handleVideoControl = () => {
    if (!isPlayerReady || !player || !socketRef.current) return;

    try {
      const currentTime = player.getCurrentTime();
      const action = isPlaying ? "pause" : "play";

      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }

      if (roomId) {
        socketRef.current.emit("video-action", {
          roomId,
          action,
          timestamp: currentTime,
        });
      }
    } catch (error) {
      console.error("Error handling video control:", error);
    }
  };

  const handleVideoInvite = async (username) => {
    try {
      const response = await fetch(`${BACKEND_URL}/video-invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.JWT}`,
        },
        body: JSON.stringify({
          user_name: username,
          video_id: queryParams.get("v"),
        }),
      });
      const data = await response.json();
      if (data.success) {
        setShowInviteModal(false);
        setInviteSent(true);
        // Initialize room after successful invite
        initializeRoom(data.room_id);
        //set the query parameter to the room ID
        setRoomId(data.room_id);
        //keep the "V" query parameter in the URL
        window.history.replaceState({}, "", `?v=${queryParams.get("v")}&room=${data.room_id}`);
      }
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current || !roomId) return;

    socketRef.current.emit("send-message", {
      roomId,
      message: {
        text: newMessage,
        user: {
          name: userData.full_name,
          username: userData.user_name,
          profilePicture: userData.profile_picture,
        },
        timestamp: new Date().toISOString(),
      },
    });
    setNewMessage("");
  };

  return (
    <div className="h-screen ml-24 mt-16">
      <div className="flex">
        <div className="flex-1">
          <div className="relative">
            <div id="youtube-player"></div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleVideoControl}
              className="flex items-center gap-2 px-4 py-2 rounded bg-secondary hover:bg-ternary"
            >
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                className={isPlaying ? "text-red-500" : "text-green-500"}
              />
              {isPlaying ? "Pause" : "Play"}
            </button>
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
            <button
              onClick={() => setShowInviteModal(true)}
              disabled={roomId || inviteSent}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                roomId || inviteSent
                  ? "bg-gray-500 cursor-not-allowed opacity-50"
                  : "bg-secondary hover:bg-ternary"
              }`}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              {roomId ? "Room Active" : inviteSent ? "Invite Sent" : "Invite Friend"}
            </button>
          </div>
        </div>
        {roomId && (
          <LiveChat
            roomId={roomId}
            sendMessage={sendMessage}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        )}
      </div>

      {showInviteModal && (
        <InviteModal
          onClose={() => setShowInviteModal(false)}
          onInvite={handleVideoInvite}
        />
      )}
    </div>
  );
};

export default PlayVideo;
