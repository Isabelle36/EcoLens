import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firestore = getFirestore();
const auth = getAuth();

const saveVisitorData = async (visitorId) => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const userDocRef = doc(firestore, "users", currentUser.uid); // Create a document for the user
    const userData = {
      email: currentUser.email,
      visitorIds: [
        {
          id: visitorId,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      await setDoc(userDocRef, userData, { merge: true }); // Merge to avoid overwriting existing data
      console.log("Visitor data saved successfully!");
    } catch (error) {
      console.error("Error saving visitor data: ", error);
    }
  }
};

export default saveVisitorData;