// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4S3olR4JXsjrSFgToagSdTnVBmZCjm0o",
  authDomain: "typescript-a35a8.firebaseapp.com",
  projectId: "typescript-a35a8",
  storageBucket: "typescript-a35a8.firebasestorage.app",
  messagingSenderId: "1070105560688",
  appId: "1:1070105560688:web:86db6ac92324a1bb2816b5",
  measurementId: "G-T9HLSZ16E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);