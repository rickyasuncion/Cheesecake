import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";

async function createUser() {
  const user = auth.currentUser;
try {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return;
    }

    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      favourites: [],
      reviews: [],
      recentlyViewedMovie: [],
      recentlyViewedShow: []
    });

    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createReview({ title, content, media_type, media_id, rating, containsSpoilers }) {
  const user = auth.currentUser;
  try {
    const userDocRef = collection(db, "reviews", media_type, media_id);

    await addDoc(userDocRef, {
      media_type: media_type,
      media_id: media_id,
      uid: user.uid,
      displayName: user.displayName,
      title: title,
      content: content,
      rating: rating,
      containsSpoilers: containsSpoilers,
      date: Date.now(),
    });

    console.log("Review created successfully!");
  } catch (error) {
    console.error("Error creating review:", error);
  }
}


async function getUserData() {
  const user = auth.currentUser;
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

async function getReviews(media_type, media_id) {
  try {
    const reviewsRef = collection(db, "reviews", media_type, media_id);
    const querySnapshot = await getDocs(reviewsRef);
    const reviews = querySnapshot.docs.map((doc) => doc.data());

    console.log(reviews);
    return reviews;
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    return [];
  }
}

// async function getReviewsMedia(media_type) {
//   try {
//     const reviewsRef = doc(db, "reviews", media_type);
//     const querySnapshot = await getDocs(reviewsRef);
//     const reviews = querySnapshot.docs.map((doc) => doc.data());

//     console.log(reviews);
//     return reviews;
//   } catch (error) {
//     console.error("Error retrieving reviews:", error);
//     return [];
//   }
// }

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

async function updateUserReviews(reviewObject) {
  try {
    const reviews = await getUserReviews();
    if (reviews) {
      console.log(reviews);
      const data = { reviews: [...reviews, reviewObject] };

      await updateUser(data);
    } else {
      console.log("No reviews found!");
    }
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
      updatedRecentlyViewedMovies = [viewedObject, ...recentlyViewedMovies];
      
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
      updatedRecentlyViewedShows = [viewedObject, ...recentlyViewedShows];
      
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
  try {
    const userDocRef = doc(db, "users", user.uid);

    await updateDoc(userDocRef, updatedData);

    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export {
  createUser,
  createReview,
  getUserData,
  getUserFavourites,
  getUserReviews,
  getReviews,
  updateUserFavourites,
  updateUserReviews,
  getUserRecentlyViewed,
  updateUserRecentlyViewed,
};
