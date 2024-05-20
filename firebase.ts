/*

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE_PRna6AC6Eg3iAWzIqel5EahNQvdqTI",
  authDomain: "dmk-production.firebaseapp.com",
  projectId: "dmk-production",
  storageBucket: "dmk-production.appspot.com",
  messagingSenderId: "580425547178",
  appId: "1:580425547178:web:001dfde5ba541e86c9ffd3",
  measurementId: "G-Q7STH3VVP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {
  getAuth,
  signInWithPopup
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYQXoQevNhn2k-EdHzukUknK5q6PWaJCI",
  authDomain: "production-682e6.firebaseapp.com",
  projectId: "production-682e6",
  storageBucket: "production-682e6.appspot.com",
  messagingSenderId: "422113084268",
  appId: "1:422113084268:web:22fb86d95888529afea949",
  measurementId: "G-65K0DCCJ4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage();
export const db=getFirestore(app);
