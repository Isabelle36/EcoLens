import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // for authentication
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm97_WzfTOutm3LZcSnLJMpDs9q_HYgc0",
  authDomain: "ecolens-79049.firebaseapp.com",
  projectId: "ecolens-79049",
  storageBucket: "ecolens-79049.firebasestorage.app",
  messagingSenderId: "530841164662",
  appId: "1:530841164662:web:164236c503a2cde561f857",
  measurementId: "G-5YEJ9Q9DBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };