import React, { useContext } from "react";
import { UserData } from "../providers/UserDataProvider";
import { sendUserNotifications } from "../_utils/firestore_friends";

const Test = () => {
  const { userData } = useContext(UserData);

  const btnHandler = () => {
    sendUserNotifications(
      {
        type: "friend request",
        from: "s3uDMPtXBBamkS2aQmECStcHmAz2",
        to: "oTHI1em4ZcafdJxRjQyQZRmqdoA2",
      },
      "oTHI1em4ZcafdJxRjQyQZRmqdoA2"
    );
  };

  return (
    <div>
      <button className="mx-auto mt-10" onClick={btnHandler}>
        Click Me!
      </button>
    </div>
  );
};

export default Test;
