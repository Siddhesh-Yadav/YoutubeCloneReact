import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BACKEND_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const NotificationPopup = ({ notifications, mutate }) => {
  const [userDetails, setUserDetails] = useState({});
  const [activeTab, setActiveTab] = useState('friend_request');
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userIds = notifications
        .filter(n => n.notification_type === 'friend_request')
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

  const friendRequests = notifications?.filter(n => n.notification_type === 'friend_request') || [];
  const videoInvites = notifications?.filter(n => n.notification_type === 'video_invite') || [];

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
          videoInvites.map((notification) => (
            <div key={notification.notification_id} className="p-4 border-b border-border">
              <div className="flex justify-between items-center">
                <p className="text-sm text-textPrimary">
                  Video invite for: {notification.associated_video_id}
                </p>
                <button
                  onClick={() => handleMarkAsRead(notification.notification_id)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </div>
          ))
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
