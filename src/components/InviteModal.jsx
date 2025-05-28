import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { BACKEND_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";

const InviteModal = ({ onClose, onInvite }) => {
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

  const { data: friendsData } = useSWR(
    `${BACKEND_URL}/friends`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const friends = friendsData?.filter(
    (friend) => friend.request_status === "accepted"
  );

  const filteredFriends = friends?.filter(
    (friend) =>
      friend.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary p-6 rounded-lg w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Invite Friends</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search friends..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full p-2 pl-10 rounded bg-ternary"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-3 text-gray-400"
          />
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 gap-4">
            {filteredFriends?.map((friend) => (
              <div
                key={friend.user_name}
                className="bg-ternary p-4 rounded flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={friend.profile_picture || "default-avatar.png"}
                    alt={friend.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-textPrimary">
                      {friend.full_name}
                    </h3>
                    <p className="text-sm text-gray-500">@{friend.user_name}</p>
                  </div>
                </div>
                <button
                  onClick={() => onInvite(friend.user_name)}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  Invite
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

InviteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
};

export default InviteModal;
