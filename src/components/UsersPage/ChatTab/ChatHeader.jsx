import React from "react";
import { User, Phone, Video, MoreVertical } from "lucide-react";

const ChatHeader = ({ selectedChatName }) => {
  return (
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </div>
        <h2 className="font-medium text-gray-900">{selectedChatName}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
