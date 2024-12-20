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
import { v4 as uuidv4 } from "uuid";

async function createUser() {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);

      console.log("createUser called for user:", user.email);

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        console.log("User document already exists:", userDoc.data());

        if (!userDoc.data().email) {
          console.log("Email missing in Firestore, updating document...");
          await updateDoc(userDocRef, { email: user.email });
          console.log("Email updated successfully!");
        }
        return;
      }

      await setDoc(userDocRef, {
        id: user.uid,
        displayName: user.displayName,
        createdAt: serverTimestamp(),
        email: user.email,
        favourites: [],
        lists: [],
        reviews: [],
        friends: [],
        chats: [],
      });
      console.log(
        "Firestore document successfully written for user:",
        user.email
      );
      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  } else {
    console.warn("No current user found during createUser");
  }
}

function getUserData(user, callback) {
  if (!user) return null;

  const userDocRef = doc(db, "users", user.uid);

  const unsubscribe = onSnapshot(
    userDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data());
      } else {
        console.log("No user found!");
        callback(null);
      }
    },
    (error) => {
      console.error("Error listening to user data:", error);
      callback(null);
    }
  );

  return unsubscribe;
}

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
      await updateDoc(userDocRef, { favourites: newFavorites });
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
      await updateDoc(userDocRef, { reviews: newReviews });
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

async function updateUserLists(userId, listName) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingLists = userDoc.data().lists || [];
      const list = { name: listName, items: [] };

      const newList = [...existingLists, list];
      await updateDoc(userDocRef, { lists: newList });
      console.log(`Successfully added to ${listName} for user ${userId}`);
    } catch (error) {
      console.error(`Error updating ${listName}:`, error);
    }
  } else {
    console.error("No authenticated user found.");
  }
}

async function deleteUserList(userId, listName) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }

      const existingLists = userDoc.data().lists || [];
      const updatedLists = existingLists.filter(
        (list) => list.name !== listName
      );

      await updateDoc(userDocRef, { lists: updatedLists });
      console.log(`Successfully deleted ${listName} for user ${userId}`);
    } catch (error) {
      console.error(`Error deleting ${listName}:`, error);
    }
  } else {
    console.error("No authenticated user found.");
  }
}

async function updateUserListItem(userId, listName, newItem) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }

      const existingLists = userDoc.data().lists || [];
      const listIndex = existingLists.findIndex(
        (list) => list.name === listName
      );

      if (listIndex === -1) {
        console.error(`List named "${listName}" does not exist.`);
        return;
      }

      const listItems = existingLists[listIndex].items;

      const duplicateExists = listItems.some(
        (item) => item.type === newItem.type && item.id === newItem.id
      );

      if (duplicateExists) {
        console.error(
          `Duplicate item with type "${newItem.type}" and id "${newItem.id}" already exists in "${listName}".`
        );
        return;
      }

      listItems.push({ type: newItem.type, id: newItem.id });

      await updateDoc(userDocRef, { lists: existingLists });
      console.log(`Successfully added item to ${listName} for user ${userId}`);
    } catch (error) {
      console.error(`Error updating ${listName}:`, error);
    }
  } else {
    console.error("No authenticated user found.");
  }
}

async function removeUserListItem(userId, listName, itemToRemove) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }

      const existingLists = userDoc.data().lists || [];
      const listIndex = existingLists.findIndex(list => list.name === listName);

      if (listIndex === -1) {
        console.error(`List named "${listName}" does not exist.`);
        return;
      }

      const listItems = existingLists[listIndex].items;

      const itemIndex = listItems.findIndex(
        item => item.type === itemToRemove.type && item.id === itemToRemove.id
      );

      if (itemIndex === -1) {
        console.error(`Item with type "${itemToRemove.type}" and id "${itemToRemove.id}" does not exist in "${listName}".`);
        return;
      }

      listItems.splice(itemIndex, 1);

      await updateDoc(userDocRef, { lists: existingLists });
      console.log(`Successfully removed item from ${listName} for user ${userId}`);
    } catch (error) {
      console.error(`Error removing item from ${listName}:`, error);
    }
  } else {
    console.error("No authenticated user found.");
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

async function updateUserRecentlyViewedMovies(viewedMovie) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingMovies = userDoc.data().recentlyViewedMovies || [];
      if (existingMovies.length >= 5) {
        existingMovies.splice(0, 1);
      }
      const updatedMovies = [...existingMovies, viewedMovie];
      await updateDoc(userDocRef, { recentlyViewedMovies: updatedMovies });
      console.log("Recently viewed movie added successfully!");
    } catch (error) {
      console.error("Error adding recently viewed movie:", error);
    }
  }
}

async function updateUserRecentlyViewedTv(viewedTvShow) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingTvShows = userDoc.data().recentlyViewedTv || [];
      if (existingTvShows.length >= 5) {
        existingTvShows.splice(0, 1);
      }
      const updatedTvShows = [...existingTvShows, viewedTvShow];
      await updateDoc(userDocRef, { recentlyViewedTv: updatedTvShows });
      console.log("Recently viewed TV show added successfully!");
    } catch (error) {
      console.error("Error adding recently viewed TV show:", error);
    }
  }
}


async function subscribeUserToMovieNotifications(movieId) {
  const user = auth.currentUser;
  if (!user) {
    window.open("/login", "_blank");
    return;
  }

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
  updateUserRecentlyViewedMovies,
  updateUserRecentlyViewedTv,
  updateUserLists,
  updateUserListItem,
  removeUserListItem,
  deleteUserList,
  deleteUserFavourite,
  deleteUserNotification,
  isUserSubscribedToMovie,
  subscribeUserToMovieNotifications,
  addUserNotification,
  getUserNotifications,
};

export const userData = getUserData();
