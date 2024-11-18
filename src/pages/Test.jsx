// import React, { useState } from "react";
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { db } from "../_utils/firebase";

// const Test = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);

//   async function getUsersByIds(arrayOfUserIds) {
//     const users = [];
//     try {
//       for (const userId of arrayOfUserIds) {
//         const userDocRef = doc(db, "users", userId);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//           users.push(userDoc.data());
//         } else {
//           console.log(`No user document found for ID: ${userId}`);
//         }
//       }
//       return users;
//     } catch (error) {
//       console.error("Error getting user documents:", error);
//     }
//   }

//   // Handler for button click
//   const btnHandler = async () => {
//     const arrayOfUserIds = searchTerm.split(","); // Assuming comma-separated user IDs
//     const usersData = await getUsersByIds(arrayOfUserIds);
//     setUsers(usersData);
//     console.log("Users:", usersData);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Enter user IDs, comma-separated"
//       />
//       <button className="mx-auto mt-10" onClick={btnHandler}>
//         Click Me!
//       </button>

//       <div>
//         {users.map((user, index) => (
//           <div key={index}>
//             <h3>{user.displayName}</h3>
//             {/* Render other user properties as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Test;
