import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Input from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useUserAuth } from "../_utils/auth-context";
import { useSocketContext } from "../providers/SocketProvider";
import { IoIosArrowForward } from "react-icons/io";

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
      socket.emit("message", {
        roomId,
        message: input,
        sender: user.dispalyName || user.email,
      });
    }
  }

  useEffect(() => {
    socket?.on("message", (msgObj) => {
      console.log(msgObj);
      setMessages((prev) => [...prev, msgObj]);
    });

    socket?.emit("join-room", {
      roomId,
      username: user.dispalyName || user.email,
    });

    socket?.emit("ping-user", {
      roomId,
      userId: friendId,
      pingedBy: user.dispalyName || user.email,
    });

    return () => {
      socket.off("join-room");
      socket.off("ping-user");
      socket?.off("message");
    };
  }, []);

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

      <div className="space-y-2 mt-5">
        {messages.map((msgObj) => (
          <div>
            {typeof msgObj === "object" ? (
              <div className="flex gap-2 items-center">
                <span>{msgObj.sender}</span>{" "}
                <IoIosArrowForward className="text-green-700" />
                <p>{msgObj.message}</p>
              </div>
            ) : (
              <p className="bg-secondary rounded-sm p-2">{msgObj}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
