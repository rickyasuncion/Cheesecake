import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";
import { updateUserReviews } from "./firestore";

async function createReview({
  media_type,
  media_id,
  displayName,
  content,
  rating,
}) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const reviewRef = collection(db, "reviews", media_type, media_id);

    const docRef = await addDoc(reviewRef, {
      media_type: media_type,
      media_id: media_id,
      uid: user.uid,
      displayName: displayName,
      content: content,
      rating: rating,
      date: serverTimestamp(),
    });

    updateUserReviews(docRef.id);

    console.log("Review created successfully!");
  } catch (error) {
    console.error("Error creating review:", error);
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

export { createReview, getReviews };
