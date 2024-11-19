import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid'

const auth = getAuth();


async function sendUserNotifications(notif, id) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", id);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingNotifications = userDoc.data().notifications || [];

      notif = { id: uuidv4(), ...notif };

      const isDuplicate = existingNotifications.some(
        (existingNotif) =>
          existingNotif.message === notif.message &&
          existingNotif.timestamp === notif.timestamp
      );
      if (!isDuplicate) {
        const newNotifications = [...existingNotifications, notif];
        await updateDoc(userDocRef, { notifications: newNotifications });
      } else {
        console.log("Duplicate notification found, not adding.");
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  }
}

async function getUsersByIds(friends) {
  const users = [];
  try {
    for (const userId of friends) {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        users.push(userDoc.data());
      } else {
        console.log(`No user document found for ID: ${userId}`);
      }
    }
    return users;
  } catch (error) {
    console.error("Error getting user documents:", error);
  }
}

async function createChat(chatData) {
  try {
    const chatRef = await addDoc(collection(db, "chats"), chatData);
    return chatRef.id;
  } catch (error) {
    console.error("Error creating chat: ", error);
  }
}

async function sendUserChat(chatId, userId) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingChats = userDoc.data().chats || [];
      const isDuplicate = existingChats.includes(chatId);
      if (!isDuplicate) {
        const newChats = [...existingChats, chatId];
        await updateDoc(userDocRef, { chats: newChats });
      } else {
        console.log("Duplicate chat ID found, not adding.");
      }
    } catch (error) {
      console.error("Error adding chat ID:", error);
    }
  } else {
    console.log("No user is currently authenticated.");
  }
}

async function addMessage(chatId, messageData) {
  try {
    const messageRef = await addDoc(collection(db, "chats", chatId, "messages"), messageData);
    console.log("Message added with ID: ", messageRef.id);
    return messageRef.id;
  } catch (error) {
    console.error("Error adding message: ", error);
  }
}

// Example usage
// addMessage("chatId1", { text: "Hello, World!", createdAt: new Date(), sender: "userId1" });


// Example usage
// createChat({ name: "General", createdAt: new Date() });


export { sendUserNotifications, getUsersByIds, createChat, sendUserChat };
