// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4_zI1NORAS5hj2QjbQ-IKDf3eNKFF6Iw",
  authDomain: "questo-ca56d.firebaseapp.com",
  projectId: "questo-ca56d",
  storageBucket: "questo-ca56d.appspot.com",
  messagingSenderId: "578840949119",
  appId: "1:578840949119:web:587aed81990f7d28c3aa4a",
  measurementId: "G-4FG6D040VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth()
export const provider = new GoogleAuthProvider()