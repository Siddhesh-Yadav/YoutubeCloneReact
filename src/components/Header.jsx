// import React from 'react'
import YouTubeLogo from "../assets/Icons/YouTubeLogo.png";
import YouTubeLogoDark from "../assets/Icons/YouTubeLogoDark.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SUGGESTTION_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
const Header = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestion, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
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
    const data = await fetch(YOUTUBE_SUGGESTTION_SEARCH_API + searchQuery);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };
  return (
    <header className="flex justify-between items-center py-[0.4rem] px-4 sticky top-0 bg-primary text-textPrimary z-50 mb-2 ">
      <div className="flex items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onClick={toggleMenuHandler}
          className="w-6 h-6 cursor-pointer text-textPrimary ml-1"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>

        <Link to="/">
          <img
            className="YouTubeLogo w-[6.5rem] mx-5"
            src={theme === "light" ? YouTubeLogoDark : YouTubeLogo}
            alt=""
            srcSet=""
          />
        </Link>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[1.4rem] h-[1.rem] my-[0.15rem] text-textPrimary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
            <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
          </svg>
        </div>
      </div>

      <div className="flex justify-between">
        {theme === "light" ? (
          <svg
            onClick={toggleTheme}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6  mt-[0.1rem] mr-4"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        ) : (
          <svg
            onClick={toggleTheme}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mt-[0.1rem] mr-4"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            />
          </svg>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;
