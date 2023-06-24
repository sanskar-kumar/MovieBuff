// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyBg47YnhpmBYvH5ioKHL7YN0SMjiiRi_3U",
  authDomain: "moviebuff-d2a41.firebaseapp.com",
  projectId: "moviebuff-d2a41",
  storageBucket: "moviebuff-d2a41.appspot.com",
  messagingSenderId: "518236827663",
  appId: "1:518236827663:web:ef507aebef198388d2f37a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth();
