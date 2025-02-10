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
import { faUser,faSun } from "@fortawesome/free-regular-svg-icons";
import { faBars, faMagnifyingGlass, faMicrophone, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    // const data = await fetch(YOUTUBE_SUGGESTTION_SEARCH_API + searchQuery);
    const data = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(YOUTUBE_SUGGESTTION_SEARCH_API + searchQuery)}`);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };
  return (
    <header className="flex justify-between items-center py-[0.4rem] px-4 sticky top-0 z-50 mb-2 bg-primary">
      <div className="flex items-center ">
        <FontAwesomeIcon onClick={toggleMenuHandler} icon={faBars} className="w-6 h-6 cursor-pointer text-textPrimary ml-1"/>
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

      <div className="flex justify-between">
          <FontAwesomeIcon icon={(theme === "light")?faSun:faMoon} onClick={toggleTheme} className="w-5 h-5  mt-[0.1rem] mr-4"/>
          <FontAwesomeIcon icon={faUser} className="w-5 h-5"/>
      </div>
    </header>
  );
};

export default Header;
