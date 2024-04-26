// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQLWkh8VRfR_xwVZ9cRsScbHRSrEwaGsA",
  authDomain: "jlptdict.firebaseapp.com",
  projectId: "jlptdict",
  storageBucket: "jlptdict.appspot.com",
  messagingSenderId: "696473338921",
  appId: "1:696473338921:web:7b3e42a1182195d493c838",
  measurementId: "G-1ZYCXEJ9DC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const signUpUser = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};
