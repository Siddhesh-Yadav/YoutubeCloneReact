// import React from 'react';

import { useSelector } from "react-redux"

const SideBar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  return !isMenuOpen?null:(
    <aside className="px-5 fixed text-gray-600 font-semibold">
        <ul>
          <li className="my-3">Home</li>
          <li className="my-3">Shorts</li>
          <li className="my-3">Subscriptions</li>
        </ul>
        <hr />
        <ul>
          <li className="my-3">Library</li>
          <li className="my-3">History</li>
          <li className="my-3">Your Videos</li>
          <li className="my-3">Watch Later</li>
          <li className="my-3">Liked Videos</li>
          <li className="my-3">More</li>
        </ul>
        <hr />
    </aside>
  )
}

export default SideBar