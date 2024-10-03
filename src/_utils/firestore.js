import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";

import { auth } from "./firebase";
import { db } from "./firebase";

const user = auth.currentUser;

async function createUser(displayName) {
  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      favourites: [],
      reviews: [],
    });

    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createReview(content, media_type, media_id, displayName) {
  try {
    const userDocRef = collection(db, "reviews", media_type, media_id);

    await addDoc(userDocRef, {
      media_type: media_type,
      media_id: media_id,
      uid: user.uid,
      displayName: displayName,
      content: content,
      date: Date.now(),
    });

    console.log("Review created successfully!");
  } catch (error) {
    console.error("Error creating review:", error);
  }
}

async function getUserData() {
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

async function updateUser(updatedData) {
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
};
