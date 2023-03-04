// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtyh-SbvAspKH-NR4H-vmrRJ0DKB-LVlA",
  authDomain: "my-pill-pal.firebaseapp.com",
  projectId: "my-pill-pal",
  storageBucket: "my-pill-pal.appspot.com",
  messagingSenderId: "329075862444",
  appId: "1:329075862444:web:5bf7a83b9f660eb3162809",
  measurementId: "G-DK1DDX840V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authClient = getAuth();

export { authClient };
