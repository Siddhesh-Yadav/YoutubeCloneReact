import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BACKEND_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const NotificationPopup = ({ notifications, mutate }) => {
  const [userDetails, setUserDetails] = useState({});
  const [videoDetails, setVideoDetails] = useState({});
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userIds = notifications
        .map(n => n.associated_user_id);
      
      if (userIds.length === 0) return;

      try {
        const response = await fetch(
          `${BACKEND_URL}/user?user_ids=${JSON.stringify(userIds)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JWT")}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          const userMap = {};
          data.data.forEach(user => {
            userMap[user.user_id] = user;
          });
          setUserDetails(userMap);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [notifications]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const videoIds = notifications
        .filter(n => n.notification_type === 'video_invite')
        .map(n => n.associated_video_id);
      
      if (videoIds.length === 0) return;

      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(',')}&key=YOUR_API_KEY`
        );
        const data = await response.json();
        const videoMap = {};
        data.items.forEach(video => {
          videoMap[video.id] = video.snippet;
        });
        setVideoDetails(videoMap);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [notifications]);

  const handleMarkAsRead = async (notification_id) => {
    const response = await fetch(`${BACKEND_URL}/notification`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.JWT}`,
      },
      body: JSON.stringify({ notification_id }),
    });
    if (response.ok) {
      mutate();
    }
  };

  const handleFriendRequest = async (notification_id, approval, associated_user_id) => {
    const response = await fetch(`${BACKEND_URL}/friends`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.JWT}`,
      },
      body: JSON.stringify({ 
        notification_id,
        approval,
        associated_user_id
      }),
    });
    if (response.ok) {
      mutate();
    }
  };

  const handleVideoInvite = async (notification) => {
    try {
      const response = await fetch(`${BACKEND_URL}/notification`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.JWT}`,
        },
        body: JSON.stringify({ 
          notification_id: notification.notification_id,
          invite_status: 'accepted'
        }),
      });
      
      if (response.ok) {
        mutate();
        navigate(`/main/watch?v=${notification.associated_video_id}&room=${notification.room_id}`);
      }
    } catch (error) {
      console.error("Error accepting video invite:", error);
    }
  };

  const friendRequests = notifications?.filter(n => n.notification_type === 'friend_request') || [];
  const videoInvites = notifications?.filter(n => n.notification_type === 'video_invite') || [];
  console.log('videoInvites', videoInvites);
  console.log('friendRequests', friendRequests);
  
  const [activeTab, setActiveTab] = useState('friend_request');

  return (
    <div className="absolute right-0 mt-2 w-80 bg-secondary rounded-md shadow-lg py-1 z-50">
      <div className="flex border-b border-border">
        <button
          className={`flex-1 py-2 ${activeTab === 'friend_request' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('friend_request')}
        >
          Friend Requests ({friendRequests.length})
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === 'video_invite' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('video_invite')}
        >
          Video Invites ({videoInvites.length})
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'friend_request' ? (
          friendRequests.map((notification) => {
            const user = userDetails[notification.associated_user_id] || {};
            return (
              <div key={notification.notification_id} className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {user.profile_picture ? (
                      <img src={user.profile_picture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-textPrimary">{user.full_name}</p>
                    <p className="text-xs text-gray-500">@{user.user_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFriendRequest(
                        notification.notification_id,
                        true,
                        notification.associated_user_id
                      )}
                      className="text-green-500 hover:text-green-600"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      onClick={() => handleFriendRequest(
                        notification.notification_id,
                        false,
                        notification.associated_user_id
                      )}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          videoInvites.map((notification) => {
            if (!notification.associated_user_id || !notification.associated_video_id) {
              return null; // Skip notifications without necessary IDs
            }
            console.log('notification', notification);
            const user = userDetails[notification.associated_user_id] || {};
            const video = videoDetails[notification.associated_video_id] || {};
            console.log('video', video);
            console.log('user', user);
            return (
              <div key={notification.notification_id} className="p-4 border-b border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {user.profile_picture ? (
                      <img src={user.profile_picture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-textPrimary">{user.full_name}</p>
                    <p className="text-xs text-gray-500">invited you to watch a video</p>
                  </div>
                </div>
                
                {video.thumbnails && (
                  <div className="flex gap-2 mb-2">
                    <img
                      src={video.thumbnails.default.url}
                      alt={video.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-textPrimary line-clamp-2">
                        {video.title}
                      </p>
                      <p className="text-xs text-gray-500">{video.channelTitle}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleVideoInvite(notification)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Join
                  </button>
                  <button
                    onClick={() => handleMarkAsRead(notification.notification_id)}
                    className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  notifications: PropTypes.array.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default NotificationPopup;
