import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  arrayUnion,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";
import { v4 as uuidv4 } from 'uuid'

async function createUser() {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return;
      }

      await setDoc(userDocRef, {
        createdAt: serverTimestamp(),
        favourites: [],
        lists: [],
        reviews: [],
        recentlyViewed: [],
        friends: [],
        chats: [],
      });

      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
}

function getUserData(user, callback) {
  if (!user) return null;

  const userDocRef = doc(db, "users", user.uid);

  const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    } else {
      console.log("No user found!");
      callback(null);
    }
  }, (error) => {
    console.error("Error listening to user data:", error);
    callback(null);
  });

  return unsubscribe;
};

async function updateUserFavourites(favouriteObject) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingFavorites = userDoc.data().favourites || [];
      const newFavorites = [...existingFavorites, favouriteObject];
      await updateUser({ favourites: newFavorites });
      console.log("Notification added successfully!");
    } catch (error) {
      console.error("Error adding favorites:", error);
    }
  }
}

async function deleteUserFavourite({ type, id }) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingFavorites = userDoc.data().favourites || [];
      const updatedFavourites = existingFavorites.filter(
        (favourite) => !(favourite.type === type && favourite.id === id)
      );
      await updateDoc(userDocRef, { favourites: updatedFavourites });
      console.log("Favourite deleted successfully!");
    } catch (error) {
      console.error("Error deleting favourite:", error);
    }
  }
} 

async function updateUserReviews(reviewId) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingreviews = userDoc.data().reviews || [];
      const newReviews = [...existingreviews, reviewId];
      await updateUser({ reviews: newReviews });
      console.log("Reviews added successfully!");
    } catch (error) {
      console.error("Error adding reviews:", error);
    }
  }
}

async function updateUserFriends(userId, friend) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingFriends = userDoc.data().friends || [];
      const newFriends = [...existingFriends, friend];
      await updateDoc(userDocRef, { friends: newFriends });
    } catch (error) {
      console.error("Error adding friends:", error);
    }
  }
}

async function updateUserNotifications(notif) {
  const user = auth.currentUser;
  notif = { id: uuidv4(), ...notif };
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingNotifications = userDoc.data().notifications || [];
      const newNotifications = [...existingNotifications, notif];
      await updateDoc(userDocRef, { notifications: newNotifications });
      console.log("Notification added successfully!");
    } catch (error) {
      console.error("Error adding notifications:", error);
    }
  }
}

async function deleteUserNotification(notificationId) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingNotifications = userDoc.data().notifications || [];
      const updatedNotifications = existingNotifications.filter(
        (notif) => notif.id !== notificationId
      );
      await updateDoc(userDocRef, { notifications: updatedNotifications });
      console.log("Notification deleted successfully!");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  }
}

async function updateUserRecentlyViewed(viewedObject) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingRecentlyViewed = userDoc.data().recentlyViewed || [];
      const newNotifications = [...existingRecentlyViewed, viewedObject];
      await updateUser({ recentlyViewed: newNotifications });
      console.log("RecentlyViewed added successfully!");
    } catch (error) {
      console.error("Error adding recentlyViewed:", error);
    }
  }
}

async function updateUser(updatedData) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);

    await updateDoc(userDocRef, updatedData);

  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function subscribeUserToMovieNotifications(movieId) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userDocRef = doc(db, "users", user.uid);

    await updateDoc(userDocRef, {
      subscriptions: arrayUnion(movieId),
    });

    console.log("User subscribed to movie notifications successfully!");
  } catch (error) {
    console.error("Error subscribing user to movie notifications:", error);
  }
}

async function isUserSubscribedToMovie(movieId) {
  const user = auth.currentUser;
  if (!user) return false;

  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const subscriptions = userDoc.data().subscriptions || [];
      return subscriptions.includes(movieId);
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking if user is subscribed to movie:", error);
    return false;
  }
}

async function addUserNotification(movieId, message) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userNotificationRef = doc(
      db,
      "users",
      user.uid,
      "notifications",
      movieId
    );
    await setDoc(userNotificationRef, {
      movieId,
      message,
      isRead: false,
      timestamp: Date.now(),
    });
    console.log("Notification added successfully!");
  } catch (error) {
    console.error("Error adding notification:", error);
  }
}

async function getUserNotifications() {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    const notificationsRef = collection(db, "users", user.uid, "notifications");
    const notificationsSnapshot = await getDocs(notificationsRef);
    const notifications = notificationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notifications;
  } catch (error) {
    console.error("Error getting notifications:", error);
    return [];
  }
}

export {
  createUser,
  getUserData,

  updateUserFavourites,
  updateUserReviews,
  updateUserFriends,
  updateUserNotifications,
  updateUserRecentlyViewed,

  deleteUserFavourite,
  deleteUserNotification,

  isUserSubscribedToMovie,
  subscribeUserToMovieNotifications,
  addUserNotification,
  getUserNotifications,
};

export const userData = getUserData();