const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAguZdn7Q88I2v3RpfAmyL9g_qM89-I8Rk",
  authDomain: "cheesecake-aa2bc.firebaseapp.com",
  projectId: "cheesecake-aa2bc",
  storageBucket: "cheesecake-aa2bc.appspot.com",
  messagingSenderId: "1025218929319",
  appId: "1:1025218929319:web:c8afdd0dbb035c1c61b182",
};
console.log(firebaseConfig)


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth };
