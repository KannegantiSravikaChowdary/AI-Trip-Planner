// src/service/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXCek1ALc73T4t-hI94zvUR2yjX5OLwyc",
  authDomain: "ai-trip-928c2.firebaseapp.com",
  projectId: "ai-trip-928c2",
  storageBucket: "ai-trip-928c2.firebasestorage.app",
  messagingSenderId: "274566049313",
  appId: "1:274566049313:web:d5c11989f3c739df757d60",
  measurementId: "G-D2PREYG5S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);   // <-- export Firestore database
