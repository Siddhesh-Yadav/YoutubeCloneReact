// import React from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:8010");
// import ChatMessage from "./ChatMessage";
import { useEffect } from "react";

const LiveChat = () => {
  useEffect(() => {
    console.log("ye dono so gaye");
    
    // Join a chat room
    socket.emit("join-room", "roomId123");

    

    // Listen for incoming messages
    socket.on("receive-message", (message) => {
      console.log("New message:", message);
    });
  }, []);
  const sendMessage=()=>{
    // console.log("send");
    
    // Send a message
    socket.emit("send-message", {
      roomId: "roomId123",
      message: "Hello, World!",
    });
  }
  const disconnect = () =>{
    socket.emit("disconnect")
  }
  return (
    <div className="border shadow rounded-md p-2 w-1/4 ml-2">
      
      <button onClick={sendMessage}>send</button>
      <button onClick={disconnect}>disonnect</button>
    </div>
  );
};

export default LiveChat;
