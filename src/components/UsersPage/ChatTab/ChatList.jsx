import React from "react";
import ChatListItem from "./ChatListItem";

const ChatList = ({ chats, selectedChat, setSelectedChat, setSelectedChatName }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats?.map((chat, index) => (
        <ChatListItem
          key={index}
          {...chat}
          isSelected={selectedChat === chat.id}
          setSelectedChat={setSelectedChat}
          setSelectedChatName={setSelectedChatName}
        />
      ))}
    </div>
  );
};

export default ChatList;
