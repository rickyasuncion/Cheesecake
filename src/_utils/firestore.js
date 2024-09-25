import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc,
  getDoc,
  getDocs,
  where,
  collection,
  query
} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

import { auth } from "./firebase";
const db = getFirestore();

async function createUserWithProfile(user, displayName) {
  try {
    // const userCredential = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      favourites: [{}],
      reviews: [{}],
    });

    console.log("User created successfully!");
  } catch (error) {
    if (error.code === 'auth/operation-not-allowed') {
      console.error('Email/Password authentication is not enabled or your Firestore database is in Test Mode.');
    } else if (error.code === 'auth/email-already-in-use') {
      console.error('The email address is already in use.');
    } else {
      console.error('Error creating user:', error);
    }
  }
}


async function createReview(content, media_type, media_id, uid, displayName) {
  try {
    const reviewId = uuidv4(); // Generate a unique ID
    const userDocRef = doc(db, "reviews", reviewId); // Use the unique ID as the document ID
    await setDoc(userDocRef, {
      media_type: media_type,
      media_id: media_id,
      uid: uid,
      displayName: displayName,
      content: content,
      date: Date.now(),
    });

    console.log("Review created successfully!");
  } catch (error) {
    console.error("Error creating review:", error);
  }
}

async function getUserData(uid) {
  try {
    const userDocRef = doc(db, "users", uid);
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

async function getFavouritesByUser(uid) {
  try {
    const userDocRef = doc(db, "users", uid);
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

async function getReviewsByMedia(mediaType, mediaId = null) {
  try {
    const reviewsCollectionRef = collection(db, "reviews");
    let q;

    if (mediaId) {
      q = query(
        reviewsCollectionRef,
        where("media_type", "==", mediaType),
        where("media_id", "==", mediaId)
      );
    } else {
      q = query(
        reviewsCollectionRef,
        where("media_type", "==", mediaType)
      );
    }

    const querySnapshot = await getDocs(q);
    const reviews = [];

    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    return reviews;
  } catch (error) {
    console.error("Error getting reviews:", error);
    return [];
  }
}

async function updateUser(uid, updatedData) {
  try {
    const userDocRef = doc(db, "users", uid);

    await updateDoc(userDocRef, updatedData);

    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export { createUserWithProfile, createReview, getReviewsByMedia, updateUser };
