// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3t-_oliXF25dsfrovna7X9hsnHTkJXPc",
  authDomain: "rasalgo.firebaseapp.com",
  projectId: "rasalgo",
  storageBucket: "rasalgo.appspot.com",
  messagingSenderId: "19767098038",
  appId: "1:19767098038:web:ec912ef746867f38498417",
  measurementId: "G-6XT4NXB4CP"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
