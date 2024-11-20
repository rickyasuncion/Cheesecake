import React, { useEffect, useState } from "react";
import {
  Send,
  Smile,
  Paperclip,
  Search,
  MoreVertical,
  Phone,
  Video,
  User,
  Check,
  MessageSquare,
} from "lucide-react";
import {
  getChatsByIds,
  updateChatMessage,
} from "../../_utils/firestore_friends";
import { db } from "../../_utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ChatTab = ({ userData }) => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (selectedChat) {
      const chatDocRef = doc(db, "chats", selectedChat);

      unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();
          setMessages(chatData.messages || []); 
        } else {
          console.error(`Chat document with ID ${selectedChat} does not exist.`);
        }
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedChat]);

  // useEffect(() => {
  //   const getData = async () => {
  //     if (userData) {
  //       const chatIds = userData.chats.map((chat) => chat.id);
  //       try {
  //         const data = await getChatsByIds(chatIds);
  //         setChats(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.error("Error fetching chat data:", error);
  //       }
  //     }
  //   };
  //   getData();
  // }, [userData]);

  // Sample chat data
  // const chats = [
  //   {
  //     id: 1,
  //     name: "Support Team",
  //     lastMessage: "We'll help you with your streaming issues",
  //     time: "12:30 PM",
  //     unread: 2,
  //     isOnline: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Movie Club",
  //     lastMessage: "What did everyone think of the ending?",
  //     time: "10:45 AM",
  //     unread: 0,
  //     isOnline: false,
  //   }
  // ];

  // const messages = [
  //   {
  //     id: 1,
  //     sender: "Support Team",
  //     content: "Hello! How can we help you today?",
  //     time: "12:25 PM",
  //     isUser: false,
  //   },
  //   {
  //     id: 2,
  //     sender: "You",
  //     content: "Hi, I'm having trouble with video playback on my device",
  //     time: "12:27 PM",
  //     isUser: true,
  //   },
  //   {
  //     id: 3,
  //     sender: "Support Team",
  //     content:
  //       "I understand. Could you tell me what device you're using and what happens when you try to play a video?",
  //     time: "12:30 PM",
  //     isUser: false,
  //   },
  // ];

  const ChatListItem = ({
    name,
    id,
    lastMessage,
    unread,
    isSelected,
    setSelectedChat,
    onClick,
  }) => {
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
    }, []);

    return (
      <button
      onClick={() => {
        setSelectedChat(chat.id);
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
              {chat &&
                chat.time?.toDate().toLocaleTimeString("en-US", {
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
        {/* {unread > 0 && (
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">{unread}</span>
        </div>
      )} */}
      </button>
    );
  };

  const Message = ({ content, time, isUser }) => {
    return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[70%] ${isUser ? "order-2" : "order-1"}`}>
        <div
          className={`p-3 rounded-lg ${
            isUser ? "bg-red-500 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          {content}
        </div>
        <div className="flex items-center mt-1">
          <span className="text-xs text-gray-500">
            {time?.toDate().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
          {isUser && <Check className="w-4 h-4 text-gray-500 ml-1" />}
        </div>
      </div>
    </div>
  )};

  return (
    <div className="h-screen bg-white flex">
      {/* Chat List Sidebar */}
      <div className="w-96 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {userData.chats?.map((chat) => (
            <ChatListItem
              {...chat}
              isSelected={selectedChat === chat.id}
              setMessages={setMessages}
              setSelectedChat={setSelectedChat}
            />
          ))}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                <h2 className="font-medium text-gray-900">
                  {selectedChat.name}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages ? (
                messages.map((msg) => <Message key={msg.id} {...msg} />)
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

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 py-2 px-4 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
                />
                <button className="text-gray-400 hover:text-gray-600">
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    updateChatMessage(selectedChat, {
                      content: "Hello, World!",
                      sender: userData.id,
                    })
                  }
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Message className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a chat to start messaging
              </h3>
              <p className="text-sm text-gray-500">
                Choose from your existing conversations or start a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTab;
