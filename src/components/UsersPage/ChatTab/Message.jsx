import React from "react";
import { Check } from "lucide-react";

const Message = ({ content, time, sender, userId }) => {
  const isUser = sender === userId;

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
  );
};

export default Message;