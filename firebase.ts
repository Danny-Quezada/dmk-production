// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
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
export const db=getFirestore(app);