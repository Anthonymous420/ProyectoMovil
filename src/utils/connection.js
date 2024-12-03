// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVW2KgfGoh1SDbbyIC8fnVSdqVyKXd4Eg",
  authDomain: "proyectotm-cebbf.firebaseapp.com",
  projectId: "proyectotm-cebbf",
  storageBucket: "proyectotm-cebbf.firebasestorage.app",
  messagingSenderId: "646535247007",
  appId: "1:646535247007:web:3c15fcc749d2d84674deaa",
  measurementId: "G-9V2BJLD78C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(appFirebase);

export { appFirebase, auth, db };
