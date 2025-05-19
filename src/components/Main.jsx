// import React from 'react';

import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./SideBar"
const Main = () => {
  return (
    <div className=" bg-primary">
        <Header />
        <div className="flex h-screen  overflow-y-hidden">
          <SideBar />
          <Outlet />
        </div>
    </div>
  )
}

export default Main