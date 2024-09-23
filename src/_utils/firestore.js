import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

async function createUserWithProfile(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
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
    const media = {
      content: content,
      media_type: media_type,
      media_id: media_id,
      date: Date.now(),
    };
    if (media_type === "tvshow") {
      const userDocRef = doc(db, "reviews", "tvshow");
      await setDoc(userDocRef, {
        uid: uid,
        displayName: displayName,
        content: content,
        media_type: media_type,
        media_id: media_id,
        date: Date.now(),
      });
    }

    if (media_type === "movie") {
      const userDocRef = doc(db, "reviews", "movie");
      await setDoc(userDocRef, {
        uid: uid,
        displayName: displayName,
        content: content,
        media_type: media_type,
        media_id: media_id,
        date: Date.now(),
      });
    }
    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
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

export { createUserWithProfile, updateUser };
