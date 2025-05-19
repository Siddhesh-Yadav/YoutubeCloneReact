import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../utils/constants";
import {debounce} from "lodash";

const AddFriendModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const userData = useSelector((store) => store.user);

  const searchUsers = async (query) => {
    if (!query) return;
    const response = await fetch(`${BACKEND_URL}/user?search=${query}`, {
      headers: {
        Authorization: `Bearer ${userData.JWT}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      setSearchResults(data.data);
    }
  };

  const sendFriendRequest = async (username) => {
    const response = await fetch(`${BACKEND_URL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.JWT}`,
      },
      body: JSON.stringify({ user_name: username }),
    });
    const data = await response.json();
    if (data.success) {
      onClose();
    }
  };

  const debouncedSearch = debounce((value) => {
    searchUsers(value);
  }, 300);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-primary p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Friend</h2>
        <input
          type="text"
          placeholder="Search by name, email or username"
          onChange={(e) => {
            setSearchQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="w-full p-2 rounded bg-secondary mb-4"
        />
        <div className="max-h-60 overflow-y-auto">
          {searchResults.map((user) => (
            <div key={user.user_name} className="flex items-center justify-between p-2 hover:bg-secondary rounded">
              <div>
                <p className="font-medium">{user.full_name}</p>
                <p className="text-sm text-gray-500">@{user.user_name}</p>
              </div>
              <button
                onClick={() => sendFriendRequest(user.user_name)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-secondary text-textPrimary px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
AddFriendModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddFriendModal;
