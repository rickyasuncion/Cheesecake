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
  query,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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
      favourites: [{}],
      reviews: [{}],
    });

    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createReview(content, media_type, media_id, uid, displayName) {
  try {
    const userDocRef = doc(db, "reviews", "type", media_type, media_id);
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

async function getFavouritesUser() {
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

async function getReview(media_type, media_id) {
  try {
    const userDocRef = doc(db, "reviews", "type", media_type, media_id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log("Review data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such review!");
      return null;
    }
  } catch (error) {
    console.error("Error getting review:", error);
  }
}


async function getMediaReviews(media_type) {
  try {
    const userCollectionRef = collection(db, "reviews", "type", media_type);
    const querySnapshot = await getDocs(userCollectionRef);

    if (!querySnapshot.empty) {
      const reviews = [];
      querySnapshot.forEach((doc) => {
        reviews.push(doc.data());
      });
      return reviews;
    } else {
      console.log("No such documents!");
      return null;
    }
  } catch (error) {
    console.error("Error getting reviews:", error);
    return null;
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

export { createUser, createReview, getFavouritesUser, getReview, getMediaReviews, updateUser };
