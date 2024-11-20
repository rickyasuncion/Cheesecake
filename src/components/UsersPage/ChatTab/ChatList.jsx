import React from "react";
import ChatListItem from "./ChatListItem";

const ChatList = ({ chats, selectedChat, setSelectedChat }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats?.map((chat) => (
        <ChatListItem
          key={chat.id}
          {...chat}
          isSelected={selectedChat === chat.id}
          setSelectedChat={setSelectedChat}
        />
      ))}
    </div>
  );
};

export default ChatList;
