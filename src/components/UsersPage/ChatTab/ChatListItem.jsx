import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../_utils/firebase";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({
  id,
  name,
  lastMessage,
  isSelected,
  setSelectedChat,
  setSelectedChatName,
}) => {
  const navigate = useNavigate();

  const [chat, setChat] = useState(null);
  const chatDocRef = doc(db, "chats", id);

  useEffect(() => {
    if (id) {
      const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setChat({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          console.log(`No chat document found for ID: ${id}`);
        }
      });
      return () => unsubscribe();
    }
  }, [id, chatDocRef]);

  return (
    <button
      onClick={() => {
        setSelectedChat(chat.id)
        setSelectedChatName(name);
        navigate(`/users/chat/${chat.id}`);
      }}
      className={`w-full p-4 flex items-center space-x-4 ${
        isSelected ? "bg-red-50" : "hover:bg-gray-50"
      }`}
    >
      <div className="relative">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-500" />
        </div>
      </div>
      <div className="flex-1 text-left">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <span className="text-xs text-gray-500">
            {chat?.time?.toDate().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
        </div>
        {lastMessage && (
          <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
        )}
      </div>
    </button>
  );
};

export default ChatListItem;
