import { getAuth } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, limit, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
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

async function createChat() {
  let chatData = { time: serverTimestamp() };
  try {
    const chatRef = await addDoc(collection(db, "chats"), chatData);
    return chatRef.id; 
  } catch (error) {
    console.error("Error creating chat:", error);
    return null; 
  }
}


async function sendUserChat(chat, userId) {
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
    await updateDoc(userDocRef, { chats: [...userChats, chat] });
    console.log(
      `Chat ID ${chat.id} successfully added to user ${userId}`
    );
  } catch (error) {
    console.error(`Error adding chat ${chat.id} to user ${userId}:`, error);
  }
}


async function getChatById(chatId) {
  try {
    const chatDocRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatDocRef);
    if (chatDoc.exists()) {
      return { id: chatDocRef.id, ...chatDoc.data() };
    } else {
      console.log(`No chat document found for ID: ${chatId}`);
      return null;
    }
  } catch (error) {
    console.error("Error getting chat document:", error);
    return null;
  }
}

async function updateChatMessage(chatId, messageData) {
  const user = auth.currentUser;
  if (user) {
    try {
      const chatDocRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatDocRef);
      if (!chatDoc.exists()) {
        console.log("Chat document does not exist!");
        return;
      }
      const existingMessages = chatDoc.data().messages || [];
      messageData = {time: new Date(), ...messageData}
      const newMessages = [...existingMessages, messageData];
      await updateDoc(chatDocRef, { time: serverTimestamp(), messages: newMessages });
      console.log("Messages added successfully!");
    } catch (error) {
      console.error("Error adding messages:", error);
    }
  }
}

async function searchUsersByName(searchTerm) {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef, 
    where('displayName', '>=', searchTerm),
    where('displayName', '<=', searchTerm + '\uf8ff'),
    limit(10)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};


export { sendUserNotifications, getUsersByIds, createChat, sendUserChat, updateChatMessage, searchUsersByName };
