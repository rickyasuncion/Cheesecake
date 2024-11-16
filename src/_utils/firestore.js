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

async function getUserFavourites() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const favourites = userDoc.data().favourites;
      return favourites;
    } else {
      console.log("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting favourites:", error);
    return null;
  }
}

async function getUserReviews() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const reviews = userDoc.data().reviews;
      return reviews;
    } else {
      console.log("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting favourites:", error);
    return null;
  }
}

async function getUserRecentlyViewed() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const recentlyViewed = userDoc.data().recentlyViewed || [];
      return recentlyViewed;
    } else {
      console.log("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting recently viewed:", error);
    return null;
  }
}

async function updateUserFavourites(favouriteObject) {
  try {
    const favourites = await getUserFavourites();
    if (favourites) {
      const data = { favourites: [...favourites, favouriteObject] };
      await updateUser(data);
    } else {
      console.log("No favourites found!");
    }
  } catch (error) {
    console.error("Error updating favourites:", error);
  }
}

async function updateUserReviews(reviewId) {
  try {
    const reviews = await getUserReviews();
    let data;
    if (reviews.length > 0) {
      console.log(reviews);
      data = { reviews: [...reviews, reviewId] };

    } else {
      data = { reviews: [...reviews, reviewId] };
    }
    await updateUser(data);
  } catch (error) {
    console.error("Error updating reviews:", error);
  }
}

async function updateUserRecentlyViewed(viewedObject) {
  try {
    const recentlyViewed = await getUserRecentlyViewed();
    let updatedRecentlyViewed;

    if (recentlyViewed) {
      updatedRecentlyViewed = new Set([
        viewedObject,
        ...recentlyViewed,
      ]);
      updatedRecentlyViewed = [...updatedRecentlyViewed];

      if (updatedRecentlyViewed.length > 5) {
        updatedRecentlyViewed = updatedRecentlyViewed.slice(0, 5);
      }
    } else {
      updatedRecentlyViewed = [viewedObject];
    }

    const data = { recentlyViewed: updatedRecentlyViewed };
    await updateUser(data);
  } catch (error) {
    console.error("Error updating recently viewed:", error);
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
  getUserFavourites,
  getUserReviews,
  getUserRecentlyViewed,
  updateUserFavourites,
  updateUserReviews,
  updateUserRecentlyViewed,
  isUserSubscribedToMovie,
  subscribeUserToMovieNotifications,
  addUserNotification,
  getUserNotifications,
};

export const userData = getUserData();