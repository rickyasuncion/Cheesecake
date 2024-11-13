import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useUserAuth } from "../_utils/auth-context";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";
import { useNavigate } from "react-router-dom";

const context = createContext();

// Custom hook to use the ThemeContext
export const useSocketContext = () => useContext(context);

// Provider component
export const SocketContextProvider = ({ children }) => {
  const { user } = useUserAuth();
  const [socket, setSocket] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const socketConnection = io("http://localhost:3002");
    socketConnection.emit("create-user-socket-pair", {
      userId: user.uid,
    });
    socketConnection.on("room-join-request", ({ pingedBy, roomId }) => {
      toast({
        description: `Your friend ${pingedBy} is asking you to join a chat.`,
        action: (
          <ToastAction
            altText="Join"
            onClick={() => {
              navigate(`/chat/${roomId}`);
            }}
          >
            Join
          </ToastAction>
        ),
      });
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.off("create-user-socket-pair");
      socketConnection.off("room-join-request");
      socketConnection.disconnect();
    };
  }, [user]);

  return (
    <context.Provider value={{ socket, hello: "name" }}>
      {children}
    </context.Provider>
  );
};
