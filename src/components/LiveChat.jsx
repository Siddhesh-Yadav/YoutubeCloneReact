// import React from 'react'

import ChatMessage from "./ChatMessage"

const LiveChat = () => {
  return (
    <div className="border shadow rounded-md p-2 w-1/4 ml-2">
        <ChatMessage name={"Siddhesh Yadav"} msg={"This is the mesage!"} />
        <ChatMessage name={"Siddhesh Yadav"} msg={"This is the mesage!"} />
        <ChatMessage name={"Siddhesh Yadav"} msg={"This is the mesage!"} />
    </div>
  )
}

export default LiveChat