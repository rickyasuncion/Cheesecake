import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
const auth = getAuth();


async function sendUserNotifications(notif, id) {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, "users", id);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.log("User document does not exist!");
        return;
      }
      const existingNotifications = userDoc.data().notifications || [];
      const newNotifications = [...existingNotifications, notif];
      await updateDoc(userDocRef, { notifications: newNotifications });
      console.log("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  }
}

export { sendUserNotifications };
