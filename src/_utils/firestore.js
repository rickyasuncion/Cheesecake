import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";

async function createUser(username) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return;
      }

      await setDoc(userDocRef, {
        favourites: [],
        reviews: [],
        recentlyViewedMovie: [],
        recentlyViewedShow: [],
        friends: [],
      });

      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
}

async function getUserData() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User data:", userData);
      return userData;
    } else {
      console.log("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

async function getUserFavourites() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const favourites = userDoc.data().favourites;
      console.log("Favourites:", favourites);
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
      console.log("Reviews:", reviews);
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

async function getUserRecentlyViewedMovies() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const recentlyViewedMovies = userDoc.data().recentlyViewedMovie || [];
      console.log("Recently Viewed Movies:", recentlyViewedMovies);
      return recentlyViewedMovies;
    } else {
      console.log("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting recently viewed movies:", error);
    return null;
  }
}

async function getUserRecentlyViewedShows() {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const recentlyViewedShows = userDoc.data().recentlyViewedShow || [];
      console.log("Recently Viewed Shows:", recentlyViewedShows);
      return recentlyViewedShows;
    } else {
      console.log("No user found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting recently viewed shows:", error);
    return null;
  }
}

async function updateUserFavourites(favouriteObject) {
  try {
    const favourites = await getUserFavourites();
    if (favourites) {
      console.log(favourites);
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

async function updateUserRecentlyViewedMovies(viewedObject) {
  try {
    const recentlyViewedMovies = await getUserRecentlyViewedMovies();
    let updatedRecentlyViewedMovies;

    if (recentlyViewedMovies) {
      console.log(recentlyViewedMovies);
      updatedRecentlyViewedMovies = new Set([
        viewedObject,
        ...recentlyViewedMovies,
      ]);
      updatedRecentlyViewedMovies = [...updatedRecentlyViewedMovies];

      if (updatedRecentlyViewedMovies.length > 5) {
        updatedRecentlyViewedMovies = updatedRecentlyViewedMovies.slice(0, 5);
      }
    } else {
      updatedRecentlyViewedMovies = [viewedObject];
    }

    const data = { recentlyViewedMovie: updatedRecentlyViewedMovies };
    await updateUser(data);
  } catch (error) {
    console.error("Error updating recently viewed movies:", error);
  }
}

async function updateUserRecentlyViewedShows(viewedObject) {
  try {
    const recentlyViewedShows = await getUserRecentlyViewedShows();
    let updatedRecentlyViewedShows;

    if (recentlyViewedShows) {
      console.log(recentlyViewedShows);
      updatedRecentlyViewedShows = new Set([
        viewedObject,
        ...recentlyViewedShows,
      ]);
      updatedRecentlyViewedShows = [...updateUserRecentlyViewedShows];

      if (updatedRecentlyViewedShows.length > 5) {
        updatedRecentlyViewedShows = updatedRecentlyViewedShows.slice(0, 5);
      }
    } else {
      updatedRecentlyViewedShows = [viewedObject];
    }

    const data = { recentlyViewedShow: updatedRecentlyViewedShows };
    await updateUser(data);
  } catch (error) {
    console.error("Error updating recently viewed shows:", error);
  }
}

async function updateUser(updatedData) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userDocRef = doc(db, "users", user.uid);

    await updateDoc(userDocRef, updatedData);

    console.log("User updated successfully!");
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
  getUserRecentlyViewedMovies,
  getUserRecentlyViewedShows,
  updateUserFavourites,
  updateUserReviews,
  updateUserRecentlyViewedMovies,
  updateUserRecentlyViewedShows,
  isUserSubscribedToMovie,
  subscribeUserToMovieNotifications,
  addUserNotification,
  getUserNotifications,
};
