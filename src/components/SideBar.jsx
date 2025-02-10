// import React from 'react';

import { faHouse, faRotateLeft, faTv, faFire, faBarsStaggered, faScissors } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const menus = [
    {
      icon: faHouse,
      name: "Home",
    },
    {
      icon: faFire,
      name: "Shorts",
    },
    {
      icon:faTv,
      name: "Subscription"
    },
    {
      icon:faRotateLeft,
      name: "History"
    },
    {
      icon:faBarsStaggered,
      name: "Playlist"
    },
    {
      icon:faCirclePlay ,
      name: "Your videos"
    },
    {
      icon:faClock ,
      name: "Watch later"
    },
    {
      icon:faHeart ,
      name: "Liked videos"
    },
    {
      icon:faScissors ,
      name: "Your clips"
    },
  ];
  return (
    <aside
      className={`px-3 fixed font-semibold ${
        isMenuOpen && "w-56"
      }`}
    >
      <ul className="pb-3">
        {menus.map((item, index) => (
          <>
            <li
              key={index}
              className="p-4 flex rounded-lg bg-transparent items-center hover:bg-ternary cursor-pointer"
            >
              <FontAwesomeIcon icon={item.icon} className={`w-5 h-5 ${isMenuOpen && "mr-3"}`} />
              {isMenuOpen && item.name}
            </li>
            {index === 2 && <hr className="h-1 text-gray-600" />}
          </>
        ))}
        <hr className="h-1 text-gray-600" />
      </ul>
    </aside>
  );
};

export default SideBar;
