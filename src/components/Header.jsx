// import React from 'react'
import YouTubeLogoIcon from "../assets/Icons/YouTubeLogoIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { BACKEND_URL, YOUTUBE_SUGGESTTION_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { faUser,faSun, faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars, faMagnifyingGlass, faMicrophone, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearUser } from "../utils/userSlice";
import useSWR from 'swr';
import NotificationPopup from './NotificationPopup';

const Header = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestion, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userData = useSelector((store) => store.user);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const fetcher = async (url) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userData.JWT}`,
      },
    });
    const data = await response.json();
    return data.data;
  };

  const { data: notifications, mutate } = useSWR(
    `${BACKEND_URL}/notification`,
    fetcher,
    {
      refreshInterval: 30000 // Refresh every 30 seconds
    }
  );

  useEffect(() => {
    let timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSearchSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const getSearchSuggestions = async () => {
    // const data = await fetch(YOUTUBE_SUGGESTTION_SEARCH_API + searchQuery);
    const data = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(YOUTUBE_SUGGESTTION_SEARCH_API + searchQuery)}`);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center py-[0.4rem] px-4 fixed w-full top-0 z-50 mb-2 bg-primary">
      <div className="flex items-center font-medium text-textPrimary text-xl">
        <FontAwesomeIcon onClick={toggleMenuHandler} icon={faBars} className="w-6 h-6 cursor-pointer text-textPrimary ml-1"/>
        <Link className="w-8 overflow-hidden ml-5 mr-1 border border-red-700" to="/">
          <img
            className="YouTubeLogo w-full object-cover"
            src={YouTubeLogoIcon}
            alt=""
            srcSet=""
          />
        </Link>
        ViewHub
      </div>
      <div className="z-50 flex items-center">
        <input
          onBlur={() => setShowSuggestions(false)}
          onFocus={() => setShowSuggestions(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          type="text"
          className="w-[37rem] pt-[0.4rem] pb-[0.70rem] pl-5 rounded-l-full border border-border bg-primary placeholder:text-gray-500"
        />
        <button className="py-[0.4rem] px-5  bg-ternary rounded-r-full border border-border border-l-transparent">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="w-[1.4rem] h-[1.4rem] my-[0.15rem] text-textPrimary"/>
        </button>
        {showSuggestions && searchSuggestion?.length > 0 && (
          <ul
            id="suggestions"
            className="absolute text-textPrimary bg-secondary w-[37rem] py-2 px-5 shadow rounded-lg top-14 z-50"
          >
            {searchSuggestion.map((e) => (
              <li className="mt-1" key={e}>{e}</li>
            ))}
          </ul>
        )}
        <div className="rounded-full bg-ternary hover:bg-secondary p-3 ml-2">
        <FontAwesomeIcon icon={faMicrophone} className="w-5 h-5"/>
        </div>
      </div>

      <div className="flex justify-between items-center">
          <div className="relative">
            <FontAwesomeIcon
              icon={faBell}
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-5 h-5 mr-5 cursor-pointer"
            />
            {notifications?.length > 0 && (
              <span className="absolute -top-2 right-2 bg-red-500 text-white rounded-full text-xs px-1.5">
                {notifications.length}
              </span>
            )}
            {showNotifications && notifications && (
              <NotificationPopup 
                notifications={notifications} 
                onClose={() => setShowNotifications(false)}
                mutate={mutate}
              />
            )}
          </div>
          <FontAwesomeIcon 
            icon={(theme === "light")?faSun:faMoon} 
            onClick={toggleTheme} 
            className="w-5 h-5 mt-[0.1rem] mr-5"
          />
          <div className="relative">
            <div 
              className="cursor-pointer" 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {userData.profile_picture && userData.profile_picture !== '' ? (
                <img 
                  src={userData.profile_picture} 
                  alt="profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className="w-5 h-5"/>
              )}
            </div>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-textPrimary">{userData.full_name}</p>
                  <p className="text-xs text-gray-500">@{userData.user_name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
                <Link
                  to="friends"
                  className="block w-full text-left px-4 py-2 text-sm text-textPrimary hover:bg-ternary"
                >
                  Friends
                </Link>
                <Link
                  to="history"
                  className="block w-full text-left px-4 py-2 text-sm text-textPrimary hover:bg-ternary"
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-ternary"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
