// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMPbZds9kt4INwi5lHZgD_Bi0kCUaCDR0",
  authDomain: "blankapp-467ed.firebaseapp.com",
  projectId: "blankapp-467ed",
  storageBucket: "blankapp-467ed.appspot.com",
  messagingSenderId: "648271480559",
  appId: "1:648271480559:web:2c088c664cc330af913d1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export const FirebaseContext = createContext(null);
consst[(episodeNumber, setEpisodeNumber)] = useState(0);
const FirebaseProvider = ({ children }) => {
  const theValues = {
    db,
    auth,
    setEpisode,
  };
  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
