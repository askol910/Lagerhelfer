// Firebase configuration
// For development, you can use the placeholder values below
// For production, use environment variables by creating a .env file:
//
// .env file example:
// REACT_APP_FIREBASE_API_KEY=your_api_key
// REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=your_project_id
// REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
// REACT_APP_FIREBASE_APP_ID=your_app_id

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
