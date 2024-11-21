import React from "react";
import { Paperclip, Smile, Send } from "lucide-react";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-4">
        {/* <button className="text-gray-400 hover:text-gray-600">
          <Paperclip className="w-5 h-5" />
        </button> */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 py-2 px-4 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
        />
        {/* <button className="text-gray-400 hover:text-gray-600">
          <Smile className="w-5 h-5" />
        </button> */}
        <button
          onClick={sendMessage}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
