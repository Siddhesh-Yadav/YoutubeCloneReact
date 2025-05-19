import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { BACKEND_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSearch, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import AddFriendModal from "./AddFriendModal";
import debounce from "lodash/debounce";

const Friends = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const userData = useSelector((store) => store.user);

  const fetcher = async (url) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userData.JWT}`,
      },
    });
    const data = await response.json();
    return data.data;
  };

  const { data: friendsData,error,isLoading, mutate } = useSWR(`${BACKEND_URL}/friends`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading friends data</div>;
  if (!friendsData) return <div>No friends data available</div>;
  const friends = friendsData?.filter(friend => friend.request_status === "accepted");
  const sentRequests = friendsData?.filter(friend => 
    friend.request_status === "pending" && friend.recipent_id === friend.user_id
  );
  const receivedRequests = friendsData?.filter(friend => 
    friend.request_status === "pending" && friend.sender_id === friend.user_id
  );

  const filteredList = friends?.filter(friend => 
    friend.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(receivedRequests, friendsData, userData);
  

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

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
  return (
    <div className="p-4 w-full mx-5 mt-14">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "friends" ? "bg-blue-500 text-white" : "bg-secondary"}`}
            onClick={() => setActiveTab("friends")}
          >
            Friends ({friends?.length || 0})
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "sent" ? "bg-blue-500 text-white" : "bg-secondary"}`}
            onClick={() => setActiveTab("sent")}
          >
            Sent Requests ({sentRequests?.length || 0})
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "received" ? "bg-blue-500 text-white" : "bg-secondary"}`}
            onClick={() => setActiveTab("received")}
          >
            Received Requests ({receivedRequests?.length || 0})
          </button>
        </div>
        <button
          onClick={() => setShowAddFriend(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          Add Friend
        </button>
      </div>

      {activeTab === "friends" && (
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search friends..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full p-2 pl-10 rounded bg-secondary"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {activeTab === "friends" &&
          filteredList?.map((friend) => (
            <div key={friend.user_name} className="bg-secondary p-4 rounded flex items-center gap-4">
              <img
                src={friend.profile_picture || "default-avatar.png"}
                alt={friend.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-textPrimary">{friend.full_name}</h3>
                <p className="text-sm text-gray-500">@{friend.user_name}</p>
              </div>
            </div>
          ))}
        
        {activeTab === "sent" &&
          sentRequests?.map((request) => (
            <div key={request.user_name} className="bg-secondary p-4 rounded flex items-center gap-4">
              <img
                src={request.profile_picture || "default-avatar.png"}
                alt={request.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-textPrimary">{request.full_name}</h3>
                <p className="text-sm text-gray-500">@{request.user_name}</p>
                <p className="text-sm text-yellow-500">Pending</p>
              </div>
            </div>
          ))}

        {activeTab === "received" &&
          receivedRequests?.map((request) => (
            <div key={request.user_name} className="bg-secondary p-4 rounded flex items-center gap-4">
              <img
                src={request.profile_picture || "default-avatar.png"}
                alt={request.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-textPrimary">{request.full_name}</h3>
                <p className="text-sm text-gray-500">@{request.user_name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleFriendRequest(request.notification_id, true, request.sender_id)}
                  className="text-green-500 hover:text-green-600"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  onClick={() => handleFriendRequest(request.notification_id, false, request.sender_id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {showAddFriend && <AddFriendModal onClose={() => setShowAddFriend(false)} />}
    </div>
  );
};

export default Friends;
