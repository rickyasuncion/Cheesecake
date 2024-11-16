import React, { useContext, useEffect } from "react";
import { UserData } from "../providers/UserDataProvider";

const Test = () => {
  const { userData } = useContext(UserData);

  console.log(userData);

  return (
    <div>
    </div>
  );
};

export default Test;
