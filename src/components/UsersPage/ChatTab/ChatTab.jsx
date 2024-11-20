import React, { useEffect, useRef, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../_utils/firebase";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { updateChatMessage } from "../../../_utils/firestore_friends";
const ChatTab = ({ userData }) => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let unsubscribe;

    if (selectedChat) {
      const chatDocRef = doc(db, "chats", selectedChat);

      unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setMessages(docSnapshot.data().messages || []);
        } else {
          console.error(`Chat document with ID ${selectedChat} does not exist.`);
        }
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [selectedChat]);

  const sendMessage = () => {
    updateChatMessage(selectedChat, {
        content: message,
        sender: userData.id,
      });
    setMessage("");
  };

  return (
    <div className="h-screen bg-white flex">
      <div className="w-96 border-r border-gray-200 flex flex-col">
        <ChatList
          chats={userData.chats}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader selectedChatName={selectedChat.name} />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <Message key={msg.id} {...msg} userId={userData.id} />
              ))}
            <div ref={messagesEndRef}></div>
            </div>
            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTab;
