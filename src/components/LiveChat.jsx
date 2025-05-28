import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const LiveChat = ({ sendMessage, messages, newMessage, setNewMessage }) => {
  const userData = useSelector((store) => store.user);

  // useEffect(() => {
  //   console.log("Connecting to chat room:", roomId);
  //   // Join a chat room
  //   socket.emit("join-room", roomId);

  //   // Listen for incoming messages
  //   socket.on("receive-message", (messageData) => {
  //     setMessages(prev => [...prev, messageData]);
  //   });

  //   socket.on("video-action", ({ action, timestamp }) => {
  //     // Handle video sync events
  //     const videoFrame = document.querySelector('iframe');
  //     if (videoFrame) {
  //       videoFrame.contentWindow.postMessage({
  //         event: 'command',
  //         func: action,
  //         args: [timestamp]
  //       }, '*');
  //     }
  //   });

  //   // Cleanup function - handles disconnection
  //   return () => {
  //     socket.emit("leave-room", roomId);
  //     socket.off("receive-message");
  //     socket.off("video-action");
  //   };
  // }, [roomId]);

  

  return (
    <div className="border shadow rounded-md p-2 w-1/4 ml-2 flex flex-col h-[540px]">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`mb-2 p-2 rounded flex items-start gap-2 ${
              msg.user?.username === userData.user_name ? 'bg-blue-500/10' : 'bg-ternary'
            }`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              {msg.user?.profilePicture ? (
                <img 
                  src={msg.user.profilePicture} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-textPrimary">
                  {msg.user?.name || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="text-sm text-textPrimary mt-1">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded bg-ternary"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

LiveChat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
};

export default LiveChat;
