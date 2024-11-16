import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../_utils/firestore";
import { auth } from "../_utils/firebase";

const UserData = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let unsubscribeFromUserData = null;

    const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribeFromUserData = getUserData(user, (data) => {
          setUserData(data);
        });
      } else {
        setUserData(null);

        if (unsubscribeFromUserData) {
          unsubscribeFromUserData();
          unsubscribeFromUserData = null;
        }
      }
    });

    return () => {
      unsubscribeFromAuth();
      if (unsubscribeFromUserData) unsubscribeFromUserData();
    };
  }, []);

  return <UserData.Provider value={{ userData, setUserData }}>{children}</UserData.Provider>;
};

export { UserData, UserDataProvider };
