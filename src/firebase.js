// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
  

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXlebpnoQz9J1sRPpbe7CRho4MyIOPhCQ",
  authDomain: "xvent-8a530.firebaseapp.com",
  projectId: "xvent-8a530",
  storageBucket: "xvent-8a530.firebasestorage.app",
  messagingSenderId: "894420884192",
  appId: "1:894420884192:web:51ff27fef9cc992decce85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Auth and Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db };