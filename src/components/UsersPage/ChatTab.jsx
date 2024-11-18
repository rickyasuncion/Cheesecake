import React, { useState } from 'react';
import { Send, Smile, Paperclip, Search, MoreVertical, Phone, Video, User, Message, Check } from 'lucide-react';

const ChatTab = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  // Sample chat data
  const chats = [
    {
      id: 1,
      name: "Support Team",
      lastMessage: "We'll help you with your streaming issues",
      time: "12:30 PM",
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Movie Club",
      lastMessage: "What did everyone think of the ending?",
      time: "10:45 AM",
      unread: 0,
      isOnline: false,
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Support Team",
      content: "Hello! How can we help you today?",
      time: "12:25 PM",
      isUser: false
    },
    {
      id: 2,
      sender: "You",
      content: "Hi, I'm having trouble with video playback on my device",
      time: "12:27 PM",
      isUser: true
    },
    {
      id: 3,
      sender: "Support Team",
      content: "I understand. Could you tell me what device you're using and what happens when you try to play a video?",
      time: "12:30 PM",
      isUser: false
    }
  ];

  const ChatListItem = ({ name, lastMessage, time, unread, isOnline, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-center space-x-4 ${
        isSelected ? 'bg-red-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-500" />
        </div>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>
      <div className="flex-1 text-left">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
      {unread > 0 && (
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">{unread}</span>
        </div>
      )}
    </button>
  );

  const Message = ({ content, time, isUser }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-3 rounded-lg ${
            isUser ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-900'
          }`}
        >
          {content}
        </div>
        <div className="flex items-center mt-1">
          <span className="text-xs text-gray-500">{time}</span>
          {isUser && (
            <Check className="w-4 h-4 text-gray-500 ml-1" />
          )}
        </div>
      </div>
    </div>
  );

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
          {chats.map(chat => (
            <ChatListItem
              key={chat.id}
              {...chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => setSelectedChat(chat)}
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
                  {selectedChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">{selectedChat.name}</h2>
                  <p className="text-sm text-green-500">{selectedChat.isOnline ? 'Online' : 'Offline'}</p>
                </div>
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
              {messages.map(msg => (
                <Message key={msg.id} {...msg} />
              ))}
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
                <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a chat to start messaging</h3>
              <p className="text-sm text-gray-500">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTab;
