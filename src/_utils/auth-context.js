"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };


  // const facebookSignIn = () => {
  //   const provider = new FacebookAuthProvider(); 
  //   return signInWithPopup(auth, provider);
  // };

  const emailSignUp = (email, password, displayName) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: displayName,
        })
          .then(() => {
            console.log("Display name set successfully!");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  const emailSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();

  }, []);
 
  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, googleSignIn, emailSignUp, emailSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
