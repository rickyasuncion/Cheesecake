import { getAuth } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
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

async function createChat(name) {
  let chatData = { name: name, createdAt: serverTimestamp() };
  try {
    const chatRef = await addDoc(collection(db, "chats"), chatData);
    return chatRef.id; 
  } catch (error) {
    console.error("Error creating chat:", error);
    return null; 
  }
}


async function sendUserChat(chatId, userId) {
  if (!auth.currentUser) {
    console.error("No authenticated user found.");
    return;
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error(`User document does not exist for userId: ${userId}`);
      return;
    }

    const userChats = userDoc.data().chats || [];
    if (userChats.includes(chatId)) {
      console.log(`Chat ID ${chatId} is already associated with user ${userId}`);
      return;
    }

    await updateDoc(userDocRef, { chats: [...userChats, chatId] });
    console.log(`Chat ID ${chatId} successfully added to user ${userId}`);
  } catch (error) {
    console.error(`Error adding chat ID ${chatId} to user ${userId}:`, error);
  }
}


async function getChatsByIds(chatIds) {
  const chats = [];
  try {
    for (const chatId of chatIds) {
      const chatDocRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatDocRef);
      if (chatDoc.exists()) {
        chats.push({ id: chatDocRef.id, ...chatDoc.data() });
      } else {
        console.log(`No chat document found for ID: ${chatId}`);
      }
    }
    return chats;
  } catch (error) {
    console.error("Error getting chat documents:", error);
  }
}

async function addMessage(chatId, messageData) {
  try {
    const chatDocRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatDocRef);
    if (!chatDoc.exists()) {
      console.log(`Chat document does not exist for ID: ${chatId}`);
      return;
    }
    const messageWithTimestamp = {
      ...messageData,
      createdAt: serverTimestamp(),
    };
    await updateDoc(chatDocRef, { messages: arrayUnion(messageWithTimestamp) });
    console.log("Message added successfully!");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
}

// Example usage
// addMessage("chatId1", { text: "Hello, World!", createdAt: new Date(), sender: "userId1" });


// Example usage
// createChat({ name: "General", createdAt: new Date() });


export { sendUserNotifications, getUsersByIds, createChat, sendUserChat, getChatsByIds };
