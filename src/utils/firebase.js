// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArynOi4nOCVaVYRxs5btfZAlr4UjB0UIk",
  authDomain: "netflixgpt-76b98.firebaseapp.com",
  projectId: "netflixgpt-76b98",
  storageBucket: "netflixgpt-76b98.appspot.com",
  messagingSenderId: "795473890463",
  appId: "1:795473890463:web:ba354bb3ec7c3b489b26aa",
  measurementId: "G-RL9HDFZXLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); //This auth will use to call an API
