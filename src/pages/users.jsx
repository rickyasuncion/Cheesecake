/*
firebase documentation: https://firebase.google.com/docs/firestore/query-data/get-data
    used to see how to get documents from firestore


Chat GPT prompt: how to get documents from firestore
    used to get more information on how to get doucments from firestore
    
mozilla docs: how to filter an element from an array
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useUserAuth } from "../_utils/auth-context";
import { db } from "../_utils/firebase";
import { Button } from "../components/ui/button";

import { Link } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { toast } = useToast();
  const [friends, setFriends] = useState([]);
  const { user } = useUserAuth();
  const roomId = useMemo(() => Math.random() + Date.now(), []);

  async function getAndSetFriends() {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    const data = docSnap.data();
    setFriends(data.friends);
  }

  async function getAllUsers() {
    const querySnap = await getDocs(collection(db, "users"));
    const allUsers = querySnap.docs.map((doc) => doc.data());
    setUsers(allUsers);
  }

  useEffect(() => {
    if (user) {
      getAllUsers();
      getAndSetFriends();
    }
  }, [user]);

  if (!user) {
    return <>Not logged in Please try logging in</>;
  }

  async function addFriend(id) {
    if (friends.includes(id)) {
      return;
      console.log("user is already a friend");
    }
    await updateDoc(doc(db, "users", user.uid), {
      friends: arrayUnion(id),
    });
    await updateDoc(doc(db, "users", id), {
      friends: arrayUnion(user.uid),
    });
    toast({ description: "User added successfully" });
    getAndSetFriends();
  }

  async function removeFriend(id) {
    if (!friends.includes(id)) {
      return;
      console.log("not a friend. Therefore cannot remove");
    }

    await updateDoc(doc(db, "users", user.uid), {
      friends: arrayRemove(id),
    });
    await updateDoc(doc(db, "users", id), {
      friends: arrayRemove(user.uid),
    });
    getAndSetFriends();
    toast({ description: "User removed successfully" });
  }

  return (
    <div className="py-4 container ">
      <h1 className="font-medium text-3xl">All your movie folks are here!!</h1>
      <p>Don't miss a chance to make them you friend</p>

      <div className="flex flex-col gap-4 mt-5">
        {users
          .filter((u) => u.uid !== user.uid)
          .map((user) => {
            return (
              <div
                className="bg-secondary p-3 rounded-sm max-w-sm flex items-center  justify-between "
                key={user.uid}
              >
                {user.displayName || user.email}
                <div className="flex gap-2 items-center">
                  {friends && friends.find((friendId) => friendId === user.uid) && (
                    <Button variant="outline" className="p-2  h-auto" asChild>
                      <Link to={`/chat/${roomId}?friendId=${user.uid}`}>
                        <IoChatbubblesOutline />
                      </Link>
                    </Button>
                  )}

                  {friends && friends.find((friendId) => friendId === user.uid) ? (
                    <Button
                      variant="destructive"
                      className="p-2 h-auto"
                      onClick={() => removeFriend(user.uid)}
                    >
                      <RxCross2 />
                    </Button>
                  ) : (
                    <button
                      className="p-2 rounded-sm bg-neutral-200"
                      onClick={() => addFriend(user.uid)}
                      disabled={friends && friends.find(
                        (friendId) => friendId === user.uid
                      )}
                    >
                      <IoMdAdd />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UsersPage;
