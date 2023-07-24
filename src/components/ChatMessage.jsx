/* eslint-disable react/prop-types */
// import React from 'react'
import UserIcon from "../assets/Icons/UserIcon.png"
const ChatMessage = ({name,msg}) => {
  return (
    <div className="flex items-center mb-1 px-2 border border-b-gray-200">
        <img className="w-6 h-6 mr-3" src={UserIcon} alt="" />
        <div className="">
            <p className="font-bold text-gray-700">{name}</p>
            <p className="font-medium text-gray-600">{msg}</p>
        </div>
    </div>
  )
}

export default ChatMessage