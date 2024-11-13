import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Input from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useUserAuth } from "../_utils/auth-context";
import { useSocketContext } from "../providers/SocketProvider";

const Chat = () => {
  const { roomId } = useParams();
  const [queryParams, setQueryParams] = useSearchParams();

  const friendId = queryParams.get("friendId");

  const { user } = useUserAuth();
  const { socket } = useSocketContext();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSendMessage(e) {
    e.preventDefault();
    if (socket) {
      console.log("sending");
      socket.emit("message", { roomId, message: input });
    }
  }

  useEffect(() => {
    if (socket && user) {
      console.log("here");
      socket.emit("join-room", {
        roomId,
        username: user.dispalyName || user.email,
      });

      socket.emit("ping-user", {
        roomId,
        userId: friendId,
        pingedBy: user.dispalyName || user.email,
      });

      socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    }
  }, [socket, user]);

  return (
    <div className="py-10 container">
      <form onSubmit={handleSendMessage}>
        <label htmlFor="msg_input">Message</label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="msg_input"
        />
        <Button>Send</Button>
      </form>

      <div>
        {messages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
