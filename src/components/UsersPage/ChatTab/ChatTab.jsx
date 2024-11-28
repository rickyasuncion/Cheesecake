import React, { useEffect, useRef, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../_utils/firebase";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { updateChatMessage } from "../../../_utils/firestore_friends";
import { MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";
const ChatTab = ({ userData }) => {
  const {id} = useParams();
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(id);
  const [selectedChatName, setSelectedChatName] = useState(null);
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
          console.error(
            `Chat document with ID ${selectedChat} does not exist.`
          );
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
          chats={userData?.chats}
          selectedChat={selectedChat}
          setSelectedChatName={setSelectedChatName}
          setSelectedChat={setSelectedChat}
        />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader key={0} selectedChatName={selectedChatName} />
            <div key={1} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index}>
                    <Message {...msg} userId={userData.id} />
                    <div ref={messagesEndRef}></div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageSquare className="w-12 h-12 mb-4" />
                  <p className="text-lg font-medium">No messages yet</p>
                  <p className="text-sm">
                    Start a conversation to see messages appear here
                  </p>
                </div>
              )}
            </div>
            <ChatInput
              key={2}
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
