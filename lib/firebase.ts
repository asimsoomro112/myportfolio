import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA0UmsEIdFUwvwiR_-pjP113PoX3rI2XRY",
  authDomain: "portfolio-c1515.firebaseapp.com",
  projectId: "portfolio-c1515",
  storageBucket: "portfolio-c1515.firebasestorage.app",
  messagingSenderId: "412305457292",
  appId: "1:412305457292:web:462a6eeeaf0495eef4bba9",
  measurementId: "G-04GMP5H82M"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
