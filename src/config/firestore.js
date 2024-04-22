// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCjTuTn4PhUn4-eki1R4Amrqptt9mo_GE",
  authDomain: "bookings-8eb99.firebaseapp.com",
  projectId: "bookings-8eb99",
  storageBucket: "bookings-8eb99.appspot.com",
  messagingSenderId: "901405037529",
  appId: "1:901405037529:web:9a0ac39aaa1a819dd9bfc8",
  measurementId: "G-RVNQZ0ZH1T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//initialize cloud Firestore and get a reference to the services
export const db = getFirestore(app);
const analytics = getAnalytics(app);
