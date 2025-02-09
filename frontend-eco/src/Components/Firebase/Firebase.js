import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // Use environment variable
  authDomain: "ecolens-79049.firebaseapp.com",
  projectId: "ecolens-79049",
  storageBucket: "ecolens-79049.appspot.com", // Fixed storage bucket
  messagingSenderId: "530841164662",
  appId: "1:530841164662:web:164236c503a2cde561f857",
  measurementId: "G-5YEJ9Q9DBB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to set/update displayName
const setDisplayName = async (name) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, { displayName: name });
      console.log("Display name updated to:", name);
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  } else {
    console.log("No user is logged in to update profile");
  }
};

export { auth, db, setDisplayName };
