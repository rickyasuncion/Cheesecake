import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { userId } = useParams();

  return <div>{userId}</div>;
};

export default Chat;
