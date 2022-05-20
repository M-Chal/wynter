import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'

// I normally don't expose my api keys, I promise.
// I usually put them neatly away into .env but for the sake of this project I am releasing my creds
const firebaseConfig = {
  apiKey: "AIzaSyA9Tbz1iVxhV_LKpfKKmgXRCVQB-z_KJM4",
  authDomain: "wynter-f57c7.firebaseapp.com",
  databaseURL: "https://wynter-f57c7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wynter-f57c7",
  storageBucket: "wynter-f57c7.appspot.com",
  messagingSenderId: "349213439765",
  appId: "1:349213439765:web:eadf094e0264435aaddb1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;