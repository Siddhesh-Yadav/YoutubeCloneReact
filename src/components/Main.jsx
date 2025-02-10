// import React from 'react';

import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./SideBar"
const Main = () => {
  return (
    <div>
        <Header />
        <div className="grid">
          <SideBar />
          <Outlet />
        </div>
    </div>
  )
}

export default Main